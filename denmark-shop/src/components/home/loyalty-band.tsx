"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Crown, Gift, Sparkles } from "lucide-react";
import { BrandSeal } from "@/components/brand/logo";
import { SectionEyebrow, TiletField, TiletRule } from "@/components/brand/ornaments";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { demoMember } from "@/data/member";
import type { Locale } from "@/lib/types";

export function LoyaltyBand() {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;
  const ta = useTranslations("account");
  const progress = Math.min(100, (demoMember.pointsBalance / demoMember.nextTierAt) * 100);

  return (
    <section className="relative overflow-hidden bg-forest py-20 text-cream lg:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.14]">
        <TiletField />
      </div>
      <div className="pointer-events-none absolute -left-32 top-10 size-[30rem] rounded-full bg-gold/10 blur-3xl" />

      <div className="container-page relative grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <SectionEyebrow className="text-gold-light">{t("loyaltyEyebrow")}</SectionEyebrow>
          <h2 className="mt-4 max-w-lg font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
            {t("loyaltyTitle")}
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-cream/65">
            {t("loyaltyDescription")}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { title: t("loyaltyStep1Title"), text: t("loyaltyStep1Text"), icon: Sparkles },
              { title: t("loyaltyStep2Title"), text: t("loyaltyStep2Text"), icon: Crown },
              { title: t("loyaltyStep3Title"), text: t("loyaltyStep3Text"), icon: Gift },
            ].map((step, index) => (
              <div
                key={step.title}
                className="rounded-xl border border-cream/10 bg-cream/[0.04] p-4 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-8 place-items-center rounded-full border border-gold/30 text-gold">
                    <step.icon className="size-3.5" />
                  </span>
                  <span className="text-[0.6rem] tabular-nums text-cream/30">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold text-cream">{step.title}</p>
                <p className="mt-1 text-[0.7rem] leading-relaxed text-cream/50">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              render={<Link href="/account" />}
              className="h-11 rounded-full bg-gold-gradient px-6 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-forest hover:brightness-105"
            >
              {t("loyaltyCta")}
              <ArrowRight />
            </Button>
            <Button
              variant="outline"
              render={<Link href="/rewards" />}
              className="h-11 rounded-full border-cream/20 bg-transparent px-5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-cream/85 hover:bg-cream/10 hover:text-cream"
            >
              {t("loyaltySecondary")}
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 rounded-[2rem] border border-gold/15" />
          <div className="relative overflow-hidden rounded-[1.6rem] border border-gold/40 bg-gradient-to-br from-forest-soft via-forest to-forest-deep p-6 shadow-2xl">
            <div className="pointer-events-none absolute -right-10 -top-12 size-48 opacity-20">
              <TiletField />
            </div>
            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-3">
                <BrandSeal className="size-11" />
                <div>
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-gold">
                    Lovely Loyalty
                  </p>
                  <p className="text-[0.55rem] uppercase tracking-[0.24em] text-cream/40">
                    {t("loyaltyMemberLabel")}
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-gold-light">
                {ta("tierHarvest")}
              </span>
            </div>

            <div className="relative mt-8">
              <p className="text-[0.58rem] uppercase tracking-[0.22em] text-cream/40">
                {t("loyaltyPointsLabel")}
              </p>
              <p className="mt-1 font-display text-6xl font-semibold leading-none text-cream">
                {demoMember.pointsBalance.toLocaleString(locale === "da" ? "da-DK" : "en-GB")}
              </p>
              <p className="mt-2 text-[0.68rem] text-gold-light">{t("loyaltyNextTier")}</p>
            </div>

            <div className="relative mt-5">
              <div className="h-1.5 overflow-hidden rounded-full bg-cream/10">
                <div
                  className="h-full rounded-full bg-gold-gradient"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-1.5 flex justify-between text-[0.55rem] uppercase tracking-[0.14em] text-cream/35">
                <span>{ta("tierHarvest")}</span>
                <span>{ta("tierGold")}</span>
              </div>
            </div>

            <TiletRule className="my-5 opacity-20" />

            <div className="relative flex items-end justify-between">
              <div>
                <p className="text-[0.55rem] uppercase tracking-[0.2em] text-cream/35">
                  {demoMember.firstName} {demoMember.lastName}
                </p>
                <p className="mt-1 font-display text-lg tracking-[0.18em] text-cream/80">
                  •••• 0042
                </p>
              </div>
              <div className="flex gap-0.5">
                {[3, 5, 2, 6, 4, 7, 2, 5, 3, 6, 4, 2].map((height, index) => (
                  <span
                    key={index}
                    className="w-[2px] bg-gold/60"
                    style={{ height: `${height * 3}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-[0.6rem] uppercase tracking-[0.18em] text-cream/40">
            <span className="size-1.5 animate-pulse rounded-full bg-gold" />
            {t("heroNote")}
          </div>
        </div>
      </div>
    </section>
  );
}
