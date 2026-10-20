import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AccountDashboard } from "@/components/account/account-dashboard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const account = await getTranslations({ locale, namespace: "account" });
  const tDemo = await getTranslations({ locale, namespace: "common" });

  return {
    title: t("account"),
    description: `${account("eyebrow")} — ${tDemo("demoMode")}`,
    robots: { index: false, follow: true },
  };
}

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AccountDashboard />;
}
