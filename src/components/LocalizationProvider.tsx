"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { defaultLocale, locales, type Locale } from "../lib/i18n/config";
import { getMessages, type Messages } from "../lib/i18n/messages";

const COOKIE_NAME = "locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

const parseCookieLocale = (): Locale | null => {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  for (const cookie of cookies) {
    if (!cookie) continue;
    const [name, value] = cookie.split("=");
    if (name === COOKIE_NAME && value) {
      return locales.includes(value as Locale) ? (value as Locale) : null;
    }
  }
  return null;
};

const resolveBrowserLocale = (): Locale | null => {
  if (typeof window === "undefined") return null;
  const language = window.navigator.language?.toLowerCase();
  if (!language) return null;
  if (["zh-hant", "zh-tw", "zh-hk", "zh", "zh-mo"].some((matcher) => language.includes(matcher))) {
    return "zh-Hant";
  }
  return null;
};

export type LocalizationContextValue = {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
};

const LocalizationContext = createContext<LocalizationContextValue | undefined>(undefined);

export type LocalizationProviderProps = {
  initialLocale?: Locale;
  children: ReactNode;
};

const LocalizationProvider = ({ initialLocale = defaultLocale, children }: LocalizationProviderProps) => {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const cookieLocale = parseCookieLocale();
    if (cookieLocale && cookieLocale !== locale) {
      setLocaleState(cookieLocale);
      return;
    }
    const browserLocale = resolveBrowserLocale();
    if (browserLocale && browserLocale !== locale) {
      setLocaleState(browserLocale);
    }
  }, [locale]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    if (!locales.includes(nextLocale)) return;
    setLocaleState(nextLocale);
    if (typeof document !== "undefined") {
      document.cookie = `${COOKIE_NAME}=${nextLocale}; path=/; max-age=${COOKIE_MAX_AGE}`;
    }
  }, []);

  const value = useMemo<LocalizationContextValue>(() => {
    const messages = getMessages(locale);
    return {
      locale,
      messages,
      setLocale,
    };
  }, [locale, setLocale]);

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
};

export const useLocalization = (): LocalizationContextValue => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error("useLocalization must be used within a LocalizationProvider");
  }
  return context;
};

export default LocalizationProvider;
