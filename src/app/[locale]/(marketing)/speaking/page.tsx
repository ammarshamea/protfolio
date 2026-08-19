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
  return generatePageMetadata({
    title: "Speaking",
    description: "Talks and community sessions.",
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
  const talks = getSpeaking(locale);

  return (
    <>
      <PageHeader
        eyebrow={t("nav.speaking")}
        title="Speaking"
        subtitle="Talks, workshops, and community sessions — this page grows as engagements happen."
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.speaking") },
        ]}
      />
      <Section>
        {talks.length === 0 ? (
          <EmptyState
            icon={Mic}
            title="No talks yet"
            description="I haven't given any public talks yet, but I'm open to speaking about Flutter, Laravel, and multi-tenant architecture — get in touch if you're organizing something."
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
                      Watch / view slides
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
