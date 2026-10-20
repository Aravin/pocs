import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Flame, Leaf, Star } from "lucide-react";
import { SectionEyebrow } from "@/components/brand/ornaments";
import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchase } from "@/components/product/product-purchase";
import { Link } from "@/i18n/navigation";
import { categoryById } from "@/data/categories";
import { getProduct, getRelatedProducts } from "@/lib/catalog";
import { products } from "@/data/products";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/types";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    products.map((product) => ({ locale, slug: product.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const typedLocale = locale as Locale;
  const path = locale === "da" ? `/product/${slug}` : `/en/product/${slug}`;

  return {
    title: product.name[typedLocale],
    description: product.description[typedLocale].slice(0, 160),
    alternates: {
      canonical: path,
      languages: {
        "da-DK": `/product/${slug}`,
        en: `/en/product/${slug}`,
      },
    },
    openGraph: {
      title: product.name[typedLocale],
      description: product.subtitle[typedLocale],
      images: [{ url: product.images[0] ?? "/images/hero-spices.jpg" }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const t = await getTranslations({ locale, namespace: "product" });
  const tc = await getTranslations({ locale, namespace: "common" });

  const product = getProduct(slug);
  if (!product) notFound();

  const category = categoryById(product.categoryId);
  const accent = category?.accent ?? "#C9A45C";
  const related = getRelatedProducts(product);
  const spiceLabel = product.spiceLevel
    ? ["mild", "medium", "hot", "veryHot"][product.spiceLevel]
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name[locale],
    description: product.description[locale],
    image: product.images.map((image) => `https://www.miraclehabesha.dk${image}`),
    sku: product.variants[0]?.sku,
    brand: { "@type": "Brand", name: "Miracle Habesha Shop" },
    category: category?.name[locale],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: product.variants.map((variant) => ({
      "@type": "Offer",
      sku: variant.sku,
      price: (variant.priceOre / 100).toFixed(2),
      priceCurrency: "DKK",
      availability:
        variant.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `https://www.miraclehabesha.dk/product/${product.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-page py-6 lg:py-10">
        <nav className="mb-7 flex flex-wrap items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
          <Link href="/" className="hover:text-forest">
            {tc("home")}
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-forest">
            {tc("shop")}
          </Link>
          {category ? (
            <>
              <span>/</span>
              <Link href={`/shop/${category.slug}`} className="hover:text-forest">
                {category.name[locale]}
              </Link>
            </>
          ) : null}
          <span>/</span>
          <span className="text-forest">{product.name[locale]}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <ProductGallery
            name={product.name[locale]}
            weight={product.variants[0].label[locale]}
            kind={product.packageKind}
            accent={accent}
            images={product.images}
          />

          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionEyebrow>{category?.name[locale]}</SectionEyebrow>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.02] sm:text-5xl">
              {product.name[locale]}
            </h1>
            <p className="mt-2 text-base text-muted-foreground">{product.subtitle[locale]}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={cn(
                        "size-3.5",
                        index < Math.round(product.rating)
                          ? "fill-gold text-gold"
                          : "text-border",
                      )}
                    />
                  ))}
                </span>
                <span className="font-medium">{product.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">
                  ({tc("reviews", { count: product.reviewCount })})
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Leaf className="size-3.5 text-forest" />
                {product.origin[locale]}
              </span>
            </div>

            {product.spiceLevel !== undefined && spiceLabel ? (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-clay/25 bg-clay/5 px-3 py-1.5">
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {t("spice")}
                </span>
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Flame
                      key={index}
                      className={cn(
                        "size-3.5",
                        index < product.spiceLevel!
                          ? "fill-clay text-clay"
                          : "text-border",
                      )}
                    />
                  ))}
                </span>
                <span className="text-[0.68rem] font-semibold text-clay">
                  {t(spiceLabel as "mild")}
                </span>
              </div>
            ) : null}

            <ProductPurchase product={product} locale={locale} />
          </div>
        </div>
      </div>

      <section className="border-y border-border/60 bg-sand/25">
        <div className="container-page grid gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <SectionEyebrow>{t("description")}</SectionEyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight">
              {product.subtitle[locale]}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/75">
              {product.description[locale]}
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-5 border-t border-border/70 pt-6 text-sm">
              <div>
                <dt className="text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {t("originLabel")}
                </dt>
                <dd className="mt-1 font-medium">{product.origin[locale]}</dd>
              </div>
              <div>
                <dt className="text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {t("weightLabel")}
                </dt>
                <dd className="mt-1 font-medium">
                  {product.variants.map((variant) => variant.label[locale]).join(" · ")}
                </dd>
              </div>
              <div>
                <dt className="text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {tc("allergens")}
                </dt>
                <dd className="mt-1 font-medium">{product.allergens[locale]}</dd>
              </div>
              <div>
                <dt className="text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {tc("sku")}
                </dt>
                <dd className="mt-1 font-medium">{product.variants[0].sku}</dd>
              </div>
            </dl>
          </div>

          <div className="space-y-3">
            {[
              { title: t("ingredients"), body: product.ingredientList[locale] },
              { title: t("usage"), body: product.usage[locale] },
              { title: t("shipping"), body: t("shippingText") },
            ].map((item) => (
              <details
                key={item.title}
                className="group rounded-xl border border-border/80 bg-card px-5 py-4 open:bg-cream"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-semibold">
                  {item.title}
                  <span className="grid size-6 place-items-center rounded-full border border-border text-sm transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </details>
            ))}
            <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-xl border border-border/70">
              <Image
                src={product.images[1] ?? product.images[0] ?? "/images/spice-market.jpg"}
                alt={t("storyAlt")}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 to-transparent" />
              <p className="absolute bottom-4 left-4 max-w-xs font-display text-lg text-cream">
                {product.origin[locale]} · {category?.tagline[locale]}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16 lg:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <SectionEyebrow>{category?.name[locale]}</SectionEyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold">{t("related")}</h2>
          </div>
          <Link
            href={category ? `/shop/${category.slug}` : "/shop"}
            className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-forest underline-offset-4 hover:underline"
          >
            {tc("viewAll")}
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}
