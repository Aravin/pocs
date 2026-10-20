import type {
  CurrencyCode,
  Locale,
  LoyaltyMember,
  Order,
  PointsTransaction,
} from "@/lib/types";
import { productBySlug } from "./products";

export const demoMember: LoyaltyMember = {
  id: "member-0042",
  firstName: "Fatima",
  lastName: "Hassan",
  email: "fatima.hassan@example.dk",
  phone: "+45 42 18 73 90",
  memberSince: "2023-04-12",
  pointsBalance: 1240,
  lifetimePoints: 3120,
  tier: "harvest",
  nextTierAt: 1500,
};

export const tierThresholds = [
  { id: "seed", min: 0, next: 500 },
  { id: "harvest", min: 500, next: 1500 },
  { id: "gold", min: 1500, next: null },
] as const;

export const pointsHistory: PointsTransaction[] = [
  {
    id: "pt-10482",
    date: "2026-09-28T14:22:00+02:00",
    description: { da: "Ordre MHS-10482 · netbutik", en: "Order MHS-10482 · online" },
    points: 30,
    channel: "online",
  },
  {
    id: "pt-10399",
    date: "2026-09-17T11:05:00+02:00",
    description: { da: "Køb i butik · Nørrebro", en: "In-store purchase · Nørrebro" },
    points: 85,
    channel: "in-store",
  },
  {
    id: "pt-10311",
    date: "2026-08-14T16:48:00+02:00",
    description: { da: "Ordre MHS-10311 · netbutik", en: "Order MHS-10311 · online" },
    points: 96,
    channel: "online",
  },
  {
    id: "pt-10280",
    date: "2026-08-02T09:31:00+02:00",
    description: { da: "Indløst: 50 kr. rabat", en: "Redeemed: 50 DKK voucher" },
    points: -450,
    channel: "reward",
  },
  {
    id: "pt-10222",
    date: "2026-07-19T13:14:00+02:00",
    description: { da: "Køb i butik · Nørrebro", en: "In-store purchase · Nørrebro" },
    points: 62,
    channel: "in-store",
  },
  {
    id: "pt-10160",
    date: "2026-06-21T10:02:00+02:00",
    description: { da: "Køb i butik · Nørrebro", en: "In-store purchase · Nørrebro" },
    points: 140,
    channel: "in-store",
  },
  {
    id: "pt-10109",
    date: "2026-06-02T15:37:00+02:00",
    description: { da: "Ordre MHS-10109 · netbutik", en: "Order MHS-10109 · online" },
    points: 21,
    channel: "online",
  },
  {
    id: "pt-10087",
    date: "2026-05-11T12:20:00+02:00",
    description: { da: "Køb i butik · Nørrebro", en: "In-store purchase · Nørrebro" },
    points: 38,
    channel: "in-store",
  },
];

const buildOrder = (
  locale: Locale,
  config: {
    id: string;
    createdAt: string;
    deliveryMethod: "home" | "pickup";
    paymentMethod: "mobilepay" | "card";
    discountOre?: number;
    lines: { slug: string; variantId: string; quantity: number }[];
  },
): Order => {
  const lines = config.lines.flatMap(({ slug, variantId, quantity }) => {
    const product = productBySlug(slug);
    const variant = product?.variants.find((item) => item.id === variantId);
    if (!product || !variant) return [];
    return [
      {
        productId: product.id,
        variantId: variant.id,
        slug: product.slug,
        name: product.name[locale],
        variantLabel: variant.label[locale],
        unitPriceOre: variant.priceOre,
        quantity,
        imageKind: product.packageKind,
        categoryId: product.categoryId,
        accent: product.images[0] ?? "",
      },
    ];
  });

  const subtotalOre = lines.reduce(
    (sum, line) => sum + line.unitPriceOre * line.quantity,
    0,
  );
  const shippingOre =
    config.deliveryMethod === "pickup" || subtotalOre >= 49900 ? 0 : 4900;
  const discountOre = config.discountOre ?? 0;
  const totalOre = subtotalOre + shippingOre - discountOre;

  return {
    id: config.id,
    createdAt: config.createdAt,
    email: demoMember.email,
    firstName: demoMember.firstName,
    lastName: demoMember.lastName,
    address: "Jægersborggade 31",
    postalCode: "2200",
    city: "København N",
    phone: demoMember.phone,
    deliveryMethod: config.deliveryMethod,
    paymentMethod: config.paymentMethod,
    lines,
    subtotalOre,
    shippingOre,
    discountOre,
    totalOre,
    currency: "DKK" as CurrencyCode,
    pointsEarned: Math.floor(totalOre / 1000),
    pointsRedeemed: Math.floor(discountOre / 1000),
  };
};

export const getMemberOrders = (locale: Locale): Order[] => [
  buildOrder(locale, {
    id: "MHS-10482",
    createdAt: "2026-09-28T14:22:00+02:00",
    deliveryMethod: "pickup",
    paymentMethod: "mobilepay",
    lines: [
      { slug: "berbere", variantId: "berbere-250", quantity: 1 },
      { slug: "white-teff-flour", variantId: "white-teff-1kg", quantity: 1 },
      { slug: "wildflower-honey", variantId: "wildflower-450", quantity: 1 },
    ],
  }),
  buildOrder(locale, {
    id: "MHS-10311",
    createdAt: "2026-08-14T16:48:00+02:00",
    deliveryMethod: "home",
    paymentMethod: "card",
    lines: [
      { slug: "yirgacheffe-coffee", variantId: "yirgacheffe-250", quantity: 2 },
      { slug: "jebena-coffee-set", variantId: "jebena-set", quantity: 1 },
    ],
  }),
  buildOrder(locale, {
    id: "MHS-10109",
    createdAt: "2026-06-02T15:37:00+02:00",
    deliveryMethod: "home",
    paymentMethod: "mobilepay",
    discountOre: 2500,
    lines: [
      { slug: "shiro-powder", variantId: "shiro-500", quantity: 2 },
      { slug: "niter-kibbeh", variantId: "niter-250", quantity: 1 },
      { slug: "red-lentils", variantId: "red-lentils-1kg", quantity: 1 },
    ],
  }),
];
