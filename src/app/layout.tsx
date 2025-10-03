import "./globals.css";

import type { Metadata } from "next";

import AnalyticsScripts from "../components/AnalyticsScripts";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ThemeProvider } from "../components/ThemeProvider";
import ThemeScript from "../components/ThemeScript";
import { resolveLocale } from "../lib/i18n/locale";
import { getMessages } from "../lib/i18n/messages";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const locale = await resolveLocale();
  const messages = getMessages(locale);

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        <ThemeProvider>
          <AnalyticsScripts />
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
            <Header locale={locale} messages={messages} />
            <main className="flex-1">
              <div className="main-gradient pb-20 pt-12">
                <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 md:px-6 lg:px-8">
                  {children}
                </div>
              </div>
            </main>
            <Footer messages={messages.footer} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
