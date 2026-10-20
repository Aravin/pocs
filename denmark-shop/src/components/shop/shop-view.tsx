import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Sparkles } from "lucide-react";
import { SectionEyebrow, TiletField } from "@/components/brand/ornaments";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { categories, categoryBySlug } from "@/data/categories";
import { filterProducts, getCategoryCounts } from "@/lib/catalog";
import type { Locale } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ShopControls } from "./shop-controls";

export type ShopSearchParams = {
  q?: string;
  sort?: string;
  stock?: string;
};

const sorts = ["featured", "price-asc", "price-desc", "newest", "rating"] as const;
type SortKey = (typeof sorts)[number];

export function ShopView({
  categorySlug,
  searchParams,
}: {
  categorySlug?: string;
  searchParams: ShopSearchParams;
}) {
  const t = useTranslations("shop");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;
  const category = categorySlug ? categoryBySlug(categorySlug) : undefined;
  const sort: SortKey = sorts.includes(searchParams.sort as SortKey)
    ? (searchParams.sort as SortKey)
    : "featured";
  const inStock = searchParams.stock === "1";
  const query = searchParams.q ?? "";

  const results = filterProducts(
    {
      category: category?.id,
      query,
      sort,
      inStock,
    },
    locale,
  );

  const counts = getCategoryCounts();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60 bg-sand/45">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
          <TiletField />
        </div>
        <div className="container-page relative py-14 lg:py-16">
          <nav className="mb-5 flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
            <Link href="/" className="hover:text-forest">
              {tc("home")}
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-forest">
              {t("eyebrow")}
            </Link>
            {category ? (
              <>
                <span>/</span>
                <span className="text-forest">{category.name[locale]}</span>
              </>
            ) : null}
          </nav>
          <SectionEyebrow>{category ? category.tagline[locale] : t("eyebrow")}</SectionEyebrow>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.03] sm:text-5xl">
            {category ? category.name[locale] : t("title")}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {category ? category.description[locale] : t("description")}
          </p>
        </div>
      </section>

      <section className="container-page grid gap-10 py-10 lg:grid-cols-[15rem_1fr] lg:py-14">
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-8">
            <div>
              <h2 className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {t("category")}
              </h2>
              <ul className="mt-3 space-y-1">
                <li>
                  <Link
                    href="/shop"
                    className={cn(
                      "flex items-center justify-between rounded-md px-2.5 py-2 text-sm transition hover:bg-sand/70",
                      !category && "bg-sand/80 font-semibold text-forest",
                    )}
                  >
                    {t("allCategories")}
                    <span className="text-[0.62rem] text-muted-foreground">29</span>
                  </Link>
                </li>
                {categories.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/shop/${item.slug}`}
                      className={cn(
                        "flex items-center justify-between rounded-md px-2.5 py-2 text-sm transition hover:bg-sand/70",
                        category?.id === item.id && "bg-sand/80 font-semibold text-forest",
                      )}
                    >
                      {item.name[locale]}
                      <span className="text-[0.62rem] text-muted-foreground">
                        {counts.get(item.id) ?? 0}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-gold/30 bg-forest p-5 text-cream">
              <Sparkles className="size-4 text-gold" />
              <p className="mt-3 font-display text-lg leading-tight">
                {t("eyebrow")} · Lovely Loyalty
              </p>
              <p className="mt-2 text-[0.72rem] leading-relaxed text-cream/60">
                1 point per 10 DKK. Points from this order land in your account automatically.
              </p>
              <Button
                render={<Link href="/account" />}
                variant="ghost"
                size="sm"
                className="mt-3 px-0 text-gold-light hover:bg-transparent hover:text-cream"
              >
                {t("eyebrow")}
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-6 flex min-w-0 gap-2 overflow-x-auto pb-2 lg:hidden">
            <Link
              href="/shop"
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em]",
                !category ? "border-forest bg-forest text-cream" : "border-border bg-background",
              )}
            >
              {t("allCategories")}
            </Link>
            {categories.map((item) => (
              <Link
                key={item.id}
                href={`/shop/${item.slug}`}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em]",
                  category?.id === item.id
                    ? "border-forest bg-forest text-cream"
                    : "border-border bg-background",
                )}
              >
                {item.name[locale]}
              </Link>
            ))}
          </div>

          <ShopControls
            query={query}
            sort={sort}
            inStock={inStock}
            resultCount={results.length}
          />

          {results.length === 0 ? (
            <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-20 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-sand">
                <Sparkles className="size-5 text-gold-deep" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold">
                {t("noProducts")}
              </h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                {t("noProductsDescription")}
              </p>
              <Button
                render={<Link href="/shop" />}
                className="mt-6 rounded-full bg-forest px-5 text-cream"
              >
                {t("clear")}
              </Button>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
