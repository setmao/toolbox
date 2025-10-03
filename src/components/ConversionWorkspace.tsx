"use client";

import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";

import { createConverters, type Converter } from "../lib/converters";
import type { Messages } from "../lib/i18n/messages";

export type WorkspaceUiCopy = {
  inputLabel: string;
  outputLabel: string;
  readOnlyHint: string;
  applySample: string;
  convertNow: string;
  copyIdle: string;
  copySuccess: string;
  copyError: string;
  keyLabel?: string;
};

type ConverterState = {
  input: string;
  keyInput?: string;
  output: string;
  error: string | null;
  copied: boolean;
};

type ConversionWorkspaceProps = {
  converterCopy: Messages["converters"];
  uiCopy: WorkspaceUiCopy;
  className?: string;
};

const createInitialStates = (converters: Converter[]): Record<string, ConverterState> => {
  return converters.reduce<Record<string, ConverterState>>((acc, converter) => {
    acc[converter.id] = {
      input: converter.sampleInput ?? "",
      keyInput: converter.inputMode === "key-search" ? converter.sampleKey ?? "" : undefined,
      output: "",
      error: null,
      copied: false,
    };
    return acc;
  }, {});
};

const ConversionWorkspace = ({ converterCopy, uiCopy, className }: ConversionWorkspaceProps) => {
  const converters = useMemo(() => createConverters(converterCopy), [converterCopy]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [states, setStates] = useState<Record<string, ConverterState>>(() => createInitialStates(converters));

  useEffect(() => {
    setStates(createInitialStates(converters));
  }, [converters]);

  const convertersById = useMemo(() => {
    return converters.reduce<Record<string, Converter>>((acc, converter) => {
      acc[converter.id] = converter;
      return acc;
    }, {});
  }, [converters]);

  const setStateFor = (converterId: string, value: Partial<ConverterState>) => {
    setStates((prev) => ({
      ...prev,
      [converterId]: {
        ...prev[converterId],
        ...value,
      },
    }));
  };

  const handleApplySample = (converterId: string) => {
    const converter = convertersById[converterId];
    if (!converter) return;

    setStateFor(converterId, {
      input: converter.sampleInput ?? "",
      keyInput: converter.inputMode === "key-search" ? converter.sampleKey ?? "" : undefined,
      output: "",
      error: null,
      copied: false,
    });
  };

  const handleConvert = (converterId: string) => {
    const converter = convertersById[converterId];
    if (!converter) return;
    const currentState = states[converterId];

    try {
      let result = "";
      if (converter.inputMode === "key-search") {
        result = converter.runWithKey({
          json: currentState.input,
          key: currentState.keyInput ?? "",
        });
      } else {
        result = converter.run(currentState.input);
      }
      setStateFor(converterId, {
        output: result,
        error: null,
        copied: false,
      });
    } catch (error) {
      setStateFor(converterId, {
        output: "",
        error:
          error instanceof Error
            ? error.message
            : uiCopy.copyError,
        copied: false,
      });
    }
  };

  const handleCopy = async (converterId: string) => {
    const currentState = states[converterId];
    if (!currentState.output) return;

    try {
      await navigator.clipboard.writeText(currentState.output);
      setStateFor(converterId, { copied: true, error: null });
      setTimeout(() => {
        setStateFor(converterId, { copied: false });
      }, 2000);
    } catch (error) {
      setStateFor(converterId, { error: uiCopy.copyError, copied: false });
    }
  };

  return (
    <section
      id="workspace"
      className={clsx(
        "w-full rounded-3xl border border-slate-200/70 bg-white p-6 shadow-2xl shadow-slate-200/60 backdrop-blur dark:border-white/10 dark:bg-slate-900/70 dark:shadow-slate-950/40",
        className
      )}
    >
      <div className="flex flex-col gap-6">
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="flex flex-wrap items-center gap-2 rounded-full bg-slate-100 p-1 dark:bg-slate-800/60">
            {converters.map((converter, index) => (
              <Tab
                key={converter.id}
                className={({ selected }) =>
                  clsx(
                    "rounded-full px-5 py-2 text-sm font-medium transition focus:outline-none",
                    selected
                      ? "bg-slate-900 text-white shadow-lg dark:bg-white dark:text-slate-900"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  )
                }
              >
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-80" />
                  <span>
                    {String(index + 1).padStart(2, "0")} · {converter.label}
                  </span>
                </span>
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-6">
            {converters.map((converter) => {
              const state = states[converter.id];
              const inputHeightClass =
                converter.inputMode === "key-search"
                  ? "h-[255px] lg:h-[335px]"
                  : "h-[320px] lg:h-[420px]";
              return (
                <Tab.Panel key={converter.id} unmount={false}>
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="flex flex-col gap-3">
                      {converter.inputMode === "key-search" ? (
                        <div className="flex flex-col gap-3">
                          <label
                            className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                            htmlFor={`${converter.id}-key`}
                          >
                            {uiCopy.keyLabel ?? "Key"}
                          </label>
                          <input
                            id={`${converter.id}-key`}
                            value={state.keyInput ?? ""}
                            onChange={(event) =>
                              setStateFor(converter.id, {
                                keyInput: event.target.value,
                                error: null,
                              })
                            }
                            placeholder={converter.keyPlaceholder ?? "token"}
                            className="w-full rounded-2xl border border-slate-200/70 bg-white px-4 py-2 text-sm text-slate-800 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-100 dark:focus:ring-cyan-400/40"
                          />
                        </div>
                      ) : null}
                      <label
                        className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                        htmlFor={`${converter.id}-input`}
                      >
                        {uiCopy.inputLabel}
                      </label>
                      <textarea
                        id={`${converter.id}-input`}
                        value={state.input}
                        onChange={(event) =>
                          setStateFor(converter.id, {
                            input: event.target.value,
                            error: null,
                          })
                        }
                        placeholder={converter.inputPlaceholder ?? ""}
                        className={`${inputHeightClass} w-full rounded-2xl border border-slate-200/70 bg-white p-4 font-mono text-sm text-slate-800 shadow-inner shadow-slate-200/60 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100 dark:shadow-black/40 dark:focus:ring-cyan-400/40`}
                      />
                      <p className="text-xs text-slate-500 dark:text-slate-400">{converter.description}</p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <label
                        className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                        htmlFor={`${converter.id}-output`}
                      >
                        {uiCopy.outputLabel}
                      </label>
                      <textarea
                        id={`${converter.id}-output`}
                        value={state.output}
                        readOnly
                        className="h-[320px] w-full rounded-2xl border border-slate-200/70 bg-slate-50 p-4 font-mono text-sm text-emerald-600 shadow-inner shadow-slate-200/60 dark:border-white/10 dark:bg-slate-950/90 dark:text-emerald-200 dark:shadow-black/60 lg:h-[420px]"
                      />
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                        {state.error ? <span className="text-red-500 dark:text-red-400">{state.error}</span> : <span>{uiCopy.readOnlyHint}</span>}
                        <button
                          type="button"
                          onClick={() => handleCopy(converter.id)}
                          className="rounded-full border border-cyan-500/40 px-4 py-1.5 text-sm font-medium text-cyan-700 transition hover:-translate-y-[1px] hover:bg-cyan-500/10 disabled:border-slate-200 disabled:text-slate-400 dark:border-cyan-400/60 dark:text-cyan-200 dark:hover:bg-cyan-400/10 dark:disabled:border-white/10 dark:disabled:text-slate-500"
                          disabled={!state.output}
                        >
                          {state.copied ? uiCopy.copySuccess : uiCopy.copyIdle}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => handleApplySample(converter.id)}
                      className="rounded-full border border-slate-200/70 px-5 py-2 text-sm text-slate-600 transition hover:border-cyan-400/60 hover:text-cyan-600 dark:border-white/10 dark:text-slate-200 dark:hover:text-white"
                    >
                      {uiCopy.applySample}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleConvert(converter.id)}
                      className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/40 transition hover:shadow-xl"
                    >
                      {uiCopy.convertNow}
                    </button>
                  </div>
                </Tab.Panel>
              );
            })}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  );
};

export default ConversionWorkspace;
