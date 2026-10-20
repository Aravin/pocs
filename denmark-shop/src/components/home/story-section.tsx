import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, Quote } from "lucide-react";
import { BrandSeal } from "@/components/brand/logo";
import { SectionEyebrow } from "@/components/brand/ornaments";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function StorySection() {
  const t = useTranslations("home");

  return (
    <section className="py-20 lg:py-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="relative">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-border/70">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/market-stall.jpg"
                alt={t("storyImageAlt")}
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-transparent" />
            </div>
          </div>

          <div className="absolute -bottom-6 -right-3 w-[16rem] rounded-2xl border border-gold/30 bg-cream p-5 shadow-2xl sm:-right-6">
            <Quote className="size-5 text-gold-deep" />
            <p className="mt-2 font-display text-lg leading-snug text-forest">
              {t("quote")}
            </p>
            <p className="mt-3 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {t("quoteAuthor")}
            </p>
          </div>

          <div className="absolute -left-4 -top-4">
            <BrandSeal className="size-20" />
          </div>

        </div>

        <div>
          <SectionEyebrow>{t("storyEyebrow")}</SectionEyebrow>
          <h2 className="mt-4 max-w-lg font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
            {t("storyTitle")}
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {t("storyP1")}
          </p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {t("storyP2")}
          </p>

          <div className="mt-8 grid max-w-md grid-cols-3 gap-4 border-y border-border/70 py-5">
            {[
              [t("storyStatYears"), "7"],
              [t("storyStatProducers"), "40+"],
              [t("storyStatCities"), "12"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="font-display text-3xl font-semibold text-forest">{value}</p>
                <p className="mt-1 text-[0.58rem] uppercase leading-tight tracking-[0.12em] text-muted-foreground">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            render={<Link href="/about" />}
            className="mt-7 h-11 rounded-full border-forest/20 px-6 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-forest hover:bg-forest hover:text-cream"
          >
            {t("storyCta")}
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
