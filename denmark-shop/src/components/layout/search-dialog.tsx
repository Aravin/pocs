"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
import { ProductArt } from "@/components/brand/product-art";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "@/i18n/navigation";
import { categoryById } from "@/data/categories";
import { products } from "@/data/products";
import { searchText } from "@/lib/catalog";
import type { Locale } from "@/lib/types";
import { Price } from "@/components/product/price";

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("common");
  const locale = useLocale() as Locale;
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (normalized.length < 2) return [];
    return products
      .filter((product) => searchText(product, locale).includes(normalized))
      .slice(0, 6);
  }, [locale, query]);

  return (
    <Dialog open={open} onOpenChange={(next) => {
      onOpenChange(next);
      if (!next) setQuery("");
    }}>
      <DialogContent
        showCloseButton={false}
        className="top-24 max-w-2xl translate-y-0 gap-0 overflow-hidden rounded-2xl border border-border bg-cream p-0 shadow-2xl sm:max-w-2xl"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{t("search")}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-3 border-b border-border/80 px-5">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("searchPlaceholder")}
            autoFocus
            className="h-16 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={t("reset")}
              className="rounded-full p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="size-4" />
            </button>
          ) : (
            <span className="hidden rounded border border-border px-1.5 py-0.5 text-[0.6rem] uppercase tracking-widest text-muted-foreground sm:inline">
              esc
            </span>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim().length < 2 ? (
            <div className="px-4 py-8">
              <p className="text-sm text-muted-foreground">{t("searchHint")}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["berbere", "teff", "yirgacheffe", "honning", "shiro"].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground transition hover:border-gold hover:bg-gold/10"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              {t("noResults", { query })}
            </p>
          ) : (
            <ul className="space-y-1">
              {results.map((product) => {
                const category = categoryById(product.categoryId);
                const variant = product.variants[0];
                return (
                  <li key={product.id}>
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={() => {
                        onOpenChange(false);
                        setQuery("");
                      }}
                      className="flex items-center gap-4 rounded-xl px-3 py-2.5 transition hover:bg-sand/70"
                    >
                      <span className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-border/70">
                        <ProductArt
                          name={product.name[locale]}
                          weight=""
                          kind={product.packageKind}
                          accent={category?.accent ?? "#C9A45C"}
                          compact
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-base font-semibold">
                          {product.name[locale]}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {category?.name[locale]} · {product.origin[locale]}
                        </span>
                      </span>
                      <Price amountOre={variant.priceOre} compact />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
