import { defineRouting } from "next-intl/routing";

export const locales = ["da", "en"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  da: "Dansk",
  en: "English",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "da",
  localePrefix: "as-needed",
  localeDetection: false,
});

export const localePathnames = {
  shop: "/shop",
  account: "/account",
  rewards: "/rewards",
  about: "/about",
  cart: "/cart",
  checkout: "/checkout",
  integrations: "/integrations/lovely",
} as const;
