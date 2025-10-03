import type { Messages } from "./i18n/messages";

export type ConverterInputMode = "single-text" | "key-search";

export type SingleConverter = {
  id: string;
  label: string;
  description: string;
  inputMode: "single-text";
  inputPlaceholder: string;
  sampleInput?: string;
  run: (input: string) => string;
};

export type KeySearchConverter = {
  id: string;
  label: string;
  description: string;
  inputMode: "key-search";
  keyPlaceholder?: string;
  inputPlaceholder?: string;
  sampleInput?: string;
  sampleKey?: string;
  runWithKey: (params: { json: string; key: string }) => string;
};

export type Converter = SingleConverter | KeySearchConverter;

const createFormatJson = (copy: Messages["converters"]["formatJson"]) => (input: string) => {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error(copy.errors.emptyInput ?? "Provide JSON to format.");
  }
  try {
    const parsed = JSON.parse(trimmed);
    return JSON.stringify(parsed, null, 2);
  } catch (error) {
    throw new Error(copy.errors.invalidJson ?? "We couldn't parse this JSON snippet.");
  }
};

const createMinifyJson = (copy: Messages["converters"]["minifyJson"]) => (input: string) => {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error(copy.errors.emptyInput ?? "Provide JSON to minify.");
  }
  try {
    const parsed = JSON.parse(trimmed);
    return JSON.stringify(parsed);
  } catch (error) {
    throw new Error(copy.errors.invalidJson ?? "We couldn't parse this JSON snippet.");
  }
};

const createJsonToYaml = (copy: Messages["converters"]["jsonToYaml"]) => (input: string) => {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error(copy.errors.emptyInput ?? "Provide JSON to transform.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch (error) {
    throw new Error(copy.errors.invalidJson ?? "We couldn't parse this JSON snippet.");
  }

  const indent = (level: number) => "  ".repeat(level);

  const isPlainObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null && !Array.isArray(value);

  const isScalar = (value: unknown) =>
    value === null || ["string", "number", "boolean"].includes(typeof value);

  const formatScalar = (value: unknown): string => {
    if (typeof value === "string") {
      if (/^[a-zA-Z0-9_.@\-]+$/.test(value)) {
        return value;
      }
      return JSON.stringify(value);
    }
    if (value === null) return "null";
    return String(value);
  };

  const formatValue = (value: unknown, level: number): string => {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return `${indent(level)}[]`;
      }
      return value
        .map((item) => {
          if (Array.isArray(item) && item.length === 0) {
            return `${indent(level)}- []`;
          }
          if (isPlainObject(item) && Object.keys(item).length === 0) {
            return `${indent(level)}- {}`;
          }
          if (isScalar(item)) {
            return `${indent(level)}- ${formatScalar(item)}`;
          }
          const nested = formatValue(item, level + 1);
          return `${indent(level)}-\n${nested}`;
        })
        .join("\n");
    }

    if (isPlainObject(value)) {
      const entries = Object.entries(value);
      if (entries.length === 0) {
        return `${indent(level)}{}`;
      }
      return entries
        .map(([key, val]) => {
          if (isScalar(val)) {
            return `${indent(level)}${key}: ${formatScalar(val)}`;
          }
          const nested = formatValue(val, level + 1);
          return `${indent(level)}${key}:\n${nested}`;
        })
        .join("\n");
    }

    return `${indent(level)}${formatScalar(value)}`;
  };

  const yaml = formatValue(parsed, 0);

  return `${yaml}\n`;
};

const createPythonDictToJson = (copy: Messages["converters"]["pythonDictJson"]) => (input: string) => {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error(copy.errors.emptyInput ?? "Provide a Python dict to convert.");
  }

  const normalized = trimmed
    .replace(/\bNone\b/g, "null")
    .replace(/\bTrue\b/g, "true")
    .replace(/\bFalse\b/g, "false");

  try {
    const candidate = Function("'use strict'; return (" + normalized + ");")();
    return JSON.stringify(candidate, null, 2);
  } catch (error) {
    throw new Error(copy.errors.parseError ?? "We couldn't evaluate this Python dict.");
  }
};

const createSearchJsonKeyRunner = (copy: Messages["converters"]["searchJsonKey"]) => {
  return ({ json, key }: { json: string; key: string }) => {
    const trimmedKey = key.trim();
    if (!trimmedKey) {
      throw new Error(copy.errors.missingKeyName ?? "Enter the key name you want to search.");
    }

    const trimmedJson = json.trim();
    if (!trimmedJson) {
      throw new Error(copy.errors.missingJson ?? "Paste JSON to search.");
    }

    let jsonData: unknown;
    try {
      jsonData = JSON.parse(trimmedJson);
    } catch (error) {
      throw new Error(copy.errors.invalidJson ?? "We couldn't parse the JSON block. Check the structure.");
    }

    type Match = {
      path: string;
      value: unknown;
    };

    const matches: Match[] = [];

    const walk = (node: unknown, path: string) => {
      if (Array.isArray(node)) {
        node.forEach((value, index) => walk(value, `${path}[${index}]`));
        return;
      }

      if (node && typeof node === "object") {
        Object.entries(node as Record<string, unknown>).forEach(([keyName, value]) => {
          const nextPath = path ? `${path}.${keyName}` : keyName;
          if (keyName === trimmedKey) {
            matches.push({ path: nextPath, value });
          }
          walk(value, nextPath);
        });
      }
    };

    walk(jsonData, "");

    return JSON.stringify({ key: trimmedKey, matches }, null, 2);
  };
};

export const createConverters = (messages: Messages["converters"]): Converter[] => {
  const searchRunner = createSearchJsonKeyRunner(messages.searchJsonKey);

  return [
    {
      id: "format-json",
      label: messages.formatJson.label,
      description: messages.formatJson.description,
      inputMode: "single-text",
      inputPlaceholder: messages.formatJson.inputPlaceholder,
      sampleInput: messages.formatJson.sampleInput,
      run: createFormatJson(messages.formatJson),
    },
    {
      id: "minify-json",
      label: messages.minifyJson.label,
      description: messages.minifyJson.description,
      inputMode: "single-text",
      inputPlaceholder: messages.minifyJson.inputPlaceholder,
      sampleInput: messages.minifyJson.sampleInput,
      run: createMinifyJson(messages.minifyJson),
    },
    {
      id: "json-to-yaml",
      label: messages.jsonToYaml.label,
      description: messages.jsonToYaml.description,
      inputMode: "single-text",
      inputPlaceholder: messages.jsonToYaml.inputPlaceholder,
      sampleInput: messages.jsonToYaml.sampleInput,
      run: createJsonToYaml(messages.jsonToYaml),
    },
    {
      id: "python-dict-json",
      label: messages.pythonDictJson.label,
      description: messages.pythonDictJson.description,
      inputMode: "single-text",
      inputPlaceholder: messages.pythonDictJson.inputPlaceholder,
      sampleInput: messages.pythonDictJson.sampleInput,
      run: createPythonDictToJson(messages.pythonDictJson),
    },
    {
      id: "search-json-key",
      label: messages.searchJsonKey.label,
      description: messages.searchJsonKey.description,
      inputMode: "key-search",
      keyPlaceholder: messages.searchJsonKey.keyPlaceholder,
      inputPlaceholder: messages.searchJsonKey.inputPlaceholder,
      sampleInput: messages.searchJsonKey.sampleInput,
      sampleKey: messages.searchJsonKey.sampleKey,
      runWithKey: ({ json, key }) => searchRunner({ json, key }),
    },
  ];
};
