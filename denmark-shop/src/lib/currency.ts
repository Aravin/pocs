import type { CurrencyCode, Locale } from "./types";

export const currencies: CurrencyCode[] = ["DKK", "EUR", "SEK"];

export const defaultCurrency: CurrencyCode = "DKK";

export const currencyMeta: Record<
  CurrencyCode,
  { rate: number; label: string; symbol: string; note: Record<Locale, string> }
> = {
  DKK: {
    rate: 1,
    label: "DKK",
    symbol: "kr.",
    note: { da: "Dansk krone", en: "Danish krone" },
  },
  EUR: {
    rate: 0.134,
    label: "EUR",
    symbol: "€",
    note: { da: "Indikativ kurs", en: "Indicative rate" },
  },
  SEK: {
    rate: 1.53,
    label: "SEK",
    symbol: "kr",
    note: { da: "Indikativ kurs", en: "Indicative rate" },
  },
};

export const isCurrency = (value: string | undefined): value is CurrencyCode =>
  !!value && currencies.includes(value as CurrencyCode);

export const convertOre = (amountDkkOre: number, currency: CurrencyCode) =>
  Math.round(amountDkkOre * currencyMeta[currency].rate);

export const formatPrice = (
  amountDkkOre: number,
  currency: CurrencyCode,
  locale: Locale,
) => {
  const intlLocale = locale === "da" ? "da-DK" : "en-GB";
  const amount = convertOre(amountDkkOre, currency) / 100;
  return new Intl.NumberFormat(intlLocale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatPriceCompact = (
  amountDkkOre: number,
  currency: CurrencyCode,
  locale: Locale,
) => {
  const intlLocale = locale === "da" ? "da-DK" : "en-GB";
  const amount = convertOre(amountDkkOre, currency) / 100;
  return new Intl.NumberFormat(intlLocale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const pointsForAmount = (amountDkkOre: number) =>
  Math.floor(amountDkkOre / 1000);

export const FREE_SHIPPING_THRESHOLD_ORE = 49900;
export const HOME_SHIPPING_ORE = 4900;
export const POINT_VALUE_ORE = 10;
export const REDEEM_STEP_POINTS = 200;
