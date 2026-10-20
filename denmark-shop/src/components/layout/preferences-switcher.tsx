"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Check, ChevronDown, Globe, Languages } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { currencyMeta, currencies } from "@/lib/currency";
import type { CurrencyCode, Locale } from "@/lib/types";
import { localeLabels, locales } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { usePreferences } from "@/store/preferences";

export function CurrencySwitcher({
  variant = "default",
  className,
}: {
  variant?: "default" | "footer";
  className?: string;
}) {
  const t = useTranslations("common");
  const locale = useLocale() as Locale;
  const currency = usePreferences((state) => state.currency);
  const setCurrency = usePreferences((state) => state.setCurrency);

  const handleChange = (next: CurrencyCode) => {
    setCurrency(next);
    if (next !== "DKK") {
      toast.info(`${t("approx")} · 1 DKK = ${currencyMeta[next].rate} ${next}`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-full gap-1.5 px-2.5 text-[0.7rem] font-semibold tracking-[0.14em]",
              variant === "footer" && "text-cream/80 hover:bg-cream/10 hover:text-cream",
              className,
            )}
          />
        }
      >
        <Globe className="size-3.5" />
        {currency}
        <ChevronDown className="size-3 opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuLabel>{t("currency")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {currencies.map((code) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleChange(code)}
            className="justify-between"
          >
            <span className="flex items-center gap-2">
              <span className="w-8 font-semibold">{code}</span>
              <span className="text-xs text-muted-foreground">
                {currencyMeta[code].note[locale]}
              </span>
            </span>
            {currency === code ? <Check className="size-3.5 text-gold-deep" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LanguageSwitcher({
  variant = "default",
  className,
}: {
  variant?: "default" | "footer";
  className?: string;
}) {
  const t = useTranslations("common");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-full gap-1.5 px-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em]",
              variant === "footer" && "text-cream/80 hover:bg-cream/10 hover:text-cream",
              className,
            )}
          />
        }
      >
        <Languages className="size-3.5" />
        {locale}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {locales.map((code) => (
          <DropdownMenuItem
            key={code}
            onClick={() =>
              router.replace(`${pathname}${window.location.search}`, { locale: code })
            }
            className="justify-between"
          >
            {localeLabels[code]}
            {locale === code ? <Check className="size-3.5 text-gold-deep" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
