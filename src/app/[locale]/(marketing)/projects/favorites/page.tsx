import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-children";
import { ProjectCard } from "@/components/projects/project-card";
import { getFavoriteProjects } from "@/lib/content/projects";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: "Favorite Projects",
    description:
      "The projects I'm most proud of — picked for the problems they solved, not just the tech stack.",
    path: "/projects/favorites",
    locale,
  });
}

export default async function FavoriteProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const projects = getFavoriteProjects(locale);

  return (
    <>
      <PageHeader
        eyebrow={t("nav.favorites")}
        title="Favorite projects"
        subtitle="Not necessarily the biggest projects — the ones where the architecture, the problem, or the outcome made me proud of the work."
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.projects"), href: "/projects" },
          { label: t("nav.favorites") },
        ]}
      />
      <Section>
        <h2 className="sr-only">Favorite projects</h2>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>
    </>
  );
}
