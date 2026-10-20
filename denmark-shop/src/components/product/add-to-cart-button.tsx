"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { QuantityStepper } from "./quantity-stepper";

export function AddToCartButton({
  variantId,
  name,
  stock,
  className,
  withQuantity = false,
  size = "lg",
}: {
  variantId: string;
  name: string;
  stock: number;
  className?: string;
  withQuantity?: boolean;
  size?: "default" | "lg" | "sm";
}) {
  const t = useTranslations("common");
  const addItem = useCart((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const disabled = stock <= 0;

  const handleAdd = () => {
    addItem(variantId, quantity);
    toast.success(t("added", { name }));
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {withQuantity ? (
        <QuantityStepper value={quantity} onChange={setQuantity} max={Math.max(1, stock)} />
      ) : null}
      <Button
        type="button"
        size={size}
        disabled={disabled}
        onClick={handleAdd}
        className="min-w-44 flex-1 rounded-full bg-forest px-6 tracking-wide text-cream hover:bg-forest-soft"
      >
        {justAdded ? <Check /> : <ShoppingBag />}
        {disabled ? t("outOfStock") : justAdded ? t("added", { name }).split(" ")[0] : t("addToCart")}
      </Button>
    </div>
  );
}

export function QuickAddButton({
  variantId,
  name,
  stock,
}: {
  variantId: string;
  name: string;
  stock: number;
}) {
  const t = useTranslations("common");
  const addItem = useCart((state) => state.addItem);

  if (stock <= 0) return null;

  return (
    <button
      type="button"
      aria-label={`${t("quickAdd")} — ${name}`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        addItem(variantId, 1);
        toast.success(t("added", { name }));
      }}
      className="inline-flex size-10 items-center justify-center rounded-full bg-forest text-cream shadow-lg ring-1 ring-gold/40 transition hover:scale-105 hover:bg-forest-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <Plus className="size-4" />
    </button>
  );
}
