import { useLocale, useTranslations } from "next-intl";
import {
  Coffee,
  Droplets,
  Flame,
  Package,
  Soup,
  Wheat,
  ArrowUpRight,
} from "lucide-react";
import { SectionEyebrow, TiletField } from "@/components/brand/ornaments";
import { Link } from "@/i18n/navigation";
import { categories } from "@/data/categories";
import { getCategoryCounts } from "@/lib/catalog";
import type { Locale } from "@/lib/types";

const iconMap = {
  spice: Flame,
  grain: Wheat,
  coffee: Coffee,
  honey: Droplets,
  sauce: Soup,
  pantry: Package,
} as const;

export function CategoryGrid() {
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;
  const counts = getCategoryCounts();

  return (
    <section className="relative py-20 lg:py-24">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <SectionEyebrow>{t("categoriesEyebrow")}</SectionEyebrow>
            <h2 className="mt-4 max-w-md font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
              {t("categoriesTitle")}
            </h2>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {t("categoriesDescription")}
            </p>
            <Link
              href="/shop"
              className="mt-4 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-forest underline-offset-4 hover:underline"
            >
              {t("categoriesCta")}
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon];
            const count = counts.get(category.id) ?? 0;
            return (
              <Link
                key={category.id}
                href={`/shop/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-border/70 p-6 transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(11,43,31,0.45)]"
                style={{ backgroundColor: category.softAccent }}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 size-44 opacity-25">
                  <TiletField />
                </div>
                <div
                  className="pointer-events-none absolute -bottom-8 -right-4 opacity-[0.09] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6"
                  style={{ color: category.accent }}
                >
                  <Icon className="size-40" strokeWidth={0.8} />
                </div>

                <div className="relative flex items-start justify-between">
                  <span
                    className="grid size-11 place-items-center rounded-full border border-white/40 bg-white/50 backdrop-blur"
                    style={{ color: category.accent }}
                  >
                    <Icon className="size-5" strokeWidth={1.4} />
                  </span>
                  <span className="text-[0.62rem] font-semibold tabular-nums text-forest/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative mt-10">
                  <h3 className="font-display text-2xl font-semibold leading-tight text-forest">
                    {category.name[locale]}
                  </h3>
                  <p className="mt-1.5 text-[0.78rem] text-forest/60">
                    {category.tagline[locale]}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-forest/10 pt-3">
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-forest/50">
                      {tc("productCount", { count })}
                    </span>
                    <span className="grid size-7 place-items-center rounded-full border border-forest/15 text-forest transition-all group-hover:border-forest group-hover:bg-forest group-hover:text-cream">
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
