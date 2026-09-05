import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GroupedItemList } from "@/components/shared/grouped-item-list";
import { getToolbox } from "@/lib/content/misc";
import { generatePageMetadata } from "@/lib/seo";

const TOOLBOX_CATEGORIES = [
  "ide",
  "design",
  "terminal",
  "api",
  "deployment",
  "productivity",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.toolbox" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/toolbox",
    locale,
  });
}

export default async function ToolboxPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const tt = await getTranslations({ locale, namespace: "pages.toolbox" });
  const items = getToolbox(locale);

  const categoryLabels = Object.fromEntries(
    TOOLBOX_CATEGORIES.map((key) => [key, tt(`categories.${key}`)]),
  );

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={`${t("nav.toolbox")} · ${items.length}`}
        title={tt("title")}
        subtitle={tt("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.toolbox") },
        ]}
      />
      <Section>
        <GroupedItemList items={items} categoryLabels={categoryLabels} />
      </Section>
    </>
  );
}
