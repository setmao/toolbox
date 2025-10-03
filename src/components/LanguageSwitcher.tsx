"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useTransition, useState } from "react";

import type { Locale } from "../lib/i18n/config";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  englishLabel: string;
  chineseLabel: string;
};

const LanguageSwitcher = ({ locale, label, englishLabel, chineseLabel }: LanguageSwitcherProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedLocale, setSelectedLocale] = useState<Locale>(locale);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setSelectedLocale(locale);
  }, [locale]);

  const handleChange = (nextLocale: Locale) => {
    if (nextLocale === selectedLocale) return;

    setSelectedLocale(nextLocale);

    startTransition(() => {
      document.cookie = `locale=${nextLocale}; path=/; max-age=31536000`;
      document.documentElement.lang = nextLocale;
      const queryString = searchParams?.toString();
      const nextPath = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(nextPath);
      router.refresh();
    });
  };

  return (
    <label className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
      <span>{label}</span>
      <select
        className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 focus:border-cyan-400 focus:outline-none dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-100"
        value={selectedLocale}
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
