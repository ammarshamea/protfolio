import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GlassCard } from "@/components/shared/glass-card";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-children";
import { TechIcon } from "@/components/shared/tech-icon";
import {
  getAllTechnologies,
  getTechDomainSummary,
} from "@/lib/content/tech-stack";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.techStack" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/tech-stack",
    locale,
  });
}

export default async function TechStackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const tt = await getTranslations({ locale, namespace: "pages.techStack" });
  const tc = await getTranslations({ locale, namespace: "pages.categories" });
  const technologies = getAllTechnologies(locale);
  const domains = getTechDomainSummary(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={`${t("nav.techStack")} · ${technologies.length}`}
        title={tt("title")}
        subtitle={tt("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.techStack") },
        ]}
      />
      <Section rhythm="dense" divider>
        <h2 className="mb-6 text-[length:var(--text-label)] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
          {tt("domainOverview")}
        </h2>
        <StaggerContainer className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {domains.map((domain) => (
            <StaggerItem key={domain.category}>
              <GlassCard padding="sm" className="text-center">
                <p className="text-2xl font-semibold tabular-nums text-[var(--foreground)]">
                  {domain.count}
                </p>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                  {tc(domain.category)}
                </p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>
      <Section>
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech) => (
            <StaggerItem key={tech.slug}>
              <Link href={`/stack/${tech.slug}`}>
                <GlassCard className="h-full">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--muted)] text-[var(--foreground)]">
                        <TechIcon name={tech.slug} className="h-5 w-5" />
                      </span>
                      <h2 className="font-semibold">{tech.name}</h2>
                    </div>
                    <span className="shrink-0 text-xs text-[var(--muted-foreground)]">
                      {tc(tech.category)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                    {tech.projectSlugs.length === 0
                      ? tt("yearsExploring", { years: tech.yearsOfExperience })
                      : tech.projectSlugs.length === 1
                        ? tt("yearsProjects", {
                            years: tech.yearsOfExperience,
                            count: tech.projectSlugs.length,
                          })
                        : tt("yearsProjectsPlural", {
                            years: tech.yearsOfExperience,
                            count: tech.projectSlugs.length,
                          })}
                  </p>
                </GlassCard>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>
    </>
  );
}
