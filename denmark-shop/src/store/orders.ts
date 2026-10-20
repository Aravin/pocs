"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order } from "@/lib/types";

interface OrdersState {
  orders: Order[];
  placeOrder: (order: Order) => void;
  getOrder: (id: string) => Order | undefined;
}

export const useOrders = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      placeOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders.filter((item) => item.id !== order.id)],
        })),
      getOrder: (id) => get().orders.find((order) => order.id === id),
    }),
    {
      name: "mhs-orders",
      skipHydration: true,
      partialize: (state) => ({ orders: state.orders }),
    },
  ),
);
