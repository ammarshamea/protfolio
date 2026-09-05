import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { FaCodeBranch, FaGithub } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Section, SectionLabel } from "@/components/shared/section";
import { ProjectVisualPanel } from "@/components/projects/project-visual-panel";
import { ProjectMeta } from "@/components/projects/project-meta";
import {
  CaseStudySection,
  CaseStudyList,
} from "@/components/projects/case-study-section";
import { ProjectCard } from "@/components/projects/project-card";
import { TechChipList } from "@/components/shared/tech-chip";
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

export const dynamicParams = false;

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

  const allSlugs = getAllProjectSlugs();
  const currentIndex = allSlugs.indexOf(project.slug);
  const number = currentIndex >= 0 ? currentIndex + 1 : 1;
  const nextSlug = allSlugs[(currentIndex + 1) % allSlugs.length];
  const nextProject =
    nextSlug && nextSlug !== project.slug ? getProject(nextSlug, locale) : null;

  const related = getAllProjects(locale)
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 3);

  const [firstResult, ...restResults] = project.results;

  return (
    <>
      <TrackOnMount event={{ type: "project_view", label: project.slug }} />

      <header className="border-b border-[var(--surface-border)] pb-12 pt-16 sm:pb-14 sm:pt-20">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-10">
          <SectionLabel
            index={number}
            label={tp(`categories.${project.category}`)}
            className="mb-6"
          />
          <h1 className="max-w-4xl text-balance font-[family-name:var(--font-display)] text-[length:var(--text-display)] font-semibold leading-[1.02] tracking-tight">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-[length:var(--text-body-lg)] text-[var(--muted-foreground)]">
            {project.tagline}
          </p>

          <div className="mt-10 space-y-6 border-t border-[var(--surface-border)] pt-8">
            <ProjectMeta
              fields={[
                { label: td("role"), value: project.role },
                { label: td("duration"), value: project.duration },
                { label: td("year"), value: project.year },
                { label: td("stack"), value: project.stack.join(" · ") },
              ]}
            />
            <TechChipList items={project.stack} />
            <div className="flex flex-wrap gap-3">
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
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    {project.githubUrl.includes("codeberg.org") ? (
                      <FaCodeBranch className="h-4 w-4" />
                    ) : (
                      <FaGithub className="h-4 w-4" />
                    )}
                    {t("common.sourceCode")}
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <Section rhythm="dense" bleed>
        <div className="mx-auto max-w-[90rem] px-6 sm:px-10">
          <ProjectVisualPanel
            project={project}
            priority
            sizes="(max-width: 768px) 100vw, 90rem"
            className="aspect-[16/10] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--surface-border)] shadow-[var(--shadow-card)] sm:aspect-[21/9]"
          />
          {project.screenshotPending ? (
            <p className="mt-3 text-xs text-[var(--muted-foreground)]">
              {td("screenshotPending")}
            </p>
          ) : null}
        </div>
      </Section>

      <Section rhythm="compact">
        <CaseStudySection title={td("overview")}>
          <p>{project.overview}</p>
        </CaseStudySection>
        <CaseStudySection title={td("problem")}>
          <p>{project.problem}</p>
        </CaseStudySection>
        <CaseStudySection title={td("solution")}>
          <p>{project.solution}</p>
        </CaseStudySection>
        <CaseStudySection title={td("architecture")}>
          <p>{project.architecture}</p>
        </CaseStudySection>
        {project.features.length > 0 ? (
          <CaseStudySection title={td("features")}>
            <CaseStudyList items={project.features} />
          </CaseStudySection>
        ) : null}
        {project.challenges.length > 0 ? (
          <CaseStudySection title={td("challenges")}>
            <CaseStudyList items={project.challenges} />
          </CaseStudySection>
        ) : null}
        {project.lessonsLearned.length > 0 ? (
          <CaseStudySection title={td("lessonsLearned")}>
            <CaseStudyList items={project.lessonsLearned} />
          </CaseStudySection>
        ) : null}
        {project.futureImprovements.length > 0 ? (
          <CaseStudySection title={td("futureImprovements")}>
            <CaseStudyList items={project.futureImprovements} />
          </CaseStudySection>
        ) : null}
      </Section>

      {project.gallery.length > 0 ? (
        <Section atmosphere="paper" rhythm="dense">
          <div className="grid gap-6 sm:grid-cols-2">
            {project.gallery.map((image) => (
              <div
                key={image}
                className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--surface-border)] bg-[var(--muted)]"
              >
                <Image
                  src={image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45rem"
                />
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {firstResult ? (
        <Section atmosphere="warm" rhythm="compact">
          <SectionLabel label={td("results")} className="mb-6" />
          <p className="max-w-3xl font-[family-name:var(--font-display)] text-[length:var(--text-h1)] font-semibold leading-[1.1] tracking-tight">
            {firstResult}
          </p>
          {restResults.length > 0 ? (
            <div className="mt-8 max-w-2xl">
              <CaseStudyList items={restResults} />
            </div>
          ) : null}
        </Section>
      ) : null}

      {nextProject ? (
        <Section rhythm="open">
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group grid overflow-hidden rounded-[var(--radius-xl)] border border-[var(--surface-border)] bg-[var(--surface)] shadow-[var(--shadow-card)] lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] min-w-0">
              <ProjectVisualPanel
                project={nextProject}
                className="absolute inset-0"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div className="flex min-w-0 flex-col justify-center p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                {t("common.viewProject")}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-h1)] font-semibold tracking-tight">
                {nextProject.title}
              </h2>
              <p className="mt-4 max-w-lg text-[var(--muted-foreground)]">
                {nextProject.tagline}
              </p>
            </div>
          </Link>
        </Section>
      ) : null}

      {related.length > 0 ? (
        <Section rhythm="compact" divider>
          <h2 className="mb-10 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] font-semibold">
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
