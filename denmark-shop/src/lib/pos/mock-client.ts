import { products } from "@/data/products";
import { demoMember, pointsHistory } from "@/data/member";
import { rewards } from "@/data/rewards";
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
import type { PosAdapter, PosConfig } from "./types";

const syncBase: PosSyncState = {
  provider: "Lovely Loyalty POS",
  storeName: "Miracle Habesha Shop · Nørrebro",
  status: "connected",
  mode: "mock",
  lastSyncedAt: "2026-10-20T09:58:00+02:00",
  catalogVersion: "2026.10.20-3",
  pendingEvents: 2,
  productsSynced: products.length,
  registersOnline: 2,
  registersTotal: 2,
};

const webhookEvents: PosWebhookEvent[] = [
  {
    id: "evt_01J9F2K7",
    type: "inventory.updated",
    occurredAt: "2026-10-20T09:58:12+02:00",
    status: "processed",
    payloadSummary: "Honeycomb 350 g · on hand 3 → 2",
  },
  {
    id: "evt_01J9F2HV",
    type: "loyalty.points.earned",
    occurredAt: "2026-10-20T09:57:44+02:00",
    status: "processed",
    payloadSummary: "Member 0042 · +14 points · in-store",
  },
  {
    id: "evt_01J9F2G1",
    type: "product.updated",
    occurredAt: "2026-10-20T09:54:03+02:00",
    status: "processed",
    payloadSummary: "Harrar 250 g · stock set to 0",
  },
  {
    id: "evt_01J9F2BR",
    type: "order.created",
    occurredAt: "2026-10-20T09:51:20+02:00",
    status: "processed",
    payloadSummary: "POS order #8841 · 3 lines · 245,00 DKK",
  },
  {
    id: "evt_01J9F29M",
    type: "inventory.updated",
    occurredAt: "2026-10-20T09:47:11+02:00",
    status: "queued",
    payloadSummary: "Jebena set · reserved 1",
  },
  {
    id: "evt_01J9F1ZZ",
    type: "loyalty.points.earned",
    occurredAt: "2026-10-20T09:41:55+02:00",
    status: "queued",
    payloadSummary: "Member 0118 · +32 points · in-store",
  },
];

export class MockPosClient implements PosAdapter {
  readonly provider = "Lovely Loyalty POS";
  readonly mode = "mock" as const;

  constructor(private readonly config: PosConfig) {}

  async getCatalog(_locale: Locale): Promise<Product[]> {
    void _locale;
    return products;
  }

  async getInventory(): Promise<InventorySnapshot[]> {
    return products.flatMap((product) =>
      product.variants.map((variant, index) => ({
        sku: variant.sku,
        productId: product.id,
        variantId: variant.id,
        onHand: variant.stock,
        reserved: index === 0 && variant.stock > 3 ? 1 : 0,
        location: index % 4 === 0 ? "pos" : "copenhagen",
        updatedAt: syncBase.lastSyncedAt,
      })),
    );
  }

  async getMember(): Promise<LoyaltyMember> {
    return demoMember;
  }

  async getPointsHistory(): Promise<PointsTransaction[]> {
    return pointsHistory;
  }

  async getRewards(): Promise<Reward[]> {
    return rewards;
  }

  async getSyncState(): Promise<PosSyncState> {
    return { ...syncBase, storeName: this.config.storeId || syncBase.storeName };
  }

  async getWebhookEvents(): Promise<PosWebhookEvent[]> {
    return webhookEvents;
  }

  async sync(): Promise<PosSyncState> {
    return {
      ...syncBase,
      lastSyncedAt: new Date().toISOString(),
      pendingEvents: 0,
    };
  }
}
