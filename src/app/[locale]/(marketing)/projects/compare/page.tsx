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
  return generatePageMetadata({
    title: "Compare Projects",
    description:
      "Compare two projects side by side — stack, features, duration, and results.",
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
  const projects = getAllProjects(locale);

  const projectA = projects.find((p) => p.slug === a) ?? projects[0];
  const projectB = projects.find((p) => p.slug === b) ?? projects[1];

  return (
    <>
      <PageHeader
        eyebrow="Compare"
        title="Project comparison"
        subtitle="Pick any two projects to compare their stack, features, and outcomes side by side."
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.projects"), href: "/projects" },
          { label: "Compare" },
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
            title="Not enough projects"
            description="Add more projects to compare."
          />
        )}
      </Section>
    </>
  );
}
