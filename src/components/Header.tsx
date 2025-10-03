import Image from "next/image";
import Link from "next/link";

import type { Locale } from "../lib/i18n/config";
import type { Messages } from "../lib/i18n/messages";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

type HeaderProps = {
  locale: Locale;
  messages: Messages;
};

const Header = ({ locale, messages }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-slate-950/70">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 text-sm text-slate-700 md:px-6 dark:text-slate-100">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-semibold text-slate-800 transition hover:text-cyan-600 dark:text-white dark:hover:text-cyan-300"
        >
          <Image
            src="/favicon.svg"
            alt={messages.nav.brand}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full shadow-lg"
            priority
          />
          <span>{messages.nav.brand}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {messages.nav.links.map((link) => (
            <Link
              key={link.label}
              href={{ pathname: "/", hash: link.href.replace("#", "") }}
              className="text-sm text-slate-600 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle label={messages.nav.themeToggle} />
          <LanguageSwitcher
            locale={locale}
            label={messages.nav.language.label}
            englishLabel={messages.nav.language.english}
            chineseLabel={messages.nav.language.traditionalChinese}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
