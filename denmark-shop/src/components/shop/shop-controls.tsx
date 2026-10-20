"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { RotateCcw, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { SortKey } from "@/lib/catalog";

export function ShopControls({
  query,
  sort,
  inStock,
  resultCount,
}: {
  query: string;
  sort: SortKey;
  inStock: boolean;
  resultCount: number;
}) {
  const t = useTranslations("shop");
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(query);

  const update = (next: {
    q?: string;
    sort?: SortKey;
    inStock?: boolean;
    reset?: boolean;
  }) => {
    const params = new URLSearchParams();
    const nextQuery = next.reset ? "" : (next.q ?? query);
    const nextSort = next.reset ? "featured" : (next.sort ?? sort);
    const nextInStock = next.reset ? false : (next.inStock ?? inStock);

    if (nextQuery) params.set("q", nextQuery);
    if (nextSort !== "featured") params.set("sort", nextSort);
    if (nextInStock) params.set("stock", "1");

    const suffix = params.toString();
    router.replace(suffix ? `${pathname}?${suffix}` : pathname);
    if (next.reset) setSearch("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            update({ q: search.trim() });
          }}
          className="relative min-w-0 flex-1"
        >
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("searchPlaceholder")}
            aria-label={t("searchLabel")}
            className="h-11 rounded-full border-border bg-background pl-10 pr-10"
          />
          {search ? (
            <button
              type="button"
              aria-label={t("clear")}
              onClick={() => {
                setSearch("");
                update({ q: "" });
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="size-3.5" />
            </button>
          ) : null}
        </form>

        <div className="flex min-w-0 items-center gap-2">
          <label htmlFor="sort" className="sr-only">
            {t("sort")}
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(event) => update({ sort: event.target.value as SortKey })}
            className="h-11 rounded-full border border-border bg-background px-4 pr-8 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="featured">{t("sortFeatured")}</option>
            <option value="price-asc">{t("priceAsc")}</option>
            <option value="price-desc">{t("priceDesc")}</option>
            <option value="newest">{t("newest")}</option>
            <option value="rating">{t("rating")}</option>
          </select>
          <button
            type="button"
            onClick={() => update({ inStock: !inStock })}
            aria-pressed={inStock}
            className={`h-11 rounded-full border px-4 text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition ${
              inStock
                ? "border-forest bg-forest text-cream"
                : "border-border bg-background text-foreground/70 hover:border-gold"
            }`}
          >
            {t("inStockOnly")}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>{t("results", { count: resultCount })}</span>
        {query || inStock || sort !== "featured" ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => update({ reset: true })}
            className="rounded-full text-foreground/70"
          >
            <RotateCcw className="size-3.5" />
            {t("clear")}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
