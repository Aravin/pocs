import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Clock } from "lucide-react";
import { SectionEyebrow } from "@/components/brand/ornaments";
import { Link } from "@/i18n/navigation";

const recipes = [
  {
    key: "doro",
    titleKey: "recipeDoroTitle",
    noteKey: "recipeDoroNote",
    image: "/images/habesha-platter.jpg",
    href: "/product/berbere",
    timeKey: "recipeDoroTime",
    tag: "Doro wat",
  },
  {
    key: "shiro",
    titleKey: "recipeShiroTitle",
    noteKey: "recipeShiroNote",
    image: "/images/dish-curry.jpg",
    href: "/product/shiro-powder",
    timeKey: "recipeShiroTime",
    tag: "Shiro",
  },
  {
    key: "injera",
    titleKey: "recipeInjeraTitle",
    noteKey: "recipeInjeraNote",
    image: "/images/injera.jpg",
    href: "/product/white-teff-flour",
    timeKey: "recipeInjeraTime",
    tag: "Injera",
  },
] as const;

export function Recipes() {
  const t = useTranslations("home");

  return (
    <section className="border-t border-border/60 bg-sand/25 py-20 lg:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow className="justify-center">{t("recipesEyebrow")}</SectionEyebrow>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
            {t("recipesTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {t("recipesDescription")}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {recipes.map((recipe) => (
            <Link
              key={recipe.key}
              href={recipe.href}
              className="group relative overflow-hidden rounded-2xl border border-border/60"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={recipe.image}
                  alt={t(recipe.titleKey)}
                  fill
                  sizes="(min-width: 768px) 33vw, 90vw"
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/35 to-transparent" />
              </div>
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                <span className="rounded-full border border-cream/25 bg-forest-deep/40 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-cream backdrop-blur">
                  {recipe.tag}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.14em] text-cream/70">
                  <Clock className="size-3" />
                  {t(recipe.timeKey)}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-2xl font-semibold text-cream">
                  {t(recipe.titleKey)}
                </h3>
                <p className="mt-1.5 max-w-xs text-[0.78rem] leading-relaxed text-cream/65">
                  {t(recipe.noteKey)}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-light">
                  {t("recipeCta")}
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
