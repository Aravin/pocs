import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Clock, Coffee, HeartHandshake, MapPin, Sparkles } from "lucide-react";
import { SectionEyebrow, TiletRule } from "@/components/brand/ornaments";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const about = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("about"),
    description: about("intro"),
    alternates: {
      canonical: locale === "da" ? "/about" : "/en/about",
      languages: { "da-DK": "/about", en: "/en/about" },
    },
    openGraph: {
      title: t("about"),
      description: about("intro"),
      images: [{ url: "/images/market-stall.jpg" }],
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const tc = await getTranslations({ locale, namespace: "common" });

  const values = [
    { title: t("value1Title"), text: t("value1Text"), icon: HeartHandshake },
    { title: t("value2Title"), text: t("value2Text"), icon: Sparkles },
    { title: t("value3Title"), text: t("value3Text"), icon: Coffee },
  ];

  const timeline = [
    { year: "2019", title: t("year2019Title"), text: t("year2019Text") },
    { year: "2022", title: t("year2022Title"), text: t("year2022Text") },
    { year: "2024", title: t("year2024Title"), text: t("year2024Text") },
    { year: "2026", title: t("year2026Title"), text: t("year2026Text") },
  ];

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/60 bg-cream">
        <div className="container-page grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-20">
          <div>
            <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
            <h1 className="mt-4 max-w-xl font-display text-5xl font-semibold leading-[1.02] sm:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
              {t("intro")}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-3.5 text-gold-deep" />
                Jægersborggade 31 · København N
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="size-3.5 text-gold-deep" />
                Mon–Fri 10–19
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/70">
              <Image
                src="/images/market-stall.jpg"
                alt={t("title")}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 rounded-xl border border-gold/40 bg-forest px-5 py-4 text-cream shadow-xl sm:left-6">
              <p className="font-display text-2xl font-semibold text-gold-light">2019</p>
              <p className="text-[0.58rem] uppercase tracking-[0.2em] text-cream/60">
                Nørrebro · Copenhagen
              </p>
            </div>
            <div className="pointer-events-none absolute -right-3 -top-3 size-24 rounded-full border border-gold/30" />
          </div>
        </div>
      </section>

      <section className="container-page grid gap-10 py-16 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:py-20">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/70">
            <Image
              src="/images/coffee-ceremony.jpg"
              alt={t("eyebrow")}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/50 to-transparent" />
          </div>
          <div className="absolute -right-4 bottom-6 max-w-[15rem] rounded-xl border border-gold/30 bg-cream/95 px-5 py-4 shadow-lg backdrop-blur sm:right-6">
            <p className="font-display text-lg leading-snug text-forest">“{t("quote")}”</p>
            <p className="mt-2 text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
              {t("quoteAuthor")}
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight">
            {t("storyTitle")}
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-foreground/75">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </div>
          <TiletRule className="my-7 opacity-40" />
          <Button
            render={<Link href="/shop" />}
            variant="ghost"
            className="px-0 text-forest hover:bg-transparent"
          >
            {t("cta")}
            <ArrowRight />
          </Button>
        </div>
      </section>

      <section className="border-y border-border/60 bg-sand/30 py-16 lg:py-20">
        <div className="container-page">
          <div className="max-w-xl">
            <SectionEyebrow>{t("valuesEyebrow")}</SectionEyebrow>
            <h2 className="mt-3 font-display text-4xl font-semibold">{t("valuesTitle")}</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="rounded-2xl border border-border/80 bg-card p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-full bg-sand text-forest">
                    <value.icon className="size-4" />
                  </span>
                  <span className="font-display text-3xl text-gold/50">0{index + 1}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 lg:py-20">
        <div className="max-w-xl">
          <SectionEyebrow>{t("timelineEyebrow")}</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold">{t("timelineTitle")}</h2>
        </div>
        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {timeline.map((item) => (
            <div key={item.year} className="relative border-t border-gold/40 pt-4">
              <span className="absolute -top-1.5 left-0 size-3 rounded-full border-2 border-cream bg-gold" />
              <p className="font-display text-3xl font-semibold text-gold-deep">{item.year}</p>
              <h3 className="mt-2 text-sm font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-[0.8rem] leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-16 lg:pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-forest text-cream">
          <div className="grid lg:grid-cols-2">
            <div className="p-7 sm:p-10">
              <SectionEyebrow className="text-gold">Nørrebro · København</SectionEyebrow>
              <h2 className="mt-3 font-display text-4xl font-semibold">{t("visitTitle")}</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/65">
                {t("visitText")}
              </p>
              <dl className="mt-7 grid gap-5 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-[0.58rem] uppercase tracking-[0.18em] text-cream/40">
                    {t("addressLabel")}
                  </dt>
                  <dd className="mt-1">Jægersborggade 31<br />2200 København N</dd>
                </div>
                <div>
                  <dt className="text-[0.58rem] uppercase tracking-[0.18em] text-cream/40">
                    {t("hoursLabel")}
                  </dt>
                  <dd className="mt-1">{t("hours")}</dd>
                </div>
                <div>
                  <dt className="text-[0.58rem] uppercase tracking-[0.18em] text-cream/40">
                    {t("contactLabel")}
                  </dt>
                  <dd className="mt-1">
                    <a href="mailto:hej@miraclehabesha.dk" className="hover:text-gold-light">
                      hej@miraclehabesha.dk
                    </a>
                    <br />
                    <a href="tel:+4542187390" className="hover:text-gold-light">
                      +45 42 18 73 90
                    </a>
                  </dd>
                </div>
              </dl>
              <Button
                render={<Link href="/shop" />}
                className="mt-7 rounded-full bg-gold text-forest hover:bg-gold-light"
              >
                {t("cta")}
                <ArrowRight />
              </Button>
            </div>
            <div className="relative min-h-64 lg:min-h-full">
              <Image
                src="/images/coffee-pour.jpg"
                alt={t("visitTitle")}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/30 to-transparent lg:from-forest lg:via-transparent" />
            </div>
          </div>
        </div>
        <p className="mt-5 text-center text-[0.68rem] text-muted-foreground">
          {tc("demoMode")} · Lovely Loyalty POS
        </p>
      </section>
    </div>
  );
}
