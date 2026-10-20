import type {
  InventorySnapshot,
  Locale,
  LoyaltyMember,
  PointsTransaction,
  PosSyncState,
  PosWebhookEvent,
  Product,
  Reward,
} from "@/lib/types";

export interface PosAdapter {
  readonly provider: string;
  readonly mode: "mock" | "live";
  getCatalog(locale: Locale): Promise<Product[]>;
  getInventory(): Promise<InventorySnapshot[]>;
  getMember(memberId?: string): Promise<LoyaltyMember>;
  getPointsHistory(memberId: string): Promise<PointsTransaction[]>;
  getRewards(): Promise<Reward[]>;
  getSyncState(): Promise<PosSyncState>;
  getWebhookEvents(): Promise<PosWebhookEvent[]>;
  sync(): Promise<PosSyncState>;
}

export interface PosConfig {
  storeId: string;
  apiKey?: string;
  environment: "sandbox" | "production";
}
