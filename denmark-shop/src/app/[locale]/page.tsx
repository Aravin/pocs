import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { CategoryGrid } from "@/components/home/category-grid";
import { Bestsellers } from "@/components/home/bestsellers";
import { LoyaltyBand } from "@/components/home/loyalty-band";
import { StorySection } from "@/components/home/story-section";
import { Recipes } from "@/components/home/recipes";
import { Newsletter } from "@/components/home/newsletter";
import { demoMember } from "@/data/member";
import { products } from "@/data/products";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Miracle Habesha Shop",
    description:
      "Eritrean & Ethiopian cultural food, spices, coffee and everyday essentials in Copenhagen.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jægersborggade 31",
      postalCode: "2200",
      addressLocality: "København N",
      addressCountry: "DK",
    },
    telephone: "+45 42 18 73 90",
    email: "hej@miraclehabesha.dk",
    priceRange: "40–700 DKK",
    numberOfItems: products.length,
    member: {
      "@type": "Organization",
      name: "Lovely Loyalty",
      memberId: demoMember.id,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <CategoryGrid />
      <Bestsellers />
      <LoyaltyBand />
      <StorySection />
      <Recipes />
      <Newsletter />
    </>
  );
}
