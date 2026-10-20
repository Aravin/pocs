"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  onChange,
  max = 99,
  min = 1,
  compact = false,
}: {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-background",
        compact ? "h-8" : "h-11",
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="rounded-full"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus />
      </Button>
      <span
        className={cn(
          "min-w-8 text-center tabular-nums font-medium",
          compact ? "text-xs" : "text-sm",
        )}
        aria-live="polite"
      >
        {value}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="rounded-full"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Plus />
      </Button>
    </div>
  );
}
