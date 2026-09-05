import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GlassCard } from "@/components/shared/glass-card";
import { TechStack } from "@/components/shared/tech-stack";
import { FadeIn } from "@/components/motion/fade-in";
import { getExperience } from "@/lib/content/misc";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.experience" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/experience",
    locale,
  });
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const te = await getTranslations({ locale, namespace: "pages.experience" });
  const experience = getExperience(locale);

  return (
    <>
      <PageHeader
        eyebrow={`${t("nav.experience")} · ${experience.length}`}
        title={te("title")}
        subtitle={te("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.experience") },
        ]}
      />
      <Section>
        <h2 className="sr-only">{te("srTitle")}</h2>
        <div className="mx-auto max-w-3xl space-y-8">
          {experience.map((job, index) => (
            <FadeIn key={`${job.company}-${job.role}`} delay={index * 0.08}>
              <GlassCard hover={false}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold font-[family-name:var(--font-display)]">
                    {job.role}
                  </h3>
                  <span className="text-sm text-[var(--muted-foreground)]">
                    {job.year}
                  </span>
                </div>
                <p className="text-sm font-medium text-[var(--accent-text)]">
                  {job.company}
                </p>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                    {te("responsibilities")}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {job.responsibilities.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-[var(--muted-foreground)]"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                    {te("achievements")}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {job.achievements.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-[var(--muted-foreground)]"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--success)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <TechStack technologies={job.technologies} className="mt-4" />
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
