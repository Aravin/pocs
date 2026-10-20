import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { infoPages } from "@/data/info";
import { routing } from "@/i18n/routing";

const baseUrl = "https://www.miraclehabesha.dk";

const localizedUrl = (locale: string, path: string) =>
  locale === "da" ? `${baseUrl}${path || "/"}` : `${baseUrl}/en${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-20");
  const paths: { path: string; priority: number; frequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, frequency: "weekly" },
    { path: "/shop", priority: 0.9, frequency: "weekly" },
    ...categories.map((category) => ({
      path: `/shop/${category.slug}`,
      priority: 0.8,
      frequency: "weekly" as const,
    })),
    ...products.map((product) => ({
      path: `/product/${product.slug}`,
      priority: 0.7,
      frequency: "monthly" as const,
    })),
    { path: "/about", priority: 0.6, frequency: "monthly" },
    { path: "/rewards", priority: 0.6, frequency: "monthly" },
    { path: "/integrations/lovely", priority: 0.3, frequency: "monthly" },
    ...infoPages.map((page) => ({
      path: `/info/${page.slug}`,
      priority: 0.4,
      frequency: "yearly" as const,
    })),
  ];

  return paths.flatMap(({ path, priority, frequency }) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified,
      changeFrequency: frequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((item) => [item, localizedUrl(item, path)]),
        ),
      },
    })),
  );
}
