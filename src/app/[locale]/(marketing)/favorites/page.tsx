import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GroupedItemList } from "@/components/shared/grouped-item-list";
import { getFavorites } from "@/lib/content/misc";
import { generatePageMetadata } from "@/lib/seo";

const FAVORITE_CATEGORIES = [
  "tool",
  "book",
  "youtube",
  "podcast",
  "website",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.favorites" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/favorites",
    locale,
  });
}

export default async function FavoritesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const tf = await getTranslations({ locale, namespace: "pages.favorites" });
  const favorites = getFavorites(locale);

  const categoryLabels = Object.fromEntries(
    FAVORITE_CATEGORIES.map((key) => [key, tf(`categories.${key}`)]),
  );

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={`${t("nav.favorites")} · ${favorites.length}`}
        title={tf("title")}
        subtitle={tf("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.favorites") },
        ]}
      />
      <Section>
        <GroupedItemList items={favorites} categoryLabels={categoryLabels} />
      </Section>
    </>
  );
}
