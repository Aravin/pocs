"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, Search, ShoppingBag, Sparkles, Truck, User } from "lucide-react";
import { BrandLockup } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useCart, selectCartCount } from "@/store/cart";
import { CurrencySwitcher, LanguageSwitcher } from "./preferences-switcher";
import { MobileNav } from "./mobile-nav";
import { SearchDialog } from "./search-dialog";

const mainLinks = [
  { href: "/shop", key: "shop" },
  { href: "/shop/spices", key: "spices" },
  { href: "/shop/coffee", key: "coffee" },
  { href: "/shop/honey", key: "honey" },
  { href: "/account", key: "loyalty" },
  { href: "/about", key: "about" },
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const ta = useTranslations("announcement");
  const pathname = usePathname();
  const count = useCart(selectCartCount);
  const openCart = useCart((state) => state.open);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="relative z-50 bg-forest-deep text-cream/80">
        <div className="container-page flex h-9 items-center justify-between gap-4 text-[0.63rem] font-medium uppercase tracking-[0.16em]">
          <span className="hidden items-center gap-2 sm:flex">
            <Truck className="size-3 text-gold" />
            {ta("delivery")}
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="size-3 text-gold" />
            {ta("loyalty")}
          </span>
          <span className="hidden items-center gap-2 md:flex">
            <span className="size-1.5 rounded-full bg-gold" />
            {ta("pickup")}
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border/70 bg-cream/92 backdrop-blur-md">
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-4 lg:h-20">
          <div className="flex items-center gap-2 lg:gap-0">
            <Button
              variant="ghost"
              size="icon"
              aria-label={t("openMenu")}
              onClick={() => setMenuOpen(true)}
              className="lg:hidden"
            >
              <Menu />
            </Button>
            <Link href="/" className="shrink-0" aria-label="Miracle Habesha Shop">
              <BrandLockup className="scale-[0.92] sm:scale-100" />
            </Link>
          </div>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {mainLinks.map((link) => {
              const active =
                link.href === "/shop"
                  ? pathname === "/shop"
                  : pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-forest",
                    active && "text-forest",
                  )}
                >
                  {t(link.key)}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-px scale-x-0 bg-gold transition-transform duration-300",
                      active && "scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label={t("search")}
              onClick={() => setSearchOpen(true)}
            >
              <Search />
            </Button>
            <div className="hidden md:block">
              <CurrencySwitcher />
            </div>
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label={t("account")}
              render={<Link href="/account" />}
            >
              <User />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`${t("openCart")} (${count})`}
              onClick={openCart}
              className="relative"
            >
              <ShoppingBag />
              {count > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 grid min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.58rem] font-bold leading-4 text-forest">
                  {count}
                </span>
              ) : null}
            </Button>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <MobileNav open={menuOpen} onOpenChange={setMenuOpen} />
    </>
  );
}
