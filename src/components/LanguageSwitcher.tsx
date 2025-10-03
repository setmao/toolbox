"use client";

import { useTransition } from "react";

import type { Locale } from "../lib/i18n/config";
import { useLocalization } from "./LocalizationProvider";

type LanguageSwitcherProps = {
  label: string;
  englishLabel: string;
  chineseLabel: string;
};

const LanguageSwitcher = ({ label, englishLabel, chineseLabel }: LanguageSwitcherProps) => {
  const { locale, setLocale } = useLocalization();
  const [isPending, startTransition] = useTransition();

  const handleChange = (nextLocale: Locale) => {
    if (nextLocale === locale) return;

    startTransition(() => {
      setLocale(nextLocale);
    });
  };

  return (
    <label className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
      <span>{label}</span>
      <select
        className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 focus:border-cyan-400 focus:outline-none dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-100"
        value={locale}
        onChange={(event) => handleChange(event.target.value as Locale)}
        disabled={isPending}
      >
        <option value="en">{englishLabel}</option>
        <option value="zh-Hant">{chineseLabel}</option>
      </select>
    </label>
  );
};

export default LanguageSwitcher;
