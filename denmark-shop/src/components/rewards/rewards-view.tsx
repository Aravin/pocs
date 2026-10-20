"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Check, Gift, Sparkles, Ticket, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { rewardById, rewards } from "@/data/rewards";
import { useStoreHydrated } from "@/lib/use-store-hydrated";
import type { Locale } from "@/lib/types";
import { cn } from "@/lib/utils";
import { pointsBalance, useLoyalty } from "@/store/loyalty";

const typeIcon = {
  voucher: Ticket,
  shipping: Truck,
  product: Gift,
};

export function RewardsView() {
  const t = useTranslations("rewards");
  const ta = useTranslations("account");
  const locale = useLocale() as Locale;
  const hydrated = useStoreHydrated();
  const balance = useLoyalty(pointsBalance);
  const redeemedIds = useLoyalty((state) => state.redeemedIds);
  const redeem = useLoyalty((state) => state.redeem);

  const handleRedeem = (id: string, cost: number, title: string) => {
    if (balance < cost) {
      toast.error(t("redeemError"));
      return;
    }
    redeem(cost, id);
    toast.success(t("redeemSuccess", { title }));
  };

  const coupons = redeemedIds.flatMap((id) => {
    const reward = rewardById(id);
    return reward ? [{ reward, code: `MHS-${id.replace("reward-", "").toUpperCase()}` }] : [];
  });

  return (
    <div>
      <section className="relative overflow-hidden bg-forest text-cream">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -left-16 top-0 size-80 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute right-10 bottom-0 size-64 rounded-full bg-clay/20 blur-3xl" />
        </div>
        <div className="container-page relative py-14 lg:py-16">
          <div className="grid items-end gap-8 sm:grid-cols-[1fr_auto]">
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-gold">
                {t("eyebrow")}
              </p>
              <h1 className="mt-3 max-w-xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
                {t("title")}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/65">
                {t("description")}
              </p>
            </div>
            <div className="rounded-2xl border border-gold/35 bg-forest-soft/80 px-6 py-5 backdrop-blur">
              <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cream/50">
                {t("balance")}
              </p>
              <p className="mt-1 font-display text-5xl font-semibold text-gold-light">
                {balance.toLocaleString(locale === "da" ? "da-DK" : "en-GB")}
              </p>
              <p className="text-[0.62rem] uppercase tracking-[0.16em] text-cream/50">
                {ta("pointsUnit")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12 lg:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rewards.map((reward) => {
            const Icon = typeIcon[reward.type];
            const owned = redeemedIds.includes(reward.id);
            const short = Math.max(0, reward.pointsCost - balance);
            const disabled = !hydrated || owned || short > 0;

            return (
              <article
                key={reward.id}
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-card p-5 transition",
                  reward.highlight
                    ? "border-gold/50 shadow-sm"
                    : "border-border/80",
                  owned && "bg-sand/30",
                )}
              >
                {reward.highlight && !owned ? (
                  <span className="absolute right-4 top-4 rounded-full bg-gold px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-forest">
                    {t("highlight")}
                  </span>
                ) : null}
                <span className="grid size-11 place-items-center rounded-full bg-sand text-forest">
                  <Icon className="size-5" />
                </span>
                <p className="mt-4 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
                  {t(reward.type)}
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold leading-tight">
                  {reward.title[locale]}
                </h2>
                <p className="mt-2 flex-1 text-[0.8rem] leading-relaxed text-muted-foreground">
                  {reward.description[locale]}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                  <span className="text-sm font-semibold tabular-nums text-forest">
                    {t("cost", { points: reward.pointsCost })}
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    disabled={disabled}
                    onClick={() => handleRedeem(reward.id, reward.pointsCost, reward.title[locale])}
                    variant={owned ? "outline" : "default"}
                    className={cn(
                      "rounded-full",
                      !owned &&
                        short === 0 &&
                        "bg-forest text-cream hover:bg-forest-soft",
                    )}
                  >
                    {owned ? (
                      <>
                        <Check className="size-3.5" />
                        {t("redeemed")}
                      </>
                    ) : short > 0 ? (
                      t("notEnough", { points: short })
                    ) : (
                      t("redeem")
                    )}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        {coupons.length > 0 ? (
          <div className="mt-12">
            <h2 className="font-display text-2xl font-semibold">{t("yourCoupons")}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {coupons.map(({ reward, code }) => (
                <div
                  key={reward.id}
                  className="relative overflow-hidden rounded-xl border border-dashed border-gold/60 bg-gold/10 p-5"
                >
                  <div className="absolute -left-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-background" />
                  <div className="absolute -right-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-background" />
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
                    {t(reward.type)}
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold">{reward.title[locale]}</p>
                  <p className="mt-2 font-mono text-sm tracking-[0.14em] text-forest">{code}</p>
                  <p className="mt-2 text-[0.65rem] text-muted-foreground">{t("yourCoupons")}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-muted-foreground">{t("noCoupons")}</p>
        )}

        <div className="mt-12 grid gap-5 rounded-2xl border border-border/80 bg-sand/30 p-6 sm:grid-cols-[1fr_auto] sm:items-center lg:p-8">
          <div>
            <h2 className="font-display text-2xl font-semibold">{t("howTitle")}</h2>
            <ol className="mt-4 grid gap-3 text-sm text-foreground/75 sm:grid-cols-3">
              {[t("how1"), t("how2"), t("how3")].map((step, index) => (
                <li key={step} className="flex gap-2.5">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-forest text-[0.65rem] font-semibold text-cream">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <Button
            render={<Link href="/account" />}
            variant="outline"
            className="rounded-full border-forest/25"
          >
            {t("viewAccount")}
            <ArrowRight />
          </Button>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-center text-[0.68rem] text-muted-foreground">
          <Sparkles className="size-3.5 text-gold-deep" />
          {t("demo")}
        </p>
      </section>
    </div>
  );
}
