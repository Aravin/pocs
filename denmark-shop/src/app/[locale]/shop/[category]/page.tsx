import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ShopView, type ShopSearchParams } from "@/components/shop/shop-view";
import { categories, categoryBySlug } from "@/data/categories";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/types";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    categories.map((category) => ({ locale, category: category.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category: slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) return {};
  const typedLocale = locale as Locale;

  return {
    title: category.name[typedLocale],
    description: category.description[typedLocale],
    alternates: {
      canonical: locale === "da" ? `/shop/${slug}` : `/en/shop/${slug}`,
      languages: {
        "da-DK": `/shop/${slug}`,
        en: `/en/shop/${slug}`,
      },
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<ShopSearchParams>;
}) {
  const { locale, category: slug } = await params;
  setRequestLocale(locale);

  if (!categoryBySlug(slug)) notFound();

  return <ShopView categorySlug={slug} searchParams={await searchParams} />;
}
