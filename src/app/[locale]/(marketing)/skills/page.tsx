import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { SkillVisualization } from "@/components/shared/skill-visualization";
import { getAllTechnologies } from "@/lib/content/tech-stack";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.skills" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/skills",
    locale,
  });
}

export default async function SkillsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const ts = await getTranslations({ locale, namespace: "pages.skills" });
  const technologies = getAllTechnologies(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={`${t("nav.skills")} · ${technologies.length}`}
        title={ts("title")}
        subtitle={ts("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.skills") },
        ]}
      />
      <Section>
        <SkillVisualization technologies={technologies} />
      </Section>
    </>
  );
}
