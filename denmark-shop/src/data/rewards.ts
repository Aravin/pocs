import type { Reward } from "@/lib/types";

export const rewards: Reward[] = [
  {
    id: "reward-25",
    title: { da: "25 kr. rabat", en: "25 DKK off" },
    description: {
      da: "Brug på din næste ordre — ingen minimumskøb.",
      en: "Use on your next order — no minimum spend.",
    },
    pointsCost: 250,
    type: "voucher",
    valueOre: 2500,
  },
  {
    id: "reward-shipping",
    title: { da: "Gratis levering", en: "Free delivery" },
    description: {
      da: "Fri hjemmelevering i hele Danmark på én ordre.",
      en: "Free home delivery anywhere in Denmark on one order.",
    },
    pointsCost: 300,
    type: "shipping",
    valueOre: 4900,
    highlight: true,
  },
  {
    id: "reward-75",
    title: { da: "75 kr. rabat", en: "75 DKK off" },
    description: {
      da: "Til krydderier, kaffe eller honning — du vælger.",
      en: "For spices, coffee or honey — your choice.",
    },
    pointsCost: 650,
    type: "voucher",
    valueOre: 7500,
  },
  {
    id: "reward-cini",
    title: { da: "Cini kop", en: "Cini cup" },
    description: {
      da: "En enkelt håndlavet cini-kop fra Addis Ababa.",
      en: "A single handmade cini cup from Addis Ababa.",
    },
    pointsCost: 800,
    type: "product",
    valueOre: 6500,
  },
  {
    id: "reward-150",
    title: { da: "150 kr. rabat", en: "150 DKK off" },
    description: {
      da: "Vores mest populære indløsning til den store indkøbsdag.",
      en: "Our most popular redemption for the big shop.",
    },
    pointsCost: 1200,
    type: "voucher",
    valueOre: 15000,
  },
  {
    id: "reward-box",
    title: { da: "Kaffe-ritual gaveæske", en: "Coffee ritual gift box" },
    description: {
      da: "Yirgacheffe 250 g, cini-kopper og etan-røgelse i en gaveæske.",
      en: "Yirgacheffe 250 g, cini cups and etan incense in a gift box.",
    },
    pointsCost: 1800,
    type: "product",
    valueOre: 29900,
  },
];

export const rewardById = (id: string) => rewards.find((reward) => reward.id === id);
