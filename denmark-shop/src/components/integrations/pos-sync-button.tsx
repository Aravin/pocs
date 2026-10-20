"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/types";

const formatter = (locale: Locale) =>
  new Intl.DateTimeFormat(locale === "da" ? "da-DK" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

export function PosSyncButton({ lastSyncedAt }: { lastSyncedAt: string }) {
  const t = useTranslations("integrations");
  const locale = useLocale() as Locale;
  const [syncedAt, setSyncedAt] = useState(lastSyncedAt);
  const [loading, setLoading] = useState(false);

  const handleSync = () => {
    if (loading) return;
    setLoading(true);
    window.setTimeout(() => {
      setSyncedAt(new Date().toISOString());
      setLoading(false);
      toast.success(t("synced"));
    }, 900);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-muted-foreground">
        {t("lastSync")} · {formatter(locale).format(new Date(syncedAt))}
      </p>
      <Button
        type="button"
        onClick={handleSync}
        disabled={loading}
        size="sm"
        className="rounded-full bg-forest text-cream hover:bg-forest-soft"
      >
        <RefreshCw className={loading ? "size-3.5 animate-spin" : "size-3.5"} />
        {loading ? t("syncing") : t("syncNow")}
      </Button>
    </div>
  );
}
