import type { Metadata } from "next";

import HomePageContent from "../components/HomePageContent";
import { defaultLocale } from "../lib/i18n/config";
import { getMessages } from "../lib/i18n/messages";

export function generateMetadata(): Metadata {
  const messages = getMessages(defaultLocale);

  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
    keywords: messages.metadata.keywords,
    alternates: {
      canonical: `${messages.metadata.url}`,
    },
    openGraph: {
      title: messages.metadata.title,
      description: messages.metadata.description,
      url: messages.metadata.url,
      siteName: messages.nav.brand,
      locale: defaultLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: messages.metadata.title,
      description: messages.metadata.description,
    },
  };
}

const Page = () => {
  return <HomePageContent />;
};

export default Page;
