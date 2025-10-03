export const locales = ["en", "zh-Hant"] as const;
export const defaultLocale = "en";

export type Locale = (typeof locales)[number];
