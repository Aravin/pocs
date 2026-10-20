import { pos } from "@/lib/pos";

export async function GET(request: Request) {
  const memberId = new URL(request.url).searchParams.get("memberId") ?? undefined;
  const [member, points] = await Promise.all([
    pos.getMember(memberId),
    pos.getPointsHistory(memberId ?? "member-0042"),
  ]);

  return Response.json(
    { provider: pos.provider, mode: pos.mode, member, points },
    { headers: { "cache-control": "no-store" } },
  );
}
