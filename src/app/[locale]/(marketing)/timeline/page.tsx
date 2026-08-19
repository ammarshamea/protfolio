import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { InteractiveCareerTimeline } from "@/components/timeline/interactive-career-timeline";
import { getTimeline } from "@/lib/content/misc";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.timeline" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/timeline",
    locale,
  });
}

export default async function TimelinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const pt = await getTranslations({ locale, namespace: "pages.timeline" });
  const timeline = getTimeline(locale);

  return (
    <>
      <PageHeader
        eyebrow={t("nav.timeline")}
        title={pt("title")}
        subtitle={pt("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.timeline") },
        ]}
      />
      <Section>
        <InteractiveCareerTimeline items={timeline} />
      </Section>
    </>
  );
}
