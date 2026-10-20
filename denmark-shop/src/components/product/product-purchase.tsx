"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Truck, Undo2 } from "lucide-react";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { Price } from "@/components/product/price";
import { StockBadge } from "@/components/product/stock-badge";
import { pointsForAmount } from "@/lib/currency";
import type { Locale, Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductPurchase({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const t = useTranslations("product");
  const tc = useTranslations("common");
  const [variantId, setVariantId] = useState(
    product.variants.find((variant) => variant.stock > 0)?.id ?? product.variants[0].id,
  );
  const variant = product.variants.find((item) => item.id === variantId) ?? product.variants[0];

  return (
    <div className="mt-7">
      <div className="flex flex-wrap items-baseline gap-3">
        <Price amountOre={variant.priceOre} compareAtOre={variant.compareAtOre} className="text-2xl" />
        <span className="text-xs text-muted-foreground">{tc("inclTax")}</span>
      </div>
      <p className="mt-1.5 text-xs font-medium text-gold-deep">
        {t("pointsEarn", { count: pointsForAmount(variant.priceOre) })}
      </p>

      <div className="mt-6">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {t("chooseSize")}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {product.variants.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setVariantId(item.id)}
              aria-pressed={variantId === item.id}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition",
                variantId === item.id
                  ? "border-forest bg-forest text-cream"
                  : "border-border bg-background hover:border-gold",
              )}
            >
              {item.label[locale]}
              {item.stock <= 0 ? (
                <span className="text-[0.6rem] uppercase tracking-wider opacity-60">
                  {tc("outOfStock")}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <StockBadge stock={variant.stock} showInStock />
        <span className="text-xs text-muted-foreground">{t("stockSynced")}</span>
        <span className="inline-flex items-center gap-1 text-[0.65rem] text-muted-foreground">
          <Check className="size-3 text-forest" />
          {t("skuLabel")}: {variant.sku}
        </span>
      </div>

      <AddToCartButton
        variantId={variant.id}
        name={product.name[locale]}
        stock={variant.stock}
        withQuantity
        className="mt-5"
      />

      <ul className="mt-6 grid gap-2.5 border-t border-border/70 pt-5 text-[0.78rem] text-foreground/75">
        <li className="flex items-center gap-2.5">
          <Truck className="size-4 text-gold-deep" />
          {t("delivery")}
        </li>
        <li className="flex items-center gap-2.5">
          <Check className="size-4 text-gold-deep" />
          {t("pickup")}
        </li>
        <li className="flex items-center gap-2.5">
          <Undo2 className="size-4 text-gold-deep" />
          {t("returnsNote")}
        </li>
      </ul>
    </div>
  );
}
