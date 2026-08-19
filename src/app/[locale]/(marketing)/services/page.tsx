import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  Smartphone,
  Server,
  Layers,
  Sparkles,
  Wrench,
  Compass,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GlassCard } from "@/components/shared/glass-card";
import { Button } from "@/components/ui/button";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-children";
import { getServices } from "@/lib/content/misc";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.services" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/services",
    locale,
  });
}

const ICONS: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  server: Server,
  layers: Layers,
  sparkles: Sparkles,
  wrench: Wrench,
  compass: Compass,
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const ts = await getTranslations({ locale, namespace: "pages.services" });
  const services = getServices(locale);

  return (
    <>
      <PageHeader
        eyebrow={t("nav.services")}
        title={ts("title")}
        subtitle={ts("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.services") },
        ]}
      />
      <Section>
        <h2 className="sr-only">{ts("srTitle")}</h2>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = ICONS[service.icon] ?? Sparkles;
            return (
              <StaggerItem key={service.slug}>
                <GlassCard className="flex h-full flex-col">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-[var(--muted-foreground)]">
                    {service.description}
                  </p>
                  <ul className="mt-4 space-y-2 border-t border-[var(--surface-border)] pt-4">
                    {service.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--success)]"
                        />
                        <span className="text-[var(--muted-foreground)]">
                          {deliverable}
                        </span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <div className="mt-14 flex justify-center">
          <Button asChild size="lg">
            <Link href="/contact">{t("common.getInTouch")}</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
