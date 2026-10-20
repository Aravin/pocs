"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { ProductArt } from "@/components/brand/product-art";
import { Price } from "@/components/product/price";
import { QuantityStepper } from "@/components/product/quantity-stepper";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";
import { categoryById } from "@/data/categories";
import { getProductByVariant } from "@/lib/catalog";
import {
  FREE_SHIPPING_THRESHOLD_ORE,
  formatPrice,
  pointsForAmount,
} from "@/lib/currency";
import type { Locale } from "@/lib/types";
import { useCart } from "@/store/cart";
import { usePreferences } from "@/store/preferences";

export function CartSheet() {
  const t = useTranslations("cart");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;
  const currency = usePreferences((state) => state.currency);
  const { items, isOpen, setOpen, setQuantity, removeItem } = useCart();

  const lines = items.flatMap((item) => {
    const match = getProductByVariant(item.variantId);
    if (!match) return [];
    return [{ item, product: match.product, variant: match.variant }];
  });
  const subtotal = lines.reduce(
    (sum, line) => sum + line.variant.priceOre * line.item.quantity,
    0,
  );
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD_ORE - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD_ORE) * 100);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-full gap-0 border-l border-border bg-cream p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border/80 px-6 py-5">
          <SheetTitle className="flex items-center gap-2 font-display text-2xl">
            <ShoppingBag className="size-5 text-gold-deep" />
            {t("title")}
            <span className="text-sm font-sans font-normal text-muted-foreground">
              ({count})
            </span>
          </SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground">
            {t("shippingThreshold", {
              amount: formatPrice(FREE_SHIPPING_THRESHOLD_ORE, currency, locale),
            })}
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid size-16 place-items-center rounded-full border border-gold/40 bg-gold/10">
              <ShoppingBag className="size-7 text-gold-deep" />
            </span>
            <div>
              <p className="font-display text-2xl">{t("empty")}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("emptyDescription")}</p>
            </div>
            <Button
              render={<Link href="/shop" onClick={() => setOpen(false)} />}
              className="mt-2 rounded-full bg-forest px-6 text-cream hover:bg-forest-soft"
            >
              {t("emptyCta")}
            </Button>
          </div>
        ) : (
          <>
            <div className="border-b border-border/70 px-6 py-4">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-sand">
                <div
                  className="h-full rounded-full bg-gold-gradient transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {remaining === 0
                  ? t("freeShippingReached")
                  : t("freeShippingRemaining", {
                      amount: formatPrice(remaining, currency, locale),
                    })}
              </p>
            </div>

            <ul className="flex-1 divide-y divide-border/60 overflow-y-auto px-6">
              {lines.map(({ item, product, variant }) => {
                const category = categoryById(product.categoryId);
                return (
                  <li key={item.variantId} className="flex gap-4 py-5">
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={() => setOpen(false)}
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
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Link
                            href={`/product/${product.slug}`}
                            onClick={() => setOpen(false)}
                            className="block truncate font-display text-lg font-semibold leading-tight hover:text-forest-soft"
                          >
                            {product.name[locale]}
                          </Link>
                          <p className="text-xs text-muted-foreground">
                            {variant.label[locale]}
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label={tc("remove")}
                          onClick={() => removeItem(item.variantId)}
                          className="rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-clay"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <QuantityStepper
                          compact
                          value={item.quantity}
                          onChange={(quantity) => setQuantity(item.variantId, quantity)}
                          max={variant.stock}
                        />
                        <Price amountOre={variant.priceOre * item.quantity} />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <SheetFooter className="border-t border-border/80 bg-sand/40 px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("subtotal")}</span>
                <Price amountOre={subtotal} className="text-lg font-semibold" />
              </div>
              <p className="text-xs text-gold-deep">
                {t("pointsPreview", { points: pointsForAmount(subtotal) })}
              </p>
              <div className="mt-2 grid gap-2">
                <Button
                  render={<Link href="/checkout" onClick={() => setOpen(false)} />}
                  className="h-12 w-full rounded-full bg-forest text-cream hover:bg-forest-soft"
                >
                  {t("checkout")}
                  <ArrowRight />
                </Button>
                <Button
                  variant="ghost"
                  render={<Link href="/cart" onClick={() => setOpen(false)} />}
                  className="w-full rounded-full text-forest"
                >
                  {t("viewCart")}
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
