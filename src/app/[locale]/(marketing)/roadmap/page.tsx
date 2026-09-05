import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Check, Circle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GlassCard } from "@/components/shared/glass-card";
import { FadeIn } from "@/components/motion/fade-in";
import { getRoadmap } from "@/lib/content/misc";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.roadmap" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/roadmap",
    locale,
  });
}

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const tr = await getTranslations({ locale, namespace: "pages.roadmap" });
  const roadmap = getRoadmap(locale);

  return (
    <>
      <PageHeader
        eyebrow={t("nav.roadmap")}
        title={tr("title")}
        subtitle={tr("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.roadmap") },
        ]}
      />
      <Section>
        <div className="mx-auto max-w-2xl space-y-10">
          {roadmap.map((year, index) => (
            <FadeIn key={year.year} delay={index * 0.1}>
              <h2 className="mb-4 font-[family-name:var(--font-display)] text-2xl font-semibold">
                {year.year}
              </h2>
              <GlassCard hover={false}>
                <ul className="space-y-3">
                  {year.goals.map((goal) => (
                    <li
                      key={goal.label}
                      className="flex items-start gap-3 text-sm"
                    >
                      {goal.done ? (
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--success)]"
                        />
                      ) : (
                        <Circle
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted-foreground)]"
                        />
                      )}
                      <span
                        className={
                          goal.done
                            ? "text-[var(--muted-foreground)] line-through"
                            : undefined
                        }
                      >
                        {goal.label}
                        <span className="sr-only">
                          {" "}
                          — {goal.done ? tr("completed") : tr("notCompleted")}
                        </span>
                      </span>
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
