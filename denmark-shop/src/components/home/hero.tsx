"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { BrandSeal } from "@/components/brand/logo";
import { SectionEyebrow, TiletRule } from "@/components/brand/ornaments";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { demoMember } from "@/data/member";
import type { Locale } from "@/lib/types";

export function Hero() {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;

  return (
    <section className="relative overflow-hidden bg-hero-glow text-cream">
      <div className="pointer-events-none absolute inset-0 grain-overlay" />
      <div className="pointer-events-none absolute -right-40 top-0 size-[36rem] rounded-full border border-gold/10" />
      <div className="pointer-events-none absolute -right-24 top-16 size-[28rem] rounded-full border border-gold/10" />

      <div className="container-page relative grid gap-12 pb-16 pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-16 lg:pb-24 lg:pt-20">
        <div className="animate-fade-up">
          <SectionEyebrow tone="gold" className="text-gold-light">
            {t("eyebrow")}
          </SectionEyebrow>
          <h1 className="mt-5 max-w-xl font-display text-[2.9rem] font-semibold leading-[1.02] sm:text-6xl lg:text-[4.4rem]">
            {t.rich("title", {
              gold: (chunks) => <span className="text-gold-gradient">{chunks}</span>,
            })}
          </h1>
          <p className="mt-6 max-w-lg text-[0.98rem] leading-relaxed text-cream/70">
            {t("description")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              render={<Link href="/shop" />}
              className="h-12 rounded-full bg-gold-gradient px-7 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-forest shadow-[0_8px_30px_rgba(201,164,92,0.25)] hover:brightness-105"
            >
              {t("ctaShop")}
              <ArrowRight />
            </Button>
            <Button
              variant="outline"
              size="lg"
              render={<Link href="/account" />}
              className="h-12 rounded-full border-cream/25 bg-transparent px-6 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-cream hover:bg-cream/10 hover:text-cream"
            >
              {t("ctaLoyalty")}
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.7rem] uppercase tracking-[0.16em] text-cream/50">
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 animate-pulse rounded-full bg-gold" />
              {t("heroNote")}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-3.5 text-gold/70" />
              {t("heroPlace")}
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative overflow-hidden rounded-t-[12rem] rounded-b-[1.5rem] border border-gold/25 p-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[11rem] rounded-b-[1rem]">
              <Image
                src="/images/hero-spices.jpg"
                alt={t("heroImageAlt")}
                fill
                priority
                sizes="(min-width: 1024px) 44vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-gold-light">
                  {t("heroSince")} · 40+ {t("heroProducers")}
                </p>
                <p className="mt-2 max-w-[16rem] font-display text-2xl leading-tight text-cream">
                  {t("heroImageNote")}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -left-4 top-8 rounded-full border border-gold/30 bg-forest-deep/85 p-3 shadow-xl backdrop-blur sm:-left-8">
            <BrandSeal className="size-16 sm:size-20" />
          </div>

          <div className="mt-4 w-full rounded-2xl border border-gold/30 bg-cream p-4 text-forest shadow-2xl lg:absolute lg:-bottom-5 lg:-left-2 lg:mt-0 lg:w-[15rem] lg:sm:-left-8">
            <div className="flex items-center justify-between">
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-gold-deep">
                {t("heroBadgeTitle")}
              </p>
              <Sparkles className="size-3.5 text-gold-deep" />
            </div>
            <p className="mt-2 font-display text-3xl font-semibold leading-none">
              {demoMember.pointsBalance.toLocaleString(locale === "da" ? "da-DK" : "en-GB")}
              <span className="ml-1 font-sans text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
                {locale === "da" ? "point" : "points"}
              </span>
            </p>
            <p className="mt-1 text-[0.65rem] text-muted-foreground">{t("heroBadgeText")}</p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-sand">
              <div className="h-full w-[82%] rounded-full bg-gold-gradient" />
            </div>
          </div>

          <div className="absolute -right-2 top-1/2 hidden -translate-y-1/2 rotate-90 text-[0.58rem] uppercase tracking-[0.4em] text-cream/30 lg:block">
            {t("eyebrow")}
          </div>
        </div>
      </div>

      <div className="relative border-y border-gold/20 bg-forest-deep/60">
        <div className="flex overflow-hidden py-3">
          <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap pr-8 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-gold/70">
            {Array.from({ length: 2 }).map((_, group) => (
              <span key={group} className="flex items-center gap-8">
                {["Berbere", "Teff", "Yirgacheffe", "Niter Kibbeh", "Wildflower honey", "Shiro", "Korarima", "Jebena"].map(
                  (item) => (
                    <span key={`${group}-${item}`} className="flex items-center gap-8">
                      {item}
                      <span className="text-gold/40">✦</span>
                    </span>
                  ),
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-b border-cream/10 bg-forest-deep/30">
        <div className="container-page grid grid-cols-2 gap-4 py-6 lg:grid-cols-4">
          {[
            [t("trustDelivery"), t("trustDeliveryNote")],
            [t("trustPickup"), t("trustPickupNote")],
            [t("trustStock"), t("trustStockNote")],
            [t("trustLoyalty"), t("trustLoyaltyNote")],
          ].map(([title, note]) => (
            <div key={title} className="flex items-start gap-3">
              <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full border border-gold/25 bg-gold/5">
                <span className="size-1.5 rounded-full bg-gold" />
              </span>
              <div>
                <p className="text-[0.72rem] font-semibold text-cream/85">{title}</p>
                <p className="text-[0.65rem] text-cream/45">{note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-page relative py-6 text-center">
        <TiletRule className="opacity-30" />
        <p className="mt-4 text-[0.6rem] uppercase tracking-[0.32em] text-cream/35">
          {t("heroBottom")}
        </p>
      </div>
    </section>
  );
}
