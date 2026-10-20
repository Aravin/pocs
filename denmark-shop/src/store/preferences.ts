"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultCurrency, isCurrency } from "@/lib/currency";
import type { CurrencyCode } from "@/lib/types";

interface PreferencesState {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
}

export const usePreferences = create<PreferencesState>()(
  persist(
    (set) => ({
      currency: defaultCurrency,
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: "mhs-preferences",
      skipHydration: true,
      partialize: (state) => ({ currency: state.currency }),
      merge: (persisted, current) => {
        const value = (persisted as Partial<PreferencesState> | undefined)?.currency;
        return {
          ...current,
          currency: typeof value === "string" && isCurrency(value) ? value : defaultCurrency,
        };
      },
    },
  ),
);
