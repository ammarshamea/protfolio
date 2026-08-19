import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GroupedItemList } from "@/components/shared/grouped-item-list";
import { Button } from "@/components/ui/button";
import { getUses } from "@/lib/content/misc";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.uses" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/uses",
    locale,
  });
}

export default async function UsesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const tu = await getTranslations({ locale, namespace: "pages.uses" });
  const items = getUses(locale);

  return (
    <>
      <PageHeader
        eyebrow={t("nav.uses")}
        title={tu("title")}
        subtitle={tu("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.uses") },
        ]}
      />
      <Section>
        <GroupedItemList items={items} />
        <div className="mt-12 flex justify-center">
          <Button variant="secondary" asChild>
            <Link href="/uses/setup">
              {tu("seeSetup")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
