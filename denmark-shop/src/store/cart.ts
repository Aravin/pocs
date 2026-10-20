"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProductByVariant } from "@/lib/catalog";

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  lastAdded: string | null;
  addItem: (variantId: string, quantity?: number) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  setOpen: (open: boolean) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      lastAdded: null,
      addItem: (variantId, quantity = 1) => {
        const match = getProductByVariant(variantId);
        if (!match) return;
        const max = match.variant.stock;
        if (max < 1) return;

        set((state) => {
          const existing = state.items.find((item) => item.variantId === variantId);
          const items = existing
            ? state.items.map((item) =>
                item.variantId === variantId
                  ? { ...item, quantity: Math.min(item.quantity + quantity, max) }
                  : item,
              )
            : [
                ...state.items,
                { productId: match.product.id, variantId, quantity: Math.min(quantity, max) },
              ];
          return { items, isOpen: true, lastAdded: variantId };
        });
      },
      setQuantity: (variantId, quantity) =>
        set((state) => {
          const match = getProductByVariant(variantId);
          const max = match?.variant.stock ?? 0;
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.variantId !== variantId) };
          }
          return {
            items: state.items.map((item) =>
              item.variantId === variantId
                ? { ...item, quantity: Math.min(quantity, max) }
                : item,
            ),
          };
        }),
      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((item) => item.variantId !== variantId),
        })),
      clear: () => set({ items: [], lastAdded: null }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      setOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: "mhs-cart",
      skipHydration: true,
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export const selectCartCount = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectSubtotal = (state: CartState) =>
  state.items.reduce((sum, item) => {
    const match = getProductByVariant(item.variantId);
    return match ? sum + match.variant.priceOre * item.quantity : sum;
  }, 0);
