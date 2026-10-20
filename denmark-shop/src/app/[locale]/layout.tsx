import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CartSheet } from "@/components/layout/cart-sheet";
import { routing } from "@/i18n/routing";
import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const isDanish = locale === "da";

  return {
    metadataBase: new URL("https://www.miraclehabesha.dk"),
    title: {
      default: t("title"),
      template: "%s · Miracle Habesha Shop",
    },
    description: t("description"),
    keywords: isDanish
      ? ["eritreisk mad", "etiopisk mad", "berbere", "teff", "krydderier", "kaffe", "honning", "København"]
      : ["Eritrean food", "Ethiopian food", "berbere", "teff", "spices", "coffee", "honey", "Copenhagen"],
    alternates: {
      canonical: isDanish ? "/" : "/en",
      languages: {
        "da-DK": "/",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      siteName: "Miracle Habesha Shop",
      title: t("title"),
      description: t("description"),
      images: [{ url: "/images/hero-spices.jpg", width: 2400, height: 1600, alt: "Miracle Habesha Shop" }],
      locale: isDanish ? "da_DK" : "en_GB",
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${cormorant.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background">
        <NextIntlClientProvider>
          <Providers>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <CartSheet />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
