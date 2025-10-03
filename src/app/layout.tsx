import "./globals.css";

import Script from "next/script";
import type { Metadata } from "next";

import AnalyticsScripts from "../components/AnalyticsScripts";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LocalizationProvider from "../components/LocalizationProvider";
import { ThemeProvider } from "../components/ThemeProvider";
import ThemeScript from "../components/ThemeScript";
import { resolveLocale } from "../lib/i18n/locale";

export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const locale = await resolveLocale();
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? process.env.GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID ?? process.env.GA_ID;
  const adsenseClient =
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? process.env.ADSENSE_CLIENT ?? "ca-pub-9733246977016433";

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {adsenseClient ? (
          <Script
            id="adsbygoogle-loader"
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        ) : null}
        <ThemeScript />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        <LocalizationProvider initialLocale={locale}>
          <ThemeProvider>
            <AnalyticsScripts gtmId={gtmId} gaId={gaId} />
            {gtmId ? (
              <noscript
                dangerouslySetInnerHTML={{
                  __html: `
                    <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>
                  `,
                }}
              />
            ) : null}
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                <div className="main-gradient pb-20 pt-12">
                  <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 md:px-6 lg:px-8">
                    {children}
                  </div>
                </div>
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
};

export default RootLayout;
