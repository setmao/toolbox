"use client";

import Link from "next/link";

import AdSlot from "./AdSlot";
import ConversionWorkspace from "./ConversionWorkspace";
import { useLocalization } from "./LocalizationProvider";

const HomePageContent = () => {
  const { messages } = useLocalization();
  const adsenseHeroSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_HERO;
  const adsenseTipsSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_TIPS;

  return (
    <>
      <section className="grid gap-8 scroll-mt-32 lg:grid-cols-[3fr,2fr]" id="hero">
        <div className="space-y-6 rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-8 shadow-2xl shadow-slate-200/60 backdrop-blur dark:border-white/10 dark:bg-gradient-to-br dark:from-slate-900/90 dark:via-slate-900/60 dark:to-slate-900/40 dark:shadow-slate-950/40">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-cyan-700 dark:border-white/10 dark:bg-white/5 dark:text-cyan-200">
            {messages.hero.badge}
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl lg:text-[3.2rem] lg:leading-tight dark:text-white">
              {messages.hero.title}
            </h1>
            <p className="max-w-xl text-base text-slate-600 md:text-lg dark:text-slate-300">
              {messages.hero.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="#workspace"
              className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/40 transition hover:shadow-xl"
            >
              {messages.hero.ctas.primary}
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {messages.hero.highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-2xl border border-slate-200/70 bg-white p-4 text-sm text-slate-600 shadow-sm shadow-slate-200/60 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300 dark:shadow-slate-950/40"
              >
                <p className="text-sm font-semibold text-slate-800 dark:text-white">{highlight.title}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{highlight.body}</p>
              </div>
            ))}
          </div>
        </div>
        <AdSlot id="hero-ad" label={messages.ads.hero} slot={adsenseHeroSlot} className="self-stretch" />
      </section>

      <section className="space-y-6 scroll-mt-32" id="workspace">
        <div className="flex flex-col gap-3 text-slate-700 dark:text-slate-100">
          <span className="text-xs uppercase tracking-[0.4em] text-cyan-600 dark:text-cyan-300">{messages.workspaceIntro.title}</span>
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">{messages.workspaceIntro.description}</h2>
        </div>
        <ConversionWorkspace converterCopy={messages.converters} uiCopy={messages.workspaceUi} />
      </section>

      <section id="tips" className="scroll-mt-32 grid gap-6 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-2xl shadow-slate-200/60 backdrop-blur dark:border-white/10 dark:bg-slate-900/70 dark:shadow-slate-950/40 lg:grid-cols-[3fr,2fr]">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{messages.tips.heading}</h3>
          <ul className="grid gap-3 text-sm text-slate-600 dark:text-slate-300">
            {messages.tips.items.map((tip) => (
              <li key={tip} className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/60">
                <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400" aria-hidden="true" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
        <AdSlot id="tips-ad" label={messages.ads.tips} slot={adsenseTipsSlot} />
      </section>
    </>
  );
};

export default HomePageContent;
