"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Clock,
  Gift,
  MapPin,
  Sparkles,
  Store,
  Trophy,
} from "lucide-react";
import { BrandSeal } from "@/components/brand/logo";
import { ProductArt } from "@/components/brand/product-art";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { demoMember, getMemberOrders, pointsHistory } from "@/data/member";
import { categoryById } from "@/data/categories";
import { formatPrice } from "@/lib/currency";
import type { Locale, Order } from "@/lib/types";
import { cn } from "@/lib/utils";
import { pointsBalance, useLoyalty } from "@/store/loyalty";
import { useOrders } from "@/store/orders";

const tabs = ["overview", "orders", "points"] as const;
type Tab = (typeof tabs)[number];

const dateFormatter = (locale: Locale) =>
  new Intl.DateTimeFormat(locale === "da" ? "da-DK" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export function AccountDashboard() {
  const t = useTranslations("account");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;
  const [tab, setTab] = useState<Tab>("overview");

  const balance = useLoyalty(pointsBalance);
  const earned = useLoyalty((state) => state.earned);
  const spent = useLoyalty((state) => state.spent);
  const localOrders = useOrders((state) => state.orders);

  const memberOrders = getMemberOrders(locale);
  const orders = [...localOrders, ...memberOrders];
  const fmtDate = dateFormatter(locale);

  const progress = Math.min(100, (balance / demoMember.nextTierAt) * 100);
  const pointsToNext = Math.max(0, demoMember.nextTierAt - balance);
  const currentTier = balance >= 1500 ? "gold" : balance >= 500 ? "harvest" : "seed";
  const tierName = t(
    currentTier === "seed" ? "tierSeed" : currentTier === "harvest" ? "tierHarvest" : "tierGold",
  );

  return (
    <div>
      <section className="relative overflow-hidden bg-forest text-cream">
        <div className="pointer-events-none absolute inset-0 opacity-[0.16]">
          <div className="absolute -left-20 top-10 size-80 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -right-10 bottom-0 size-72 rounded-full bg-clay/20 blur-3xl" />
        </div>
        <div className="container-page relative py-12 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_23rem]">
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-gold">
                {t("eyebrow")}
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                {t("greeting", { name: demoMember.firstName })}
              </h1>
              <p className="mt-2 text-sm text-cream/60">
                {t("memberSince", {
                  date: fmtDate.format(new Date(demoMember.memberSince)),
                })}
              </p>

              <div className="mt-7 flex flex-wrap items-end gap-x-10 gap-y-5">
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.2em] text-cream/50">
                    {t("balance")}
                  </p>
                  <p className="mt-1 font-display text-5xl font-semibold text-gold-light">
                    {balance.toLocaleString(locale === "da" ? "da-DK" : "en-GB")}
                  </p>
                  <p className="text-[0.65rem] uppercase tracking-[0.16em] text-cream/50">
                    {t("pointsUnit")}
                  </p>
                </div>
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.2em] text-cream/50">
                    {t("tier")}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-2 font-display text-2xl text-gold">
                    <Trophy className="size-5" />
                    {tierName}
                  </p>
                </div>
              </div>

              <div className="mt-6 max-w-md">
                <div className="flex items-center justify-between text-[0.65rem] text-cream/60">
                  <span>{t("tierProgress")}</span>
                  <span>{pointsToNext > 0 ? t("nextTier", { points: pointsToNext }) : t("maxTier")}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-cream/10">
                  <div
                    className="h-full rounded-full bg-gold-gradient"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <p className="mt-3 text-[0.7rem] text-cream/45">
                {t("demo")} · {t("posSynced")}
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-forest-soft to-forest-deep/95 p-5 shadow-2xl">
              <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full border border-gold/20" />
              <div className="pointer-events-none absolute -right-4 -top-4 size-24 rounded-full border border-gold/15" />
              <div className="flex items-start justify-between">
                <BrandSeal className="size-11" />
                <span className="rounded-full border border-gold/40 px-2 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-gold">
                  {tierName}
                </span>
              </div>
              <p className="mt-7 font-display text-xl text-cream">
                {demoMember.firstName} {demoMember.lastName}
              </p>
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-cream/60">
                {demoMember.id}
              </p>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-[0.55rem] uppercase tracking-[0.18em] text-cream/55">
                    {t("memberCard")}
                  </p>
                  <p className="mt-1 font-display text-2xl text-gold-light">
                    {balance.toLocaleString(locale === "da" ? "da-DK" : "en-GB")}{" "}
                    <span className="text-xs uppercase tracking-widest">{t("pointsUnit")}</span>
                  </p>
                </div>
                <p className="max-w-[7rem] text-right text-[0.55rem] leading-relaxed text-cream/55">
                  {t("memberCardNote")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-border/70 bg-cream">
        <div className="container-page flex gap-1 overflow-x-auto">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={cn(
                "relative shrink-0 px-4 py-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition",
                tab === item ? "text-forest" : "text-muted-foreground hover:text-forest",
              )}
            >
              {t(item === "overview" ? "tabsOverview" : item === "orders" ? "tabsOrders" : "tabsPoints")}
              {tab === item ? (
                <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-gold" />
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div className="container-page py-10 lg:py-12">
        {tab === "overview" ? (
          <div className="grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-semibold">{t("recentOrders")}</h2>
                <button
                  type="button"
                  onClick={() => setTab("orders")}
                  className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-forest hover:underline"
                >
                  {tc("viewAll")}
                </button>
              </div>
              <div className="mt-4 space-y-3">
                {orders.slice(0, 2).map((order) => (
                  <OrderCard key={order.id} order={order} locale={locale} />
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-gold/30 bg-gold/10 p-5">
                  <Gift className="size-5 text-gold-deep" />
                  <p className="mt-3 font-display text-lg font-semibold">{t("rewardsCta")}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {balance.toLocaleString(locale === "da" ? "da-DK" : "en-GB")} {t("pointsUnit")}
                  </p>
                  <Button
                    render={<Link href="/rewards" />}
                    variant="ghost"
                    size="sm"
                    className="mt-2 px-0 text-forest hover:bg-transparent"
                  >
                    {t("rewardsCta")}
                    <ArrowRight className="size-3.5" />
                  </Button>
                </div>
                <div className="rounded-xl border border-border/80 bg-card p-5">
                  <Sparkles className="size-5 text-gold-deep" />
                  <p className="mt-3 font-display text-lg font-semibold">{t("perks")}</p>
                  <ul className="mt-2 space-y-1.5 text-[0.72rem] text-muted-foreground">
                    <li>{t("perk1")}</li>
                    <li>{t("perk2")}</li>
                    <li>{t("perk3")}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">{t("pointsHistory")}</h2>
                <button
                  type="button"
                  onClick={() => setTab("points")}
                  className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-forest hover:underline"
                >
                  {tc("viewAll")}
                </button>
              </div>
              <ul className="mt-3 divide-y divide-border/60">
                {pointsHistory.slice(0, 5).map((entry) => (
                  <li key={entry.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm">{entry.description[locale]}</p>
                      <p className="text-[0.65rem] text-muted-foreground">
                        {fmtDate.format(new Date(entry.date))}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 text-sm font-semibold tabular-nums",
                        entry.points > 0 ? "text-forest" : "text-clay",
                      )}
                    >
                      {entry.points > 0 ? "+" : ""}
                      {entry.points}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-lg bg-sand/50 p-3 text-[0.68rem] text-muted-foreground">
                {t("retailNote")}
              </div>
            </div>
          </div>
        ) : null}

        {tab === "orders" ? (
          <div>
            <h2 className="font-display text-2xl font-semibold">{t("tabsOrders")}</h2>
            {orders.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                <p className="font-display text-xl">{t("noOrders")}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t("noOrdersDescription")}</p>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {localOrders.length > 0 ? (
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
                    {t("ordersLocal")}
                  </p>
                ) : null}
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} locale={locale} detailed />
                ))}
              </div>
            )}
          </div>
        ) : null}

        {tab === "points" ? (
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_18rem]">
            <div>
              <h2 className="font-display text-2xl font-semibold">{t("pointsHistory")}</h2>
              <div className="mt-4 overflow-hidden rounded-2xl border border-border/80 bg-card">
                <div className="hidden grid-cols-[7rem_1fr_7rem_5rem] gap-3 border-b border-border/70 bg-sand/40 px-5 py-3 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:grid">
                  <span>{t("pointsTableDate")}</span>
                  <span>{t("pointsTableDescription")}</span>
                  <span>{t("tier")}</span>
                  <span className="text-right">{t("pointsTablePoints")}</span>
                </div>
                <ul className="divide-y divide-border/60">
                  {pointsHistory.map((entry) => (
                    <li
                      key={entry.id}
                      className="grid gap-1 px-5 py-3.5 text-sm sm:grid-cols-[7rem_1fr_7rem_5rem] sm:items-center sm:gap-3"
                    >
                      <span className="text-[0.7rem] text-muted-foreground">
                        {fmtDate.format(new Date(entry.date))}
                      </span>
                      <span>{entry.description[locale]}</span>
                      <span className="text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
                        {entry.channel === "online"
                          ? t("pointsOnline")
                          : entry.channel === "in-store"
                            ? t("pointsInStore")
                            : t("pointsReward")}
                      </span>
                      <span
                        className={cn(
                          "text-sm font-semibold tabular-nums sm:text-right",
                          entry.points > 0 ? "text-forest" : "text-clay",
                        )}
                      >
                        {entry.points > 0 ? "+" : ""}
                        {entry.points}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="rounded-2xl border border-gold/30 bg-gold/10 p-5">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t("balance")}
              </p>
              <p className="mt-1 font-display text-4xl font-semibold text-forest">{balance}</p>
              <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                {t("pointsUnit")}
              </p>
              <div className="mt-4 space-y-1.5 border-t border-gold/25 pt-3 text-xs text-foreground/70">
                <p className="flex justify-between">
                  <span>{t("pointsOnline")}</span>
                  <span className="font-medium">+{earned}</span>
                </p>
                <p className="flex justify-between">
                  <span>{t("pointsReward")}</span>
                  <span className="font-medium">−{spent}</span>
                </p>
              </div>
              <Button
                render={<Link href="/rewards" />}
                className="mt-4 h-10 w-full rounded-full bg-forest text-cream hover:bg-forest-soft"
              >
                {t("rewardsCta")}
                <ArrowRight />
              </Button>
            </aside>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function OrderCard({
  order,
  locale,
  detailed = false,
}: {
  order: Order;
  locale: Locale;
  detailed?: boolean;
}) {
  const t = useTranslations("account");
  const tc = useTranslations("common");
  const fmtDate = dateFormatter(locale);
  const isLocal = order.id.length > 5 && !["MHS-10482", "MHS-10311", "MHS-10109"].includes(order.id);
  const status = isLocal
    ? t("orderStatusProcessing")
    : order.deliveryMethod === "pickup"
      ? t("orderStatusReady")
      : t("orderStatusDelivered");
  const itemCount = order.lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <article className="rounded-xl border border-border/80 bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-forest">
            {order.id}
          </p>
          <p className="text-[0.65rem] text-muted-foreground">
            {fmtDate.format(new Date(order.createdAt))} · {tc("items", { count: itemCount })}
          </p>
        </div>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em]",
            isLocal
              ? "bg-gold/15 text-gold-deep"
              : "bg-forest/10 text-forest",
          )}
        >
          {status}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex -space-x-3">
          {order.lines.slice(0, 4).map((line) => {
            const category = categoryById(line.categoryId);
            return (
              <span
                key={line.variantId}
                className="size-11 overflow-hidden rounded-lg border-2 border-card bg-cream"
              >
                <ProductArt
                  name={line.name}
                  weight={line.variantLabel}
                  kind={line.imageKind}
                  accent={category?.accent ?? line.accent}
                  compact
                />
              </span>
            );
          })}
        </div>
        <div className="ml-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.65rem] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            {order.deliveryMethod === "pickup" ? (
              <Store className="size-3" />
            ) : (
              <MapPin className="size-3" />
            )}
            {order.deliveryMethod === "pickup" ? t("orderPickup") : t("orderDelivery")}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" />
            {order.pointsEarned} {t("pointsUnit")}
          </span>
        </div>
      </div>

      {detailed ? (
        <ul className="mt-3 space-y-1 border-t border-border/60 pt-3 text-[0.72rem] text-muted-foreground">
          {order.lines.map((line) => (
            <li key={line.variantId} className="flex justify-between gap-2">
              <span>
                {line.name} · {line.variantLabel} × {line.quantity}
              </span>
              <span className="tabular-nums">
                {formatPrice(line.unitPriceOre * line.quantity, order.currency, locale)}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3 text-sm">
        <span className="text-[0.65rem] text-muted-foreground">
          {order.deliveryMethod === "pickup" ? t("orderPickup") : t("orderDelivery")}
        </span>
        <span className="font-semibold">
          {formatPrice(order.totalOre, order.currency, locale)}
        </span>
      </div>
    </article>
  );
}
