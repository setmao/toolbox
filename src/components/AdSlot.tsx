"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";

import type { PropsWithChildren } from "react";

const ADS_SCRIPT_ID = "adsbygoogle-loader";

const loadAdsScript = (client: string) => {
  if (typeof window === "undefined") return;
  if (document.getElementById(ADS_SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = ADS_SCRIPT_ID;
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
};

type AdSlotProps = PropsWithChildren<{
  id: string;
  label?: string;
  className?: string;
  slot?: string;
  client?: string;
}>;

const AdSlot = ({
  id,
  label = "Sponsored",
  className,
  children,
  slot,
  client,
}: AdSlotProps) => {
  const adsClient = client ?? process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const adsSlot = slot ?? process.env.NEXT_PUBLIC_ADSENSE_DEFAULT_SLOT;
  const shouldRenderAd = Boolean(adsClient && adsSlot);

  const insRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    if (!shouldRenderAd || typeof window === "undefined") return;

    loadAdsScript(adsClient!);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).adsbygoogle.push({});
    } catch (error) {
      // ignore
    }
  }, [adsClient, shouldRenderAd]);

  return (
    <aside
      aria-label={label}
      className={clsx(
        "flex h-full min-h-[160px] w-full flex-col items-center justify-center gap-2 rounded-3xl border border-slate-200/70 bg-white p-6 text-center text-sm text-slate-600 shadow-lg shadow-slate-200/40 backdrop-blur transition dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300 dark:shadow-slate-950/40",
        className
      )}
      data-ad-slot={id}
    >
      <span className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{label}</span>
      {shouldRenderAd ? (
        <ins
          key={`${id}-${adsSlot}`}
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client={adsClient}
          data-ad-slot={adsSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        children ?? <span className="text-sm text-slate-400 dark:text-slate-500">Ad space</span>
      )}
    </aside>
  );
};

export default AdSlot;
