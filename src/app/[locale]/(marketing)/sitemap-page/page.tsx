import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GlassCard } from "@/components/shared/glass-card";
import { Link } from "@/i18n/navigation";
import { footerNavGroups } from "@/lib/navigation";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.sitemap" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/sitemap-page",
    locale,
  });
}

export default async function SitemapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const ts = await getTranslations({ locale, namespace: "pages.sitemap" });

  return (
    <>
      <PageHeader
        eyebrow={t("footer.sitemap")}
        title={ts("title")}
        subtitle={ts("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("footer.sitemap") },
        ]}
      />
      <Section>
        <h2 className="sr-only">{ts("srTitle")}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <GlassCard hover={false}>
            <h3 className="mb-4 text-sm font-semibold text-[var(--muted-foreground)]">
              {t("nav.home")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-[var(--accent-text)]">
                  {t("nav.home")}
                </Link>
              </li>
            </ul>
          </GlassCard>
          {footerNavGroups.map((group) => (
            <GlassCard key={group.titleKey} hover={false}>
              <h3 className="mb-4 text-sm font-semibold text-[var(--muted-foreground)]">
                {t(`nav.${group.titleKey}` as Parameters<typeof t>[0])}
              </h3>
              <ul className="space-y-2.5 text-sm">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-[var(--accent-text)]"
                    >
                      {t(`nav.${item.key}` as Parameters<typeof t>[0])}
                    </Link>
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </Section>
    </>
  );
}
