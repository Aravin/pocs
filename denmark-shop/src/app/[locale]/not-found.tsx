import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, Coffee, Gift, Sparkles } from "lucide-react";
import { BrandSeal } from "@/components/brand/logo";
import { SectionEyebrow, TiletRule } from "@/components/brand/ornaments";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });

  return {
    title: t("title"),
    description: t("text"),
  };
}

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  const suggestions = [
    { href: "/shop", label: tn("shop"), icon: Sparkles },
    { href: "/shop/coffee", label: tn("coffee"), icon: Coffee },
    { href: "/rewards", label: tn("rewards"), icon: Gift },
  ] as const;

  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <BrandSeal className="size-20" />
      <SectionEyebrow className="mt-8">{t("eyebrow")}</SectionEyebrow>
      <h1 className="mt-4 max-w-2xl font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">
        {t("title")}
      </h1>
      <TiletRule className="mt-7 max-w-[15rem] opacity-60" />
      <p className="mt-7 max-w-md text-sm leading-relaxed text-muted-foreground">
        {t("text")}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button render={<Link href="/shop" />}>
          {t("shop")}
          <ArrowRight />
        </Button>
        <Button variant="outline" render={<Link href="/" />}>
          {t("home")}
        </Button>
      </div>

      <div className="mt-14 w-full max-w-lg rounded-2xl border border-border/80 bg-card p-6">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          {t("hint")}
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {suggestions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-center gap-2 rounded-xl border border-border/70 bg-background px-3 py-2.5 text-xs font-semibold text-foreground/80 transition hover:border-gold hover:text-forest"
            >
              <item.icon className="size-3.5 text-gold-deep" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
