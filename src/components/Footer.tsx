import type { Messages } from "../lib/i18n/messages";

type FooterProps = {
  messages: Messages["footer"];
};

const Footer = ({ messages }: FooterProps) => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/70 bg-white dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between md:px-6 dark:text-slate-400">
        <p className="text-slate-600 dark:text-slate-300">
          {messages.note.replace("2025", String(year))}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          {messages.links.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-cyan-600 dark:hover:text-cyan-300">
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-slate-200/70 px-4 py-4 text-center text-xs text-slate-500 md:px-6 dark:border-white/10">
        {messages.contact}
      </div>
    </footer>
  );
};

export default Footer;
