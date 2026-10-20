"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/store/cart";
import { useLoyalty } from "@/store/loyalty";
import { useOrders } from "@/store/orders";
import { usePreferences } from "@/store/preferences";

export function useStoreHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stores = [
      usePreferences.persist,
      useCart.persist,
      useOrders.persist,
      useLoyalty.persist,
    ];
    const check = () => {
      if (stores.every((store) => store.hasHydrated())) setHydrated(true);
    };
    check();
    const unsubscribers = stores.map((store) =>
      store.onFinishHydration(() => check()),
    );
    return () => {
      for (const unsubscribe of unsubscribers) unsubscribe();
    };
  }, []);

  return hydrated;
}
