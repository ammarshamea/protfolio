import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { getShowcaseProjects } from "@/lib/content/projects";
import { getPortfolioMetrics } from "@/lib/content/metrics";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.projects" });
  const metadata = generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/projects",
    locale,
  });
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      types: { "application/rss+xml": "/feed/projects.xml" },
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const tp = await getTranslations({ locale, namespace: "pages.projects" });
  const projects = getShowcaseProjects(locale);
  const metrics = getPortfolioMetrics(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={tp("eyebrow", { count: metrics.projectsDelivered })}
        title={t("nav.projects")}
        subtitle={tp("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.projects") },
        ]}
      />
      <Section>
        <h2 className="sr-only">{tp("srTitle")}</h2>
        <div className="mb-8 flex flex-wrap justify-end gap-3">
          <Button variant="secondary" size="sm" asChild>
            <Link href="/projects/favorites">
              <Star className="h-3.5 w-3.5" />
              {t("nav.favorites")}
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/projects/compare">{t("pages.compare.eyebrow")}</Link>
          </Button>
        </div>
        <ProjectsExplorer projects={projects} />
      </Section>
    </>
  );
}
