"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Lock, ShoppingBag, Trash2, Truck } from "lucide-react";
import { ProductArt } from "@/components/brand/product-art";
import { Price } from "@/components/product/price";
import { QuantityStepper } from "@/components/product/quantity-stepper";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/navigation";
import { categoryById } from "@/data/categories";
import { getProductByVariant } from "@/lib/catalog";
import {
  FREE_SHIPPING_THRESHOLD_ORE,
  HOME_SHIPPING_ORE,
  formatPrice,
  pointsForAmount,
} from "@/lib/currency";
import { useStoreHydrated } from "@/lib/use-store-hydrated";
import type { Locale } from "@/lib/types";
import { useCart } from "@/store/cart";
import { usePreferences } from "@/store/preferences";

export function CartView() {
  const t = useTranslations("cart");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;
  const hydrated = useStoreHydrated();
  const currency = usePreferences((state) => state.currency);
  const { items, setQuantity, removeItem } = useCart();

  const lines = items.flatMap((item) => {
    const match = getProductByVariant(item.variantId);
    if (!match) return [];
    return [{ item, product: match.product, variant: match.variant }];
  });

  const subtotal = lines.reduce(
    (sum, line) => sum + line.variant.priceOre * line.item.quantity,
    0,
  );
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD_ORE ? 0 : HOME_SHIPPING_ORE;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD_ORE - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD_ORE) * 100);

  if (!hydrated) {
    return (
      <div className="container-page py-12">
        <Skeleton className="h-10 w-56" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-3">
            {[0, 1].map((index) => (
              <Skeleton key={index} className="h-32 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-72 rounded-xl" />
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container-page flex flex-col items-center py-24 text-center">
        <span className="grid size-20 place-items-center rounded-full border border-gold/40 bg-gold/10">
          <ShoppingBag className="size-8 text-gold-deep" />
        </span>
        <h1 className="mt-6 font-display text-4xl font-semibold">{t("empty")}</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {t("emptyDescription")}
        </p>
        <Button
          render={<Link href="/shop" />}
          className="mt-7 h-12 rounded-full bg-forest px-7 text-cream hover:bg-forest-soft"
        >
          {t("emptyCta")}
          <ArrowRight />
        </Button>
      </div>
    );
  }

  return (
    <div className="container-page py-10 lg:py-14">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">{t("title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("itemCount", { count })}
          </p>
        </div>
        <Link
          href="/shop"
          className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-forest underline-offset-4 hover:underline"
        >
          {tc("continueShopping")}
        </Link>
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card">
          <div className="hidden grid-cols-[1fr_8rem_7rem] gap-4 border-b border-border/70 bg-sand/40 px-6 py-3 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:grid">
            <span>{tc("viewProduct")}</span>
            <span>{tc("quantity")}</span>
            <span className="text-right">{t("total")}</span>
          </div>
          <ul className="divide-y divide-border/60">
            {lines.map(({ item, product, variant }) => {
              const category = categoryById(product.categoryId);
              return (
                <li
                  key={item.variantId}
                  className="grid gap-4 px-4 py-4 sm:grid-cols-[1fr_8rem_7rem] sm:items-center sm:px-6 sm:py-5"
                >
                  <div className="flex gap-4">
                    <Link
                      href={`/product/${product.slug}`}
                      className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg border border-border/70"
                    >
                      <ProductArt
                        name={product.name[locale]}
                        weight={variant.label[locale]}
                        kind={product.packageKind}
                        accent={category?.accent ?? "#C9A45C"}
                        compact
                      />
                    </Link>
                    <div className="min-w-0">
                      <Link
                        href={`/product/${product.slug}`}
                        className="font-display text-lg font-semibold leading-tight hover:text-forest-soft"
                      >
                        {product.name[locale]}
                      </Link>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {variant.label[locale]} · {category?.name[locale]}
                      </p>
                      <div className="mt-1.5 sm:hidden">
                        <Price amountOre={variant.priceOre} compact />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.variantId)}
                        className="mt-2 inline-flex items-center gap-1.5 text-[0.68rem] text-muted-foreground transition hover:text-clay"
                      >
                        <Trash2 className="size-3" />
                        {t("remove")}
                      </button>
                    </div>
                  </div>

                  <QuantityStepper
                    value={item.quantity}
                    onChange={(quantity) => setQuantity(item.variantId, quantity)}
                    max={variant.stock}
                  />

                  <div className="flex items-center justify-between sm:block sm:text-right">
                    <span className="text-xs text-muted-foreground sm:hidden">
                      {t("total")}
                    </span>
                    <Price
                      amountOre={variant.priceOre * item.quantity}
                      className="text-base font-semibold"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="rounded-2xl border border-border/80 bg-cream p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-2xl font-semibold">{t("summary")}</h2>

          <div className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("subtotal")}</span>
              <Price amountOre={subtotal} />
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("shipping")}</span>
              <span className="font-medium">
                {shipping === 0
                  ? t("shippingFree")
                  : formatPrice(shipping, currency, locale)}
              </span>
            </div>
            <div className="flex justify-between border-t border-border/70 pt-3 text-base font-semibold">
              <span>{t("total")}</span>
              <Price amountOre={subtotal + shipping} className="text-lg" />
            </div>
          </div>

          <div className="mt-5 rounded-lg bg-sand/60 p-3">
            <div className="flex items-center gap-2 text-[0.7rem] text-forest">
              <Truck className="size-3.5 text-gold-deep" />
              {remaining === 0
                ? t("freeShippingReached")
                : t("freeShippingRemaining", {
                    amount: formatPrice(remaining, currency, locale),
                  })}
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream">
              <div
                className="h-full rounded-full bg-gold-gradient transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <p className="mt-3 text-xs text-gold-deep">
            {t("pointsPreview", { points: pointsForAmount(subtotal) })}
          </p>

          <Button
            render={<Link href="/checkout" />}
            className="mt-5 h-12 w-full rounded-full bg-forest text-cream hover:bg-forest-soft"
          >
            {t("checkout")}
            <ArrowRight />
          </Button>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-[0.65rem] text-muted-foreground">
            <Lock className="size-3" />
            {tc("secure")}
          </p>
          <p className="mt-1 text-center text-[0.65rem] leading-relaxed text-muted-foreground">
            {t("deliveryNote")}
          </p>
        </aside>
      </div>
    </div>
  );
}
