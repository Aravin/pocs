"use client";

import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCart } from "@/store/cart";
import { useLoyalty } from "@/store/loyalty";
import { useOrders } from "@/store/orders";
import { usePreferences } from "@/store/preferences";

function StoreHydrator() {
  useEffect(() => {
    void usePreferences.persist.rehydrate();
    void useCart.persist.rehydrate();
    void useOrders.persist.rehydrate();
    void useLoyalty.persist.rehydrate();
  }, []);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delay={200}>
      <StoreHydrator />
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "font-sans",
          style: {
            background: "#0B2B1F",
            color: "#F8F3E9",
            border: "1px solid rgba(201,164,92,0.4)",
          },
        }}
      />
    </TooltipProvider>
  );
}
