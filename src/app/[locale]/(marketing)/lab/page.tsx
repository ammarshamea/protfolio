import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/ui/badge";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-children";
import { getLab } from "@/lib/content/misc";
import { generatePageMetadata } from "@/lib/seo";
import type { LabItem } from "@/lib/schemas/misc";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.lab" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/lab",
    locale,
  });
}

export default async function LabPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const tl = await getTranslations({ locale, namespace: "pages.lab" });
  const items = getLab(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={`${t("nav.lab")} · ${items.length}`}
        title={tl("title")}
        subtitle={tl("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.lab") },
        ]}
      />
      <Section>
        <h2 className="sr-only">{tl("srTitle")}</h2>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <StaggerItem key={item.slug}>
              <GlassCard className="h-full">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold">{item.title}</h3>
                  <Badge variant="warning" className="shrink-0">
                    {tl(`status.${item.status as LabItem["status"]}`)}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                  {item.description}
                </p>
                <p className="mt-3 text-xs text-[var(--muted-foreground)]">
                  {tl("startedAt", { date: item.startedAt })}
                </p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>
    </>
  );
}
