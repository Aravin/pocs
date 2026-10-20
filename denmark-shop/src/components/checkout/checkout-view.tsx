"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Lock,
  Smartphone,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";
import { ProductArt } from "@/components/brand/product-art";
import { Price } from "@/components/product/price";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useRouter } from "@/i18n/navigation";
import { categoryById } from "@/data/categories";
import { demoMember } from "@/data/member";
import { getProductByVariant } from "@/lib/catalog";
import {
  FREE_SHIPPING_THRESHOLD_ORE,
  HOME_SHIPPING_ORE,
  POINT_VALUE_ORE,
  REDEEM_STEP_POINTS,
  formatPrice,
  pointsForAmount,
} from "@/lib/currency";
import { useStoreHydrated } from "@/lib/use-store-hydrated";
import type { DeliveryMethod, Locale, Order, OrderLine } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useLoyalty, pointsBalance } from "@/store/loyalty";
import { useOrders } from "@/store/orders";
import { usePreferences } from "@/store/preferences";

const makeOrderId = () => `MHS-${Math.floor(10000 + Math.random() * 89999)}`;

export function CheckoutView() {
  const t = useTranslations("checkout");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const hydrated = useStoreHydrated();
  const currency = usePreferences((state) => state.currency);

  const { items, clear } = useCart();
  const placeOrder = useOrders((state) => state.placeOrder);
  const addEarned = useLoyalty((state) => state.addEarned);
  const redeem = useLoyalty((state) => state.redeem);
  const balance = useLoyalty(pointsBalance);

  const [delivery, setDelivery] = useState<DeliveryMethod>("home");
  const [payment, setPayment] = useState<"mobilepay" | "card">("mobilepay");
  const [usePoints, setUsePoints] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: demoMember.firstName,
    lastName: demoMember.lastName,
    email: demoMember.email,
    phone: demoMember.phone,
    address: "Jægersborggade 31",
    postalCode: "2200",
    city: "København N",
  });

  const lines = items.flatMap((item) => {
    const match = getProductByVariant(item.variantId);
    if (!match) return [];
    return [{ item, product: match.product, variant: match.variant }];
  });

  const subtotal = lines.reduce(
    (sum, line) => sum + line.variant.priceOre * line.item.quantity,
    0,
  );
  const shipping =
    delivery === "pickup" || subtotal >= FREE_SHIPPING_THRESHOLD_ORE
      ? 0
      : HOME_SHIPPING_ORE;
  const canRedeem = balance >= REDEEM_STEP_POINTS && subtotal > 0;
  const discountOre =
    usePoints && canRedeem ? REDEEM_STEP_POINTS * POINT_VALUE_ORE : 0;
  const total = Math.max(0, subtotal + shipping - discountOre);
  const pointsEarned = pointsForAmount(total);

  const updateField = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (items.length === 0 || submitting) return;
    setSubmitting(true);

    const orderLines: OrderLine[] = lines.map(({ item, product, variant }) => {
      const category = categoryById(product.categoryId);
      return {
        productId: product.id,
        variantId: variant.id,
        slug: product.slug,
        name: product.name[locale],
        variantLabel: variant.label[locale],
        unitPriceOre: variant.priceOre,
        quantity: item.quantity,
        imageKind: product.packageKind,
        categoryId: product.categoryId,
        accent: category?.accent ?? "#C9A45C",
      };
    });

    const order: Order = {
      id: makeOrderId(),
      createdAt: new Date().toISOString(),
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      address: delivery === "pickup" ? "Jægersborggade 31" : form.address,
      postalCode: delivery === "pickup" ? "2200" : form.postalCode,
      city: delivery === "pickup" ? "København N" : form.city,
      phone: form.phone,
      deliveryMethod: delivery,
      paymentMethod: payment,
      lines: orderLines,
      subtotalOre: subtotal,
      shippingOre: shipping,
      discountOre,
      totalOre: total,
      currency,
      pointsEarned,
      pointsRedeemed: discountOre > 0 ? REDEEM_STEP_POINTS : 0,
    };

    placeOrder(order);
    addEarned(pointsEarned);
    if (discountOre > 0) redeem(REDEEM_STEP_POINTS);
    clear();
    router.push(`/checkout/success/${order.id}`);
  };

  if (!hydrated) {
    return (
      <div className="container-page py-12">
        <Skeleton className="h-10 w-48" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
          <Skeleton className="h-96 rounded-xl" />
          <Skeleton className="h-80 rounded-xl" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center py-24 text-center">
        <h1 className="font-display text-4xl font-semibold">{t("emptyCart")}</h1>
        <Button
          render={<Link href="/shop" />}
          className="mt-6 h-12 rounded-full bg-forest px-7 text-cream hover:bg-forest-soft"
        >
          {tc("shopNow")}
          <ArrowRight />
        </Button>
      </div>
    );
  }

  return (
    <div className="container-page py-10 lg:py-14">
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground transition hover:text-forest"
      >
        <ArrowLeft className="size-3.5" />
        {t("backToCart")}
      </Link>
      <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">{t("title")}</h1>

      <div className="mt-4 rounded-lg border border-gold/30 bg-gold/10 px-4 py-2.5 text-xs text-gold-deep">
        {t("demoNotice")}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_23rem]"
      >
        <div className="space-y-5">
          <section className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6">
            <h2 className="font-display text-2xl font-semibold">{t("contact")}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label={t("firstName")} htmlFor="firstName">
                <Input
                  id="firstName"
                  autoComplete="given-name"
                  required
                  value={form.firstName}
                  onChange={(event) => updateField("firstName", event.target.value)}
                  className="h-11"
                />
              </Field>
              <Field label={t("lastName")} htmlFor="lastName">
                <Input
                  id="lastName"
                  autoComplete="family-name"
                  required
                  value={form.lastName}
                  onChange={(event) => updateField("lastName", event.target.value)}
                  className="h-11"
                />
              </Field>
              <Field label={t("email")} htmlFor="email">
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className="h-11"
                />
              </Field>
              <Field label={t("phone")} htmlFor="phone">
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className="h-11"
                />
              </Field>
            </div>
          </section>

          <section className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6">
            <h2 className="font-display text-2xl font-semibold">{t("delivery")}</h2>
            <div className="mt-4 grid gap-2.5">
              <Choice
                checked={delivery === "home"}
                onChange={() => setDelivery("home")}
                icon={<Truck className="size-4" />}
                title={t("home")}
                description={t("homeDesc")}
                meta={formatPrice(HOME_SHIPPING_ORE, currency, locale)}
              />
              <Choice
                checked={delivery === "pickup"}
                onChange={() => setDelivery("pickup")}
                icon={<Store className="size-4" />}
                title={t("pickup")}
                description={t("pickupDesc")}
                meta={tc("freeShipping")}
              />
            </div>

            {delivery === "home" ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label={t("address")} htmlFor="address" className="sm:col-span-2">
                  <Input
                    id="address"
                    autoComplete="street-address"
                    required
                    value={form.address}
                    onChange={(event) => updateField("address", event.target.value)}
                    className="h-11"
                  />
                </Field>
                <Field label={t("postalCode")} htmlFor="postalCode">
                  <Input
                    id="postalCode"
                    autoComplete="postal-code"
                    required
                    value={form.postalCode}
                    onChange={(event) => updateField("postalCode", event.target.value)}
                    className="h-11"
                  />
                </Field>
                <Field label={t("city")} htmlFor="city">
                  <Input
                    id="city"
                    autoComplete="address-level2"
                    required
                    value={form.city}
                    onChange={(event) => updateField("city", event.target.value)}
                    className="h-11"
                  />
                </Field>
              </div>
            ) : (
              <div className="mt-4 rounded-lg border border-border/70 bg-sand/40 p-4 text-sm">
                <p className="font-semibold text-forest">Miracle Habesha Shop</p>
                <p className="text-muted-foreground">Jægersborggade 31, 2200 København N</p>
                <p className="mt-1 text-xs text-gold-deep">{t("pickupTime")}</p>
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6">
            <h2 className="font-display text-2xl font-semibold">{t("payment")}</h2>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              <Choice
                checked={payment === "mobilepay"}
                onChange={() => setPayment("mobilepay")}
                icon={<Smartphone className="size-4" />}
                title={t("mobilepay")}
                description={t("mobilepayDesc")}
              />
              <Choice
                checked={payment === "card"}
                onChange={() => setPayment("card")}
                icon={<CreditCard className="size-4" />}
                title={t("card")}
                description={t("cardDesc")}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-gold/35 bg-forest p-5 text-cream sm:p-6">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-gold/40 bg-forest-soft">
                <Sparkles className="size-4 text-gold" />
              </span>
              <div className="flex-1">
                <h2 className="font-display text-xl font-semibold">{t("loyalty")}</h2>
                <p className="mt-1 text-xs text-cream/60">
                  {t("pointsAvailable", { count: balance })}
                </p>
                <label
                  className={cn(
                    "mt-4 flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-3.5 transition",
                    canRedeem
                      ? "border-gold/40 bg-forest-soft"
                      : "cursor-not-allowed border-cream/15 opacity-60",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={usePoints}
                      disabled={!canRedeem}
                      onChange={(event) => setUsePoints(event.target.checked)}
                      className="size-4 accent-[#C9A45C]"
                    />
                    <span className="text-sm">
                      {t("usePoints")}
                    </span>
                  </span>
                  {usePoints ? (
                    <span className="text-[0.62rem] uppercase tracking-[0.12em] text-gold-light">
                      {t("pointsUsed")}
                    </span>
                  ) : null}
                </label>
              </div>
            </div>
          </section>
        </div>

        <aside className="rounded-2xl border border-border/80 bg-cream p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-2xl font-semibold">{t("orderSummary")}</h2>

          <ul className="mt-4 space-y-3 border-b border-border/70 pb-4">
            {lines.map(({ item, product, variant }) => {
              const category = categoryById(product.categoryId);
              const lineTotal = variant.priceOre * item.quantity;
              return (
                <li key={item.variantId} className="flex items-center gap-3">
                  <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-md border border-border/70">
                    <ProductArt
                      name={product.name[locale]}
                      weight={variant.label[locale]}
                      kind={product.packageKind}
                      accent={category?.accent ?? "#C9A45C"}
                      compact
                    />
                    <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-forest text-[0.6rem] font-semibold text-cream">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{product.name[locale]}</p>
                    <p className="text-[0.68rem] text-muted-foreground">
                      {variant.label[locale]}
                    </p>
                  </div>
                  <Price amountOre={lineTotal} compact />
                </li>
              );
            })}
          </ul>

          <div className="mt-4 space-y-2.5 text-sm">
            <SummaryRow label={t("subtotal")} amount={subtotal} />
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("shipping")}</span>
              <span className="font-medium">
                {shipping === 0 ? tc("freeShipping") : formatPrice(shipping, currency, locale)}
              </span>
            </div>
            {discountOre > 0 ? (
              <div className="flex justify-between text-forest">
                <span>{t("discount")}</span>
                <span className="font-medium">
                  −{formatPrice(discountOre, currency, locale)}
                </span>
              </div>
            ) : null}
            <div className="flex justify-between border-t border-border/70 pt-3 text-base font-semibold">
              <span>{t("total")}</span>
              <Price amountOre={total} className="text-lg" />
            </div>
            <p className="text-xs text-gold-deep">
              {t("pointsEarned", { points: pointsEarned })}
            </p>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="mt-5 h-12 w-full rounded-full bg-forest text-cream hover:bg-forest-soft"
          >
            {submitting ? t("placing") : t("placeOrder")}
            <Lock className="size-4" />
          </Button>
          <p className="mt-3 text-center text-[0.65rem] leading-relaxed text-muted-foreground">
            {t("terms")}
          </p>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={htmlFor} className="text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

function Choice({
  checked,
  onChange,
  icon,
  title,
  description,
  meta,
}: {
  checked: boolean;
  onChange: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  meta?: string;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer gap-3 rounded-lg border p-3.5 transition",
        checked
          ? "border-forest bg-forest/[0.04] ring-1 ring-forest/20"
          : "border-border hover:border-gold/60",
      )}
    >
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={cn(
          "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full",
          checked ? "bg-forest text-cream" : "bg-sand text-forest",
        )}
      >
        {checked ? <Check className="size-4" /> : icon}
      </span>
      <span className="flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold">{title}</span>
          {meta ? <span className="text-xs text-muted-foreground">{meta}</span> : null}
        </span>
        <span className="mt-0.5 block text-[0.72rem] leading-relaxed text-muted-foreground">
          {description}
        </span>
      </span>
    </label>
  );
}

function SummaryRow({
  label,
  amount,
}: {
  label: string;
  amount: number;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <Price amountOre={amount} compact />
    </div>
  );
}
