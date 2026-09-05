import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Mic } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GlassCard } from "@/components/shared/glass-card";
import { EmptyState } from "@/components/shared/empty-state";
import { getSpeaking } from "@/lib/content/misc";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.speaking" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/speaking",
    locale,
  });
}

export default async function SpeakingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const ts = await getTranslations({ locale, namespace: "pages.speaking" });
  const talks = getSpeaking(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={t("nav.speaking")}
        title={ts("title")}
        subtitle={ts("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.speaking") },
        ]}
      />
      <Section>
        {talks.length === 0 ? (
          <EmptyState
            icon={Mic}
            title={ts("emptyTitle")}
            description={ts("emptyDescription")}
          />
        ) : (
          <ul className="mx-auto max-w-2xl space-y-4">
            {talks.map((talk) => (
              <li key={talk.title}>
                <GlassCard hover={false}>
                  <h2 className="font-semibold">{talk.title}</h2>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                    {talk.event} &middot; {talk.date}
                  </p>
                  {talk.url ? (
                    <a
                      href={talk.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-sm font-medium text-[var(--accent-text)] hover:underline"
                    >
                      {ts("viewTalk")}
                    </a>
                  ) : null}
                </GlassCard>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
