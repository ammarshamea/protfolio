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
  return generatePageMetadata({
    title: "Sitemap",
    description: "Every page on this site, organized in one place.",
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

  return (
    <>
      <PageHeader
        eyebrow="Sitemap"
        title="Every page, in one place"
        subtitle="A human-readable map of the site — for the XML version, see /sitemap.xml."
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: "Sitemap" },
        ]}
      />
      <Section>
        <h2 className="sr-only">Site sections</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <GlassCard hover={false}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
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
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
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
