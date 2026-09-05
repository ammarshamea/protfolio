import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Newspaper } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GlassCard } from "@/components/shared/glass-card";
import { EmptyState } from "@/components/shared/empty-state";
import { getPress } from "@/lib/content/misc";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.press" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/press",
    locale,
  });
}

export default async function PressPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const tp = await getTranslations({ locale, namespace: "pages.press" });
  const mentions = getPress(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={t("nav.press")}
        title={tp("title")}
        subtitle={tp("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.press") },
        ]}
      />
      <Section>
        {mentions.length === 0 ? (
          <EmptyState
            icon={Newspaper}
            title={tp("emptyTitle")}
            description={tp("emptyDescription")}
          />
        ) : (
          <ul className="mx-auto max-w-2xl space-y-4">
            {mentions.map((item) => (
              <li key={item.title}>
                <GlassCard hover={false}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <h2 className="font-semibold hover:text-[var(--accent-text)]">
                      {item.title}
                    </h2>
                  </a>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                    {item.outlet} &middot; {item.date}
                  </p>
                </GlassCard>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
