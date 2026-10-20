import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RewardsView } from "@/components/rewards/rewards-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const rewards = await getTranslations({ locale, namespace: "rewards" });

  return {
    title: t("rewards"),
    description: rewards("description"),
    alternates: {
      canonical: locale === "da" ? "/rewards" : "/en/rewards",
      languages: { "da-DK": "/rewards", en: "/en/rewards" },
    },
  };
}

export default async function RewardsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RewardsView />;
}
