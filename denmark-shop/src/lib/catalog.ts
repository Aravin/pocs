import { products } from "@/data/products";
import { categoryById } from "@/data/categories";
import type { CategoryId, Locale, Product, ProductVariant } from "./types";

export type SortKey = "featured" | "price-asc" | "price-desc" | "newest" | "rating";

export interface CatalogFilters {
  category?: string;
  query?: string;
  sort?: SortKey;
  inStock?: boolean;
  maxPriceOre?: number;
  tag?: string;
}

export const lowestPrice = (product: Product) =>
  Math.min(...product.variants.map((variant) => variant.priceOre));

export const totalStock = (product: Product) =>
  product.variants.reduce((sum, variant) => sum + variant.stock, 0);

export const productInStock = (product: Product) =>
  product.variants.some((variant) => variant.stock > 0);

export const searchText = (product: Product, locale: Locale) =>
  [
    product.name[locale],
    product.name.en,
    product.name.da,
    product.subtitle[locale],
    product.origin[locale],
    categoryById(product.categoryId)?.name[locale] ?? "",
  ]
    .join(" ")
    .toLowerCase();

export const filterProducts = (filters: CatalogFilters, locale: Locale) => {
  const query = filters.query?.trim().toLowerCase();

  const result = products.filter((product) => {
    if (filters.category && product.categoryId !== filters.category) return false;
    if (filters.inStock && !productInStock(product)) return false;
    if (filters.tag && !product.slug.includes(filters.tag)) return false;
    if (filters.maxPriceOre && lowestPrice(product) > filters.maxPriceOre) return false;
    if (query && !searchText(product, locale).includes(query)) return false;
    return true;
  });

  switch (filters.sort) {
    case "price-asc":
      return result.sort((a, b) => lowestPrice(a) - lowestPrice(b));
    case "price-desc":
      return result.sort((a, b) => lowestPrice(b) - lowestPrice(a));
    case "rating":
      return result.sort((a, b) => b.rating - a.rating);
    case "newest":
      return result.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    default:
      return result.sort((a, b) => {
        const score = (product: Product) =>
          (product.featured ? 2 : 0) +
          (product.bestseller ? 1 : 0) +
          product.rating / 10;
        return score(b) - score(a);
      });
  }
};

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const getRelatedProducts = (product: Product, limit = 4) => {
  const sameCategory = products.filter(
    (candidate) =>
      candidate.id !== product.id && candidate.categoryId === product.categoryId,
  );
  const fallback = products.filter(
    (candidate) =>
      candidate.id !== product.id && candidate.categoryId !== product.categoryId,
  );
  return [...sameCategory, ...fallback].slice(0, limit);
};

export const getCategoryCounts = () => {
  const counts = new Map<CategoryId, number>();
  for (const product of products) {
    counts.set(product.categoryId, (counts.get(product.categoryId) ?? 0) + 1);
  }
  return counts;
};

export const getVariant = (product: Product, variantId?: string): ProductVariant =>
  product.variants.find((variant) => variant.id === variantId) ?? product.variants[0];

export const getProductByVariant = (variantId: string) => {
  for (const product of products) {
    const variant = product.variants.find((candidate) => candidate.id === variantId);
    if (variant) return { product, variant };
  }
  return null;
};

export const priceRange = () => {
  const prices = products.flatMap((product) =>
    product.variants.map((variant) => variant.priceOre),
  );
  return { min: Math.min(...prices), max: Math.max(...prices) };
};
