import { MockPosClient } from "./mock-client";
import type { PosAdapter } from "./types";

export type { PosAdapter, PosConfig } from "./types";
export { MockPosClient } from "./mock-client";

export const pos: PosAdapter = new MockPosClient({
  storeId: "Miracle Habesha Shop · Nørrebro",
  environment: "sandbox",
});
