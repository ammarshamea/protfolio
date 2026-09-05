import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GroupedItemList } from "@/components/shared/grouped-item-list";
import { getSetup } from "@/lib/content/misc";
import { generatePageMetadata } from "@/lib/seo";

const SETUP_CATEGORIES = [
  "device",
  "monitor",
  "keyboard",
  "mouse",
  "microphone",
  "camera",
  "extension",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.setup" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/uses/setup",
    locale,
  });
}

export default async function SetupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const ts = await getTranslations({ locale, namespace: "pages.setup" });
  const items = getSetup(locale);

  const categoryLabels = Object.fromEntries(
    SETUP_CATEGORIES.map((key) => [key, ts(`categories.${key}`)]),
  );

  return (
    <>
      <PageHeader
        eyebrow={`${t("nav.setup")} · ${items.length}`}
        title={ts("title")}
        subtitle={ts("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.uses"), href: "/uses" },
          { label: t("nav.setup") },
        ]}
      />
      <Section>
        <GroupedItemList items={items} categoryLabels={categoryLabels} />
      </Section>
    </>
  );
}
