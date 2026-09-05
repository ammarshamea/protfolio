import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { getChangelog } from "@/lib/content/misc";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.changelog" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/changelog",
    locale,
  });
}

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const tc = await getTranslations({ locale, namespace: "pages.changelog" });
  const entries = getChangelog(locale);

  return (
    <>
      <PageHeader
        eyebrow={`${t("nav.changelog")} · ${entries.length}`}
        title={tc("title")}
        subtitle={tc("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.changelog") },
        ]}
      />
      <Section>
        <h2 className="sr-only">{tc("srTitle")}</h2>
        <div className="mx-auto max-w-2xl space-y-6">
          {entries.map((entry, index) => (
            <FadeIn key={entry.version} delay={index * 0.06}>
              <GlassCard hover={false}>
                <div className="flex items-center gap-3">
                  <Badge variant="accent">v{entry.version}</Badge>
                  <span className="text-sm text-[var(--muted-foreground)]">
                    {entry.date}
                  </span>
                </div>
                <ul className="mt-4 space-y-1.5">
                  {entry.changes.map((change) => (
                    <li
                      key={change}
                      className="flex gap-2 text-sm text-[var(--muted-foreground)]"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                      {change}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
