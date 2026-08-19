import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ExternalLink, Calendar, Clock, User } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { TechStack } from "@/components/shared/tech-stack";
import { ProjectCover } from "@/components/shared/project-cover";
import { GlassCard } from "@/components/shared/glass-card";
import {
  CaseStudySection,
  CaseStudyList,
} from "@/components/projects/case-study-section";
import { ProjectCard } from "@/components/projects/project-card";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-children";
import { JsonLd } from "@/components/shared/json-ld";
import { TrackOnMount } from "@/components/shared/track-on-mount";
import {
  getAllProjects,
  getAllProjectSlugs,
  getProject,
} from "@/lib/content/projects";
import {
  generatePageMetadata,
  softwareApplicationJsonLd,
  breadcrumbJsonLd,
  absoluteUrl,
} from "@/lib/seo";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug, locale);
  if (!project) return {};

  return generatePageMetadata({
    title: project.title,
    description: project.overview,
    path: `/projects/${slug}`,
    locale,
    ogImagePath: `/og/project?slug=${slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const tp = await getTranslations({ locale, namespace: "pages.projects" });
  const td = await getTranslations({
    locale,
    namespace: "pages.projects.detail",
  });
  const project = getProject(slug, locale);

  if (!project) notFound();

  const related = getAllProjects(locale)
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 3);

  return (
    <>
      <TrackOnMount event={{ type: "project_view", label: project.slug }} />
      <PageHeader
        eyebrow={tp(`categories.${project.category}`)}
        title={project.title}
        subtitle={project.tagline}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.projects"), href: "/projects" },
          { label: project.title },
        ]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ProjectCover
              title={project.title}
              stack={project.stack}
              coverImage={project.coverImage}
              className="mb-4"
            />
            {project.screenshotPending ? (
              <p className="mb-8 text-xs text-[var(--muted-foreground)]">
                {td("screenshotPending")}
              </p>
            ) : null}

            <CaseStudySection title={td("overview")}>
              <p className="text-[var(--muted-foreground)]">
                {project.overview}
              </p>
            </CaseStudySection>
            <CaseStudySection title={td("problem")}>
              <p className="text-[var(--muted-foreground)]">
                {project.problem}
              </p>
            </CaseStudySection>
            <CaseStudySection title={td("solution")}>
              <p className="text-[var(--muted-foreground)]">
                {project.solution}
              </p>
            </CaseStudySection>
            <CaseStudySection title={td("architecture")}>
              <p className="text-[var(--muted-foreground)]">
                {project.architecture}
              </p>
            </CaseStudySection>
            <CaseStudySection title={td("features")}>
              <CaseStudyList items={project.features} />
            </CaseStudySection>
            <CaseStudySection title={td("challenges")}>
              <CaseStudyList items={project.challenges} />
            </CaseStudySection>
            <CaseStudySection title={td("lessonsLearned")}>
              <CaseStudyList items={project.lessonsLearned} />
            </CaseStudySection>
            <CaseStudySection title={td("futureImprovements")}>
              <CaseStudyList items={project.futureImprovements} />
            </CaseStudySection>
            <CaseStudySection title={td("results")}>
              <CaseStudyList items={project.results} />
            </CaseStudySection>
          </div>

          <aside className="space-y-6">
            <GlassCard hover={false}>
              <dl className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <dt className="flex items-center gap-2 text-[var(--muted-foreground)]">
                    <User
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-[var(--accent)]"
                    />
                    {td("role")}
                  </dt>
                  <dd className="ml-auto font-medium">{project.role}</dd>
                </div>
                <div className="flex items-center gap-3">
                  <dt className="flex items-center gap-2 text-[var(--muted-foreground)]">
                    <Clock
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-[var(--accent)]"
                    />
                    {td("duration")}
                  </dt>
                  <dd className="ml-auto font-medium">{project.duration}</dd>
                </div>
                <div className="flex items-center gap-3">
                  <dt className="flex items-center gap-2 text-[var(--muted-foreground)]">
                    <Calendar
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-[var(--accent)]"
                    />
                    {td("year")}
                  </dt>
                  <dd className="ml-auto font-medium">{project.year}</dd>
                </div>
              </dl>

              <div className="mt-6 border-t border-[var(--surface-border)] pt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
                  {td("stack")}
                </p>
                <TechStack technologies={project.stack} />
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-[var(--surface-border)] pt-6">
                {project.liveUrl ? (
                  <Button asChild>
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      {t("common.liveDemo")}
                    </a>
                  </Button>
                ) : null}
                {project.githubUrl ? (
                  <Button variant="secondary" asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaGithub className="h-4 w-4" />
                      {t("common.sourceCode")}
                    </a>
                  </Button>
                ) : null}
              </div>
            </GlassCard>
          </aside>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section className="border-t border-[var(--surface-border)]">
          <h2 className="mb-8 text-2xl font-semibold font-[family-name:var(--font-display)]">
            {td("related")}
          </h2>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <StaggerItem key={p.slug}>
                <ProjectCard project={p} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Section>
      ) : null}

      <JsonLd data={softwareApplicationJsonLd(project, locale)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("nav.home"), url: absoluteUrl(`/${locale}`) },
          { name: t("nav.projects"), url: absoluteUrl(`/${locale}/projects`) },
          {
            name: project.title,
            url: absoluteUrl(`/${locale}/projects/${project.slug}`),
          },
        ])}
      />
    </>
  );
}
