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
import { getAllTechnologies } from "@/lib/content/tech-stack";
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

  return (
    <>
      <PageHeader
        eyebrow={t("nav.techStack")}
        title={tt("title")}
        subtitle={tt("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.techStack") },
        ]}
      />
      <Section>
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech) => (
            <StaggerItem key={tech.slug}>
              <Link href={`/stack/${tech.slug}`}>
                <GlassCard className="h-full">
                  <div className="flex items-start justify-between">
                    <h2 className="font-semibold">{tech.name}</h2>
                    <span className="text-xs text-[var(--muted-foreground)]">
                      {tc(tech.category)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                    {tech.projectSlugs.length === 1
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
