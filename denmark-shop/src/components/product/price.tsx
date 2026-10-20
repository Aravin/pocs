"use client";

import { useLocale } from "next-intl";
import { formatPrice } from "@/lib/currency";
import type { Locale } from "@/lib/types";
import { cn } from "@/lib/utils";
import { usePreferences } from "@/store/preferences";

export function Price({
  amountOre,
  compareAtOre,
  className,
  compact = false,
}: {
  amountOre: number;
  compareAtOre?: number;
  className?: string;
  compact?: boolean;
}) {
  const locale = useLocale() as Locale;
  const currency = usePreferences((state) => state.currency);

  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span className={cn("font-medium tabular-nums", compact ? "text-sm" : "text-base")}>
        {formatPrice(amountOre, currency, locale)}
      </span>
      {compareAtOre && compareAtOre > amountOre ? (
        <span className="text-xs text-muted-foreground line-through tabular-nums">
          {formatPrice(compareAtOre, currency, locale)}
        </span>
      ) : null}
    </span>
  );
}
