import { pos } from "@/lib/pos";

export const dynamic = "force-dynamic";

export async function GET() {
  const state = await pos.getSyncState();
  return Response.json(
    { provider: pos.provider, mode: pos.mode, state },
    { headers: { "cache-control": "no-store" } },
  );
}

export async function POST() {
  const state = await pos.sync();
  return Response.json(
    { provider: pos.provider, mode: pos.mode, state },
    { headers: { "cache-control": "no-store" } },
  );
}
