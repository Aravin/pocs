import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowUpRight, Mail, Phone } from "lucide-react";
import { SectionEyebrow } from "@/components/brand/ornaments";
import { Link } from "@/i18n/navigation";
import { infoBySlug, infoPages } from "@/data/info";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/types";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    infoPages.map((page) => ({ locale, slug: page.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = infoBySlug(slug);
  if (!page) return {};
  const typedLocale = locale as Locale;
  const path = locale === "da" ? `/info/${slug}` : `/en/info/${slug}`;

  return {
    title: page.title[typedLocale],
    description: page.intro[typedLocale],
    alternates: {
      canonical: path,
      languages: { "da-DK": `/info/${slug}`, en: `/en/info/${slug}` },
    },
  };
}

export default async function InfoPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const page = infoBySlug(slug);
  if (!page) notFound();

  const t = await getTranslations({ locale, namespace: "info" });

  const faqJsonLd = page.faqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question[locale],
          acceptedAnswer: { "@type": "Answer", text: faq.answer[locale] },
        })),
      }
    : null;

  return (
    <>
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}

      <section className="border-b border-border/60 bg-sand/35">
        <div className="container-page py-12 lg:py-14">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground transition hover:text-forest"
          >
            <ArrowLeft className="size-3.5" />
            {t("backToShop")}
          </Link>
          <SectionEyebrow className="mt-6">{t("eyebrow")}</SectionEyebrow>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            {page.title[locale]}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {page.intro[locale]}
          </p>
          <p className="mt-3 text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground/70">
            {t("lastUpdated")}
          </p>
        </div>
      </section>

      <section className="container-page grid items-start gap-10 py-12 lg:grid-cols-[15rem_1fr] lg:py-16">
        <aside className="lg:sticky lg:top-24">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {t("back")}
          </p>
          <ul className="mt-3 space-y-1">
            {infoPages.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/info/${item.slug}`}
                  className={cn(
                    "flex items-center justify-between rounded-md px-2.5 py-2 text-sm transition hover:bg-sand/70",
                    item.slug === page.slug
                      ? "bg-sand/80 font-semibold text-forest"
                      : "text-foreground/75",
                  )}
                >
                  {item.title[locale]}
                  <ArrowUpRight className="size-3 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl border border-gold/30 bg-gold/10 p-4">
            <p className="font-display text-lg font-semibold text-forest">
              {t("contactTitle")}
            </p>
            <p className="mt-1 text-[0.72rem] leading-relaxed text-muted-foreground">
              {t("contactText")}
            </p>
            <a
              href="mailto:hej@miraclehabesha.dk"
              className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-forest hover:underline"
            >
              <Mail className="size-3.5" />
              hej@miraclehabesha.dk
            </a>
            <a
              href="tel:+4542187390"
              className="mt-1.5 flex items-center gap-2 text-xs font-medium text-forest hover:underline"
            >
              <Phone className="size-3.5" />
              +45 42 18 73 90
            </a>
          </div>
        </aside>

        <div className="max-w-3xl">
          {page.sections.map((section, index) => (
            <article
              key={section.heading.en}
              className={cn(
                "border-border/60 py-7",
                index > 0 && "border-t",
                index === 0 && "pt-0",
              )}
            >
              <h2 className="font-display text-2xl font-semibold">{section.heading[locale]}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground/75">
                {section.body.map((paragraph) => (
                  <p key={paragraph.en}>{paragraph[locale]}</p>
                ))}
              </div>
            </article>
          ))}

          {page.faqs ? (
            <div className="border-t border-border/60 pt-7">
              <h2 className="font-display text-2xl font-semibold">{t("faqTitle")}</h2>
              <div className="mt-4 space-y-2.5">
                {page.faqs.map((faq) => (
                  <details
                    key={faq.question.en}
                    className="group rounded-xl border border-border/80 bg-card px-5 py-4 open:bg-cream"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
                      {faq.question[locale]}
                      <span className="grid size-6 shrink-0 place-items-center rounded-full border border-border text-sm transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {faq.answer[locale]}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
