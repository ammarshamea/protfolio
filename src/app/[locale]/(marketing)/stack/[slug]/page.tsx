import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { TechDetailPage } from "@/components/stack/tech-detail-page";
import { getAllTechSlugs, getTechnology } from "@/lib/content/tech-stack";
import { getAllProjects } from "@/lib/content/projects";
import { generatePageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllTechSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tech = getTechnology(slug, locale);
  if (!tech) return {};

  return generatePageMetadata({
    title: tech.name,
    description: tech.experience,
    path: `/stack/${slug}`,
    locale,
  });
}

export default async function TechStackDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const technology = getTechnology(slug, locale);

  if (!technology) notFound();

  const projects = getAllProjects(locale).filter((p) =>
    technology.projectSlugs.includes(p.slug),
  );

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={`${t("nav.techStack")} · ${technology.projectSlugs.length}`}
        title={technology.name}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.techStack"), href: "/tech-stack" },
          { label: technology.name },
        ]}
      />
      <Section>
        <TechDetailPage
          technology={technology}
          projects={projects}
          locale={locale}
        />
      </Section>
    </>
  );
}
