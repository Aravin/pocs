import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProductArt } from "@/components/brand/product-art";
import { Link } from "@/i18n/navigation";
import { categoryById } from "@/data/categories";
import { pointsForAmount } from "@/lib/currency";
import type { Locale, Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { QuickAddButton } from "./add-to-cart-button";
import { Price } from "./price";
import { StockBadge } from "./stock-badge";

export function ProductCard({
  product,
  locale,
  className,
  priority,
}: {
  product: Product;
  locale: Locale;
  className?: string;
  priority?: boolean;
}) {
  const t = useTranslations("common");
  const category = categoryById(product.categoryId);
  const inStockVariant =
    product.variants.find((variant) => variant.stock > 0) ?? product.variants[0];
  const cheapest = product.variants.reduce((lowest, variant) =>
    variant.priceOre < lowest.priceOre ? variant : lowest,
  );
  const accent = category?.accent ?? "#C9A45C";

  return (
    <article className={cn("group flex h-full flex-col", className)}>
      <div className="relative overflow-hidden rounded-[1.4rem] border border-border/80 bg-card">
        <Link
          href={`/product/${product.slug}`}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={product.name[locale]}
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <ProductArt
              name={product.name[locale]}
              weight={inStockVariant.label[locale]}
              kind={product.packageKind}
              accent={accent}
              className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              compact={!priority}
            />
          </div>
        </Link>

        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {product.bestseller ? (
              <span className="rounded-full bg-forest/90 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-cream shadow-sm backdrop-blur">
                {t("bestSeller")}
              </span>
            ) : null}
            {product.isNew ? (
              <span className="rounded-full bg-gold px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-forest shadow-sm">
                {t("new")}
              </span>
            ) : null}
          </div>
          {inStockVariant.stock > 0 && inStockVariant.stock <= 5 ? (
            <StockBadge stock={inStockVariant.stock} className="backdrop-blur" />
          ) : null}
        </div>

        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-end justify-end">
          <div className="pointer-events-auto translate-y-1 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100">
            <QuickAddButton
              variantId={inStockVariant.id}
              name={product.name[locale]}
              stock={inStockVariant.stock}
            />
          </div>
        </div>

        {product.variants.every((variant) => variant.stock <= 0) ? (
          <div className="absolute inset-0 flex items-center justify-center bg-cream/55 backdrop-blur-[2px]">
            <span className="rounded-full bg-forest px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cream">
              {t("outOfStock")}
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {category?.name[locale]}
          </span>
          <span className="inline-flex items-center gap-1 text-[0.7rem] text-muted-foreground">
            <Star className="size-3 fill-gold text-gold" />
            {product.rating.toFixed(1)}
          </span>
        </div>
        <Link href={`/product/${product.slug}`} className="mt-1.5">
          <h3 className="font-display text-[1.32rem] font-semibold leading-tight text-foreground transition-colors group-hover:text-forest">
            {product.name[locale]}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-1 text-[0.8rem] text-muted-foreground">
          {product.subtitle[locale]}
        </p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="flex flex-col">
            {product.variants.length > 1 ? (
              <span className="text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
                {t("from")}
              </span>
            ) : null}
            <Price amountOre={cheapest.priceOre} compareAtOre={cheapest.compareAtOre} />
          </div>
          <span className="hidden rounded-full border border-gold/40 bg-gold/10 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-gold-deep sm:inline-flex">
            {t("points", { count: pointsForAmount(cheapest.priceOre) })}
          </span>
        </div>
      </div>
    </article>
  );
}
