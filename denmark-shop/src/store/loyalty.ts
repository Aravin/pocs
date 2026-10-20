"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { demoMember } from "@/data/member";

interface LoyaltyState {
  earned: number;
  spent: number;
  redeemedIds: string[];
  addEarned: (points: number) => void;
  redeem: (points: number, rewardId?: string) => void;
  reset: () => void;
}

export const useLoyalty = create<LoyaltyState>()(
  persist(
    (set) => ({
      earned: 0,
      spent: 0,
      redeemedIds: [],
      addEarned: (points) =>
        set((state) => ({ earned: state.earned + Math.max(0, points) })),
      redeem: (points, rewardId) =>
        set((state) => ({
          spent: state.spent + Math.max(0, points),
          redeemedIds: rewardId
            ? Array.from(new Set([...state.redeemedIds, rewardId]))
            : state.redeemedIds,
        })),
      reset: () => set({ earned: 0, spent: 0, redeemedIds: [] }),
    }),
    {
      name: "mhs-loyalty",
      skipHydration: true,
      partialize: (state) => ({
        earned: state.earned,
        spent: state.spent,
        redeemedIds: state.redeemedIds,
      }),
    },
  ),
);

export const pointsBalance = (state: LoyaltyState) =>
  demoMember.pointsBalance + state.earned - state.spent;
