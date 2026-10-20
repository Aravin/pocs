"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionEyebrow, TiletField } from "@/components/brand/ornaments";

export function Newsletter() {
  const t = useTranslations("home");
  const [email, setEmail] = useState("");

  return (
    <section className="py-20 lg:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-gold/30 bg-forest px-6 py-12 text-cream sm:px-12 lg:px-16">
          <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
            <TiletField />
          </div>
          <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-gold/10 blur-2xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <SectionEyebrow className="text-gold-light">{t("recipesEyebrow")}</SectionEyebrow>
              <h2 className="mt-4 max-w-md font-display text-3xl font-semibold leading-tight sm:text-4xl">
                {t("newsletterTitle")}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/60">
                {t("newsletterDescription")}
              </p>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                if (!valid) {
                  toast.error(t("newsletterError"));
                  return;
                }
                toast.success(t("newsletterSuccess"));
                setEmail("");
              }}
              className="w-full"
            >
              <div className="flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 p-1.5 pl-4 backdrop-blur">
                <Mail className="size-4 shrink-0 text-gold" />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={t("newsletterPlaceholder")}
                  aria-label={t("newsletterPlaceholder")}
                  className="h-10 border-0 bg-transparent px-1 text-cream placeholder:text-cream/40 focus-visible:ring-0"
                />
                <Button
                  type="submit"
                  className="h-10 shrink-0 rounded-full bg-gold-gradient px-5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-forest hover:brightness-105"
                >
                  {t("newsletterButton")}
                  <ArrowRight />
                </Button>
              </div>
              <p className="mt-3 text-[0.62rem] text-cream/40">{t("newsletterNote")}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
