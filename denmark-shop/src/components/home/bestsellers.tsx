import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { SectionEyebrow } from "@/components/brand/ornaments";
import { ProductCard } from "@/components/product/product-card";
import { Link } from "@/i18n/navigation";
import { bestsellerProducts } from "@/data/products";
import type { Locale } from "@/lib/types";

export function Bestsellers() {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;

  return (
    <section className="border-y border-border/60 bg-sand/30 py-20 lg:py-24">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionEyebrow>{t("bestsellersEyebrow")}</SectionEyebrow>
            <h2 className="mt-4 max-w-lg font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
              {t("bestsellersTitle")}
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {t("bestsellersDescription")}
            </p>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-forest transition hover:border-gold hover:bg-gold/10"
          >
            {t("categoriesCta")}
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-6">
          {bestsellerProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
