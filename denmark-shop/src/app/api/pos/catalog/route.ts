import { pos } from "@/lib/pos";
import type { Locale } from "@/lib/types";

export async function GET(request: Request) {
  const locale: Locale =
    new URL(request.url).searchParams.get("locale") === "en" ? "en" : "da";
  const items = await pos.getCatalog(locale);

  return Response.json(
    {
      provider: pos.provider,
      mode: pos.mode,
      locale,
      count: items.length,
      items,
    },
    { headers: { "cache-control": "no-store" } },
  );
}
