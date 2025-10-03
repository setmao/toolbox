import type { Locale } from "./config";
import en from "./en";
import zhHant from "./zh-Hant";

export type ConverterErrors = {
  emptyInput?: string;
  invalidJson?: string;
  parseError?: string;
  missingDirective?: string;
  missingKeyName?: string;
  missingJson?: string;
};

export type ConverterCopy = {
  label: string;
  description: string;
  inputPlaceholder: string;
  sampleInput?: string;
  keyPlaceholder?: string;
  sampleKey?: string;
  errors: ConverterErrors;
};

export type Messages = {
  locale: Locale;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    url: string;
  };
  nav: {
    brand: string;
    links: { href: string; label: string }[];
    language: {
      label: string;
      english: string;
      traditionalChinese: string;
    };
    themeToggle: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctas: {
      primary: string;
    };
    highlights: { title: string; body: string }[];
  };
  workspaceIntro: {
    title: string;
    description: string;
  };
  workspaceUi: {
    inputLabel: string;
    keyLabel?: string;
    outputLabel: string;
    readOnlyHint: string;
    applySample: string;
    convertNow: string;
    copyIdle: string;
    copySuccess: string;
    copyError: string;
  };
  converters: {
    formatJson: ConverterCopy;
    minifyJson: ConverterCopy;
    jsonToYaml: ConverterCopy;
    pythonDictJson: ConverterCopy;
    searchJsonKey: ConverterCopy;
    copyError: string;
  };
  tips: {
    heading: string;
    items: string[];
  };
  ads: {
    default: string;
    hero: string;
    tips: string;
  };
  footer: {
    note: string;
    links: { label: string; href: string }[];
    contact: string;
  };
};

export function getMessages(locale: Locale): Messages {
  switch (locale) {
    case "en":
      return en;
    case "zh-Hant":
      return zhHant;
    default:
      return en;
  }
}
