"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function StockBadge({
  stock,
  className,
  showInStock = false,
}: {
  stock: number;
  className?: string;
  showInStock?: boolean;
}) {
  const t = useTranslations("common");

  if (stock <= 0) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground",
          className,
        )}
      >
        <span className="size-1.5 rounded-full bg-muted-foreground/50" />
        {t("outOfStock")}
      </span>
    );
  }

  if (stock <= 5) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full bg-clay/10 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-clay",
          className,
        )}
      >
        <span className="size-1.5 rounded-full bg-clay" />
        {t("lowStock", { count: stock })}
      </span>
    );
  }

  if (!showInStock) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-forest/10 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-forest",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-forest" />
      {t("inStock")}
    </span>
  );
}
