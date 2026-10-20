import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { BrandSeal } from "@/components/brand/logo";
import { TiletField, TiletRule } from "@/components/brand/ornaments";
import { Link } from "@/i18n/navigation";
import { categories } from "@/data/categories";
import type { Locale } from "@/lib/types";
import { CurrencySwitcher, LanguageSwitcher } from "./preferences-switcher";

const year = 2026;

export function SiteFooter() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const locale = useLocale() as Locale;

  return (
    <footer className="relative overflow-hidden bg-forest text-cream/75">
      <div className="pointer-events-none absolute inset-0 opacity-[0.13]">
        <TiletField />
      </div>
      <div className="pointer-events-none absolute -left-24 top-0 size-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="container-page relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_0.8fr_0.9fr_0.9fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <BrandSeal className="size-14" />
              <div>
                <p className="font-display text-2xl font-semibold tracking-[0.16em] text-gold-gradient">
                  MIRACLE
                </p>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-cream/70">
                  Habesha Shop
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              {t("tagline")}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.16em] text-cream/60">
              <span className="size-1.5 animate-pulse rounded-full bg-gold" />
              {t("syncNote")}
            </p>
          </div>

          <div>
            <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gold">
              {t("shopTitle")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/shop" className="transition hover:text-cream">
                  {tn("all")}
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/shop/${category.slug}`}
                    className="transition hover:text-cream"
                  >
                    {category.name[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gold">
              {t("helpTitle")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/info/delivery" className="transition hover:text-cream">
                  {t("delivery")}
                </Link>
              </li>
              <li>
                <Link href="/info/returns" className="transition hover:text-cream">
                  {t("returns")}
                </Link>
              </li>
              <li>
                <Link href="/info/faq" className="transition hover:text-cream">
                  {t("faq")}
                </Link>
              </li>
              <li>
                <a href="mailto:hej@miraclehabesha.dk" className="transition hover:text-cream">
                  {t("contact")}
                </a>
              </li>
              <li>
                <Link href="/info/terms" className="transition hover:text-cream">
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link href="/info/privacy" className="transition hover:text-cream">
                  {t("privacy")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gold">
              {t("companyTitle")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="transition hover:text-cream">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/account" className="transition hover:text-cream">
                  {t("account")}
                </Link>
              </li>
              <li>
                <Link href="/rewards" className="transition hover:text-cream">
                  {t("rewards")}
                </Link>
              </li>
              <li>
                <Link
                  href="/integrations/lovely"
                  className="inline-flex items-center gap-1.5 transition hover:text-cream"
                >
                  {t("pos")}
                  <ArrowUpRight className="size-3" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gold">
              {t("visitTitle")}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-gold/80" />
                <span>{t("address")}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-3.5 shrink-0 text-gold/80" />
                <span>{t("hours")}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-3.5 shrink-0 text-gold/80" />
                <a href="tel:+4542187390" className="transition hover:text-cream">
                  {t("phone")}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-3.5 shrink-0 text-gold/80" />
                <a href="mailto:hej@miraclehabesha.dk" className="transition hover:text-cream">
                  {t("email")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <TiletRule className="my-10 opacity-30" />

        <div className="flex flex-col gap-5 text-xs text-cream/50 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>{t("rights", { year })}</span>
            <span className="hidden h-3 w-px bg-cream/20 sm:block" />
            <span>{t("org")}</span>
            <span className="hidden h-3 w-px bg-cream/20 sm:block" />
            <span>{t("demo")}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {["MobilePay", "Visa", "Mastercard", "Apple Pay"].map((method) => (
              <span
                key={method}
                className="rounded border border-cream/15 bg-cream/5 px-2 py-1 text-[0.6rem] font-semibold tracking-wide text-cream/60"
              >
                {method}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <CurrencySwitcher variant="footer" />
            <LanguageSwitcher variant="footer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
