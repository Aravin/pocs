"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Gift, MapPin, User } from "lucide-react";
import { BrandLockup } from "@/components/brand/logo";
import { TiletRule } from "@/components/brand/ornaments";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";
import { categories } from "@/data/categories";
import type { Locale } from "@/lib/types";
import { CurrencySwitcher, LanguageSwitcher } from "./preferences-switcher";

export function MobileNav({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full gap-0 border-r border-border bg-cream p-0 sm:max-w-sm">
        <SheetHeader className="border-b border-border/70 px-6 py-5">
          <SheetTitle>
            <BrandLockup compact />
          </SheetTitle>
          <SheetDescription className="sr-only">{t("menu")}</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {t("shop")}
          </p>
          <ul className="mt-3 space-y-1">
            <li>
              <Link
                href="/shop"
                onClick={() => onOpenChange(false)}
                className="flex items-center justify-between rounded-lg px-2 py-2.5 font-display text-xl hover:bg-sand/60"
              >
                {t("all")}
                <ArrowUpRight className="size-4 text-gold-deep" />
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/shop/${category.slug}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center justify-between rounded-lg px-2 py-2.5 font-display text-xl hover:bg-sand/60"
                >
                  {category.name[locale]}
                  <span className="text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {category.tagline[locale]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <TiletRule className="my-6 opacity-60" tone="muted" />

          <ul className="space-y-1 text-sm">
            <li>
              <Link
                href="/account"
                onClick={() => onOpenChange(false)}
                className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-sand/60"
              >
                <User className="size-4 text-gold-deep" />
                {t("loyalty")}
              </Link>
            </li>
            <li>
              <Link
                href="/rewards"
                onClick={() => onOpenChange(false)}
                className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-sand/60"
              >
                <Gift className="size-4 text-gold-deep" />
                {t("rewards")}
              </Link>
            </li>
            <li>
              <Link
                href="/integrations/lovely"
                onClick={() => onOpenChange(false)}
                className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-sand/60"
              >
                <MapPin className="size-4 text-gold-deep" />
                {t("integrations")}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => onOpenChange(false)}
                className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-sand/60"
              >
                <ArrowUpRight className="size-4 text-gold-deep" />
                {t("about")}
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-between border-t border-border/70 px-6 py-4">
          <CurrencySwitcher />
          <LanguageSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  );
}
