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
  const t = await getTranslations({
    locale,
    namespace: "pages.favoritesProjects",
  });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
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
  const tf = await getTranslations({
    locale,
    namespace: "pages.favoritesProjects",
  });
  const projects = getFavoriteProjects(locale);

  return (
    <>
      <PageHeader
        eyebrow={t("nav.favorites")}
        title={tf("title")}
        subtitle={tf("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.projects"), href: "/projects" },
          { label: t("nav.favorites") },
        ]}
      />
      <Section>
        <h2 className="sr-only">{tf("srTitle")}</h2>
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
