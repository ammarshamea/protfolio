import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { CompareProjectsView } from "@/components/projects/compare-projects-view";
import { getShowcaseProjects } from "@/lib/content/projects";
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
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const tc = await getTranslations({ locale, namespace: "pages.compare" });
  const projects = getShowcaseProjects(locale);

  return (
    <>
      <PageHeader
        locale={locale}
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
        <Suspense>
          <CompareProjectsView
            projects={projects}
            emptyTitle={tc("emptyTitle")}
            emptyDescription={tc("emptyDescription")}
          />
        </Suspense>
      </Section>
    </>
  );
}
