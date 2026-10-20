import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  Boxes,
  Check,
  Database,
  Radio,
  Store,
  Terminal,
  Webhook,
} from "lucide-react";
import { SectionEyebrow } from "@/components/brand/ornaments";
import { PosSyncButton } from "@/components/integrations/pos-sync-button";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { pos } from "@/lib/pos";
import type { Locale } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const integrations = await getTranslations({ locale, namespace: "integrations" });

  return {
    title: t("integrations"),
    description: integrations("description"),
    robots: { index: false, follow: true },
  };
}

const dateFormatter = (locale: Locale) =>
  new Intl.DateTimeFormat(locale === "da" ? "da-DK" : "en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

const code = `export interface PosAdapter {
  getCatalog(locale: Locale): Promise<Product[]>;
  getInventory(): Promise<InventorySnapshot[]>;
  getMember(memberId?: string): Promise<LoyaltyMember>;
  getPointsHistory(id: string): Promise<PointsTransaction[]>;
  getRewards(): Promise<Reward[]>;
  getSyncState(): Promise<PosSyncState>;
  getWebhookEvents(): Promise<PosWebhookEvent[]>;
  sync(): Promise<PosSyncState>;
}`;

export default async function IntegrationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const t = await getTranslations({ locale, namespace: "integrations" });

  const [sync, events, inventory, catalog] = await Promise.all([
    pos.getSyncState(),
    pos.getWebhookEvents(),
    pos.getInventory(),
    pos.getCatalog(locale),
  ]);

  const productsById = new Map(catalog.map((product) => [product.id, product]));
  const eventLabels = t.raw("eventTypes") as Record<string, string>;
  const fmt = dateFormatter(locale);

  const stats = [
    { label: t("productsSynced"), value: sync.productsSynced, icon: Boxes },
    { label: t("pending"), value: sync.pendingEvents, icon: Radio },
    {
      label: t("registers"),
      value: `${sync.registersOnline}/${sync.registersTotal}`,
      icon: Store,
    },
    { label: t("catalogVersion"), value: sync.catalogVersion, icon: Database },
  ];

  return (
    <div>
      <section className="relative overflow-hidden bg-forest text-cream">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -left-24 top-0 size-96 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute right-0 bottom-0 size-80 rounded-full bg-clay/20 blur-3xl" />
        </div>
        <div className="container-page relative py-14 lg:py-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-gold">
              {t("eyebrow")}
            </span>
            <span className="rounded-full border border-cream/20 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-cream/60">
              {t("demoBadge")}
            </span>
          </div>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream/65">
            {t("description")}
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-cream/10 bg-cream/[0.04] px-4 py-4 backdrop-blur"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-cream/45">
                    {stat.label}
                  </p>
                  <stat.icon className="size-3.5 text-gold/80" />
                </div>
                <p className="mt-2 font-display text-3xl font-semibold text-gold-light">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page grid items-start gap-6 py-12 lg:grid-cols-[1fr_1.15fr] lg:py-16">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/80 bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <SectionEyebrow>{t("status")}</SectionEyebrow>
                <p className="mt-2 inline-flex items-center gap-2 font-display text-2xl font-semibold">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-forest opacity-60" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-forest" />
                  </span>
                  {sync.status === "connected" ? t("connected") : sync.status}
                </p>
              </div>
              <span className="rounded-full bg-sand px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-forest">
                {sync.mode} · {sync.provider}
              </span>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-border/60 pt-4 text-xs">
              <div>
                <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-muted-foreground">
                  {t("store")}
                </dt>
                <dd className="mt-1 font-medium">{sync.storeName}</dd>
              </div>
              <div>
                <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-muted-foreground">
                  {t("mode")}
                </dt>
                <dd className="mt-1 font-medium">{sync.mode}</dd>
              </div>
            </dl>
            <div className="mt-4 border-t border-border/60 pt-4">
              <PosSyncButton lastSyncedAt={sync.lastSyncedAt} />
            </div>
          </div>

          <div className="rounded-2xl border border-border/80 bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="inline-flex items-center gap-2 font-display text-xl font-semibold">
                <Webhook className="size-4 text-gold-deep" />
                {t("webhooks")}
              </h2>
              <span className="text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                {events.length} events
              </span>
            </div>
            <ul className="mt-3 divide-y divide-border/60">
              {events.map((event) => (
                <li key={event.id} className="flex items-start gap-3 py-3">
                  <span
                    className={`mt-1.5 size-1.5 shrink-0 rounded-full ${
                      event.status === "processed" ? "bg-forest" : "bg-gold"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.78rem] font-medium">
                      {eventLabels[event.type] ?? event.type}
                    </p>
                    <p className="truncate text-[0.68rem] text-muted-foreground">
                      {event.payloadSummary}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[0.6rem] text-muted-foreground">
                      {fmt.format(new Date(event.occurredAt))}
                    </p>
                    <p className="text-[0.55rem] uppercase tracking-[0.12em] text-muted-foreground/70">
                      {event.status === "processed" ? t("processed") : t("queued")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border/80 bg-card p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="inline-flex items-center gap-2 font-display text-xl font-semibold">
                <Boxes className="size-4 text-gold-deep" />
                {t("inventory")}
              </h2>
              <span className="text-[0.6rem] text-muted-foreground">{t("inventoryNote")}</span>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[30rem] text-left text-xs">
                <thead>
                  <tr className="border-b border-border/70 text-[0.56rem] uppercase tracking-[0.14em] text-muted-foreground">
                    <th className="pb-2 pr-3 font-semibold">{t("sku")}</th>
                    <th className="pb-2 pr-3 font-semibold">{t("product")}</th>
                    <th className="pb-2 pr-3 text-right font-semibold">{t("onHand")}</th>
                    <th className="pb-2 pr-3 text-right font-semibold">{t("reserved")}</th>
                    <th className="pb-2 text-right font-semibold">{t("location")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {inventory.slice(0, 10).map((row) => {
                    const product = productsById.get(row.productId);
                    const variant = product?.variants.find(
                      (item) => item.id === row.variantId,
                    );
                    return (
                      <tr key={row.sku}>
                        <td className="py-2.5 pr-3 font-mono text-[0.62rem] text-muted-foreground">
                          {row.sku}
                        </td>
                        <td className="py-2.5 pr-3">
                          <span className="font-medium">{product?.name[locale]}</span>
                          <span className="block text-[0.6rem] text-muted-foreground">
                            {variant?.label[locale]}
                          </span>
                        </td>
                        <td className="py-2.5 pr-3 text-right tabular-nums">{row.onHand}</td>
                        <td className="py-2.5 pr-3 text-right tabular-nums">{row.reserved}</td>
                        <td className="py-2.5 text-right">
                          <span className="rounded-full bg-sand/70 px-2 py-0.5 text-[0.55rem] uppercase tracking-[0.1em] text-forest">
                            {row.location === "pos" ? "POS" : "CPH"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/80 bg-forest text-cream">
            <div className="flex items-center justify-between border-b border-cream/10 px-5 py-3">
              <h2 className="inline-flex items-center gap-2 font-display text-lg font-semibold">
                <Terminal className="size-4 text-gold" />
                {t("adapterTitle")}
              </h2>
              <span className="font-mono text-[0.6rem] text-cream/40">src/lib/pos/types.ts</span>
            </div>
            <pre className="overflow-x-auto px-5 py-4 font-mono text-[0.68rem] leading-relaxed text-cream/70">
              <code>{code}</code>
            </pre>
            <div className="border-t border-cream/10 px-5 py-4 text-xs leading-relaxed text-cream/55">
              {t("adapterDescription")}
            </div>
          </div>

          <div className="rounded-2xl border border-border/80 bg-card p-5">
            <h2 className="font-display text-lg font-semibold">{t("endpoints")}</h2>
            <ul className="mt-3 space-y-2 font-mono text-[0.7rem]">
              {[
                { method: "GET", path: "/api/pos/catalog" },
                { method: "GET", path: "/api/pos/member" },
                { method: "POST", path: "/api/pos/sync" },
              ].map((endpoint) => (
                <li key={endpoint.path} className="flex items-center gap-3">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[0.55rem] font-semibold ${
                      endpoint.method === "GET"
                        ? "bg-forest/10 text-forest"
                        : "bg-gold/20 text-gold-deep"
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <span className="text-muted-foreground">{endpoint.path}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-border/60 pt-4 text-xs leading-relaxed text-muted-foreground">
              {t("apiText")}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gold/30 bg-gold/10 px-6 py-5">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium text-forest">
              <Check className="size-4" />
              {t("note")}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("apiTitle")} — {t("mockData")}
            </p>
          </div>
          <Button
            render={<Link href="/shop" />}
            className="rounded-full bg-forest text-cream hover:bg-forest-soft"
          >
            {t("viewStore")}
            <ArrowRight />
          </Button>
        </div>
      </section>
    </div>
  );
}
