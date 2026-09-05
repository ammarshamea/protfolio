import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { ProjectComparison } from "@/components/projects/project-comparison";
import { CompareSelector } from "@/components/projects/compare-selector";
import { EmptyState } from "@/components/shared/empty-state";
import { getAllProjects } from "@/lib/content/projects";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.compare" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/projects/compare",
    locale,
  });
}

export default async function CompareProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ a?: string; b?: string }>;
}) {
  const { locale } = await params;
  const { a, b } = await searchParams;
  const t = await getTranslations({ locale });
  const tc = await getTranslations({ locale, namespace: "pages.compare" });
  const projects = getAllProjects(locale);

  const projectA = projects.find((p) => p.slug === a) ?? projects[0];
  const projectB = projects.find((p) => p.slug === b) ?? projects[1];

  return (
    <>
      <PageHeader
        eyebrow={tc("eyebrow")}
        title={tc("title")}
        subtitle={tc("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.projects"), href: "/projects" },
          { label: tc("eyebrow") },
        ]}
      />
      <Section>
        <CompareSelector
          projects={projects.map((p) => ({ slug: p.slug, title: p.title }))}
          selectedA={projectA?.slug}
          selectedB={projectB?.slug}
        />
        {projectA && projectB ? (
          <ProjectComparison projectA={projectA} projectB={projectB} />
        ) : (
          <EmptyState
            title={tc("emptyTitle")}
            description={tc("emptyDescription")}
          />
        )}
      </Section>
    </>
  );
}
