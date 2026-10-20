import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShopView, type ShopSearchParams } from "@/components/shop/shop-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const shop = await getTranslations({ locale, namespace: "shop" });

  return {
    title: t("shop"),
    description: shop("description"),
    alternates: {
      canonical: locale === "da" ? "/shop" : "/en/shop",
      languages: { "da-DK": "/shop", en: "/en/shop" },
    },
  };
}

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<ShopSearchParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ShopView searchParams={await searchParams} />;
}
