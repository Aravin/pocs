export type Locale = "da" | "en";

export type Localized = Record<Locale, string>;

export type CurrencyCode = "DKK" | "EUR" | "SEK";

export type CategoryId =
  | "spices"
  | "grains"
  | "coffee"
  | "honey"
  | "sauces"
  | "pantry";

export type PackageKind = "pouch" | "jar" | "coffee-bag" | "sack" | "bottle" | "tin";

export interface Category {
  id: CategoryId;
  slug: string;
  name: Localized;
  tagline: Localized;
  description: Localized;
  accent: string;
  softAccent: string;
  icon: "spice" | "grain" | "coffee" | "honey" | "sauce" | "pantry";
}

export interface ProductVariant {
  id: string;
  sku: string;
  label: Localized;
  weightGrams: number;
  priceOre: number;
  compareAtOre?: number;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: Localized;
  subtitle: Localized;
  description: Localized;
  origin: Localized;
  categoryId: CategoryId;
  packageKind: PackageKind;
  images: string[];
  ingredientList: Localized;
  usage: Localized;
  allergens: Localized;
  spiceLevel?: 0 | 1 | 2 | 3;
  featured?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
}

export interface InventorySnapshot {
  sku: string;
  productId: string;
  variantId: string;
  onHand: number;
  reserved: number;
  location: "copenhagen" | "pos";
  updatedAt: string;
}

export type LoyaltyTier = "seed" | "harvest" | "gold";

export interface LoyaltyMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  memberSince: string;
  pointsBalance: number;
  lifetimePoints: number;
  tier: LoyaltyTier;
  nextTierAt: number;
}

export interface PointsTransaction {
  id: string;
  date: string;
  description: Localized;
  points: number;
  channel: "in-store" | "online" | "reward";
}

export type RewardType = "voucher" | "shipping" | "product";

export interface Reward {
  id: string;
  title: Localized;
  description: Localized;
  pointsCost: number;
  type: RewardType;
  valueOre?: number;
  highlight?: boolean;
}

export interface OrderLine {
  productId: string;
  variantId: string;
  slug: string;
  name: string;
  variantLabel: string;
  unitPriceOre: number;
  quantity: number;
  imageKind: PackageKind;
  categoryId: CategoryId;
  accent: string;
}

export type DeliveryMethod = "home" | "pickup";

export interface Order {
  id: string;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  deliveryMethod: DeliveryMethod;
  paymentMethod: "mobilepay" | "card";
  lines: OrderLine[];
  subtotalOre: number;
  shippingOre: number;
  discountOre: number;
  totalOre: number;
  currency: CurrencyCode;
  pointsEarned: number;
  pointsRedeemed: number;
}

export interface PosSyncState {
  provider: string;
  storeName: string;
  status: "connected" | "degraded" | "offline";
  mode: "mock" | "live";
  lastSyncedAt: string;
  catalogVersion: string;
  pendingEvents: number;
  productsSynced: number;
  registersOnline: number;
  registersTotal: number;
}

export interface PosWebhookEvent {
  id: string;
  type: "inventory.updated" | "product.updated" | "loyalty.points.earned" | "order.created";
  occurredAt: string;
  status: "processed" | "queued";
  payloadSummary: string;
}
