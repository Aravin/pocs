"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Check, Mail, MapPin, Sparkles, Store } from "lucide-react";
import { ProductArt } from "@/components/brand/product-art";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/navigation";
import { categoryById } from "@/data/categories";
import { formatPrice } from "@/lib/currency";
import { useStoreHydrated } from "@/lib/use-store-hydrated";
import type { Locale } from "@/lib/types";
import { useOrders } from "@/store/orders";

export function OrderSuccess({ id }: { id: string }) {
  const t = useTranslations("success");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;
  const hydrated = useStoreHydrated();
  const order = useOrders((state) => state.orders.find((item) => item.id === id));

  if (!hydrated) {
    return (
      <div className="container-page py-20">
        <Skeleton className="mx-auto h-64 w-full max-w-xl rounded-2xl" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-page flex flex-col items-center py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">{t("missing")}</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">{t("missingDescription")}</p>
        <Button
          render={<Link href="/shop" />}
          className="mt-6 rounded-full bg-forest px-6 text-cream"
        >
          {t("continue")}
        </Button>
      </div>
    );
  }

  const itemCount = order.lines.reduce((sum, line) => sum + line.quantity, 0);
  const price = (amount: number) => formatPrice(amount, order.currency, locale);

  return (
    <div className="container-page py-12 lg:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-forest text-cream shadow-lg shadow-forest/20">
            <Check className="size-7" />
          </span>
          <p className="mt-5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold-deep">
            {t("eyebrow")}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            {t("title", { name: order.firstName })}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {t("confirmation", { email: order.email })}
          </p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-forest">
            {t("orderNumber", { id: order.id })}
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-gold/30 bg-gold/10 p-4 text-center">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-gold-deep">
            <Sparkles className="size-4" />
            {t("pointsEarned", { points: order.pointsEarned })}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{t("pointsNote")}</p>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border/80 bg-card">
          <div className="border-b border-border/70 px-5 py-4">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {t("summary", { count: itemCount })}
            </p>
            <ul className="mt-3 space-y-3">
              {order.lines.map((line) => {
                const category = categoryById(line.categoryId);
                return (
                  <li key={line.variantId} className="flex items-center gap-3">
                    <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-md border border-border/70">
                      <ProductArt
                        name={line.name}
                        weight={line.variantLabel}
                        kind={line.imageKind}
                        accent={category?.accent ?? line.accent}
                        compact
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{line.name}</p>
                      <p className="text-[0.68rem] text-muted-foreground">
                        {line.variantLabel} × {line.quantity}
                      </p>
                    </div>
                    <span className="text-sm tabular-nums">
                      {price(line.unitPriceOre * line.quantity)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="space-y-2 px-5 py-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{tc("subtotal")}</span>
              <span>{price(order.subtotalOre)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("shipping")}</span>
              <span>{order.shippingOre === 0 ? tc("freeShipping") : price(order.shippingOre)}</span>
            </div>
            {order.discountOre > 0 ? (
              <div className="flex justify-between text-forest">
                <span>{tc("points")}</span>
                <span>−{price(order.discountOre)}</span>
              </div>
            ) : null}
            <div className="flex justify-between border-t border-border/70 pt-2 text-base font-semibold">
              <span>{tc("total")}</span>
              <span>{price(order.totalOre)}</span>
            </div>
          </div>

          <div className="grid gap-3 border-t border-border/70 bg-sand/30 px-5 py-4 text-xs sm:grid-cols-2">
            <div className="flex items-start gap-2.5">
              {order.deliveryMethod === "pickup" ? (
                <Store className="mt-0.5 size-4 text-gold-deep" />
              ) : (
                <MapPin className="mt-0.5 size-4 text-gold-deep" />
              )}
              <div>
                <p className="font-semibold text-forest">
                  {order.deliveryMethod === "pickup" ? t("pickup") : t("delivery")}
                </p>
                <p className="mt-0.5 text-muted-foreground">
                  {order.address}, {order.postalCode} {order.city}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 text-gold-deep" />
              <div>
                <p className="font-semibold text-forest">{order.email}</p>
                <p className="mt-0.5 text-muted-foreground">{t("emailNote")}</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-3 text-center text-[0.68rem] text-muted-foreground">{t("demo")}</p>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button
            render={<Link href="/shop" />}
            className="h-12 flex-1 rounded-full bg-forest text-cream hover:bg-forest-soft"
          >
            {t("continue")}
            <ArrowRight />
          </Button>
          <Button
            variant="outline"
            render={<Link href="/account" />}
            className="h-12 flex-1 rounded-full border-forest/20"
          >
            {t("viewAccount")}
          </Button>
        </div>
      </div>
    </div>
  );
}
