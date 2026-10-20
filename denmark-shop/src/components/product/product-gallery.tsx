"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ProductArt } from "@/components/brand/product-art";
import type { PackageKind } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductGallery({
  name,
  weight,
  kind,
  accent,
  images,
}: {
  name: string;
  weight: string;
  kind: PackageKind;
  accent: string;
  images: string[];
}) {
  const t = useTranslations("product");
  const slides = [{ type: "art" as const }, ...images.map((src) => ({ type: "photo" as const, src }))];
  const [active, setActive] = useState(0);

  return (
    <div className="lg:sticky lg:top-24">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-border/80 bg-card">
        {slides[active].type === "art" ? (
          <ProductArt name={name} weight={weight} kind={kind} accent={accent} />
        ) : (
          <Image
            src={(slides[active] as { src: string }).src}
            alt={t("galleryAlt", { name })}
            fill
            priority={active === 1}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        )}
        <span className="absolute left-4 top-4 rounded-full border border-border/70 bg-cream/85 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-forest backdrop-blur">
          Miracle Habesha · Copenhagen
        </span>
      </div>

      <div className="mt-3 flex gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.type === "photo" ? slide.src : "art"}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`${name} ${index + 1}`}
            aria-pressed={active === index}
            className={cn(
              "relative h-20 w-16 overflow-hidden rounded-lg border bg-card transition sm:h-24 sm:w-20",
              active === index
                ? "border-gold ring-2 ring-gold/30"
                : "border-border/70 opacity-75 hover:opacity-100",
            )}
          >
            {slide.type === "art" ? (
              <ProductArt name={name} weight={weight} kind={kind} accent={accent} compact />
            ) : (
              <Image src={slide.src} alt="" fill sizes="80px" className="object-cover" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
