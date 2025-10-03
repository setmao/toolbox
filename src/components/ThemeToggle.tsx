"use client";

import clsx from "clsx";

import { useTheme } from "./ThemeProvider";

type ThemeToggleProps = {
  label: string;
};

const ThemeToggle = ({ label }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition",
        "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-100 dark:hover:border-cyan-400/60"
      )}
      aria-label={label}
    >
      <span className="inline-flex h-2.5 w-2.5 items-center justify-center">
        {theme === "dark" ? "🌙" : "☀️"}
      </span>
      <span>{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
};

export default ThemeToggle;
