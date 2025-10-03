import { cookies, headers } from "next/headers";

import { defaultLocale, locales, type Locale } from "./config";

const zhMatchers = ["zh-hant", "zh-tw", "zh-hk", "zh", "zh-mo"];

export const LOCALE_COOKIE = "locale";

export async function resolveLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language")?.toLowerCase() ?? "";
  if (acceptLanguage && zhMatchers.some((matcher) => acceptLanguage.includes(matcher))) {
    return "zh-Hant";
  }

  return defaultLocale;
}
