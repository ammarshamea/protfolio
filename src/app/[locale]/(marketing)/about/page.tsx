import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { Section, SectionHeading } from "@/components/shared/section";
import { FadeIn } from "@/components/motion/fade-in";
import { ValuesGrid } from "@/components/about/values-grid";
import { HowIWork } from "@/components/about/how-i-work";
import { GlassCard } from "@/components/shared/glass-card";
import { CTABlock } from "@/components/shared/cta-block";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getSiteContent } from "@/lib/content/site";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });
  const site = getSiteContent(locale);
  return generatePageMetadata({
    title: t("metaTitle"),
    description: site.bio.short,
    path: "/about",
    locale,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const ta = await getTranslations({ locale, namespace: "pages.about" });
  const site = getSiteContent(locale);

  return (
    <>
      <PageHeader
        eyebrow={t("nav.about")}
        title={ta("title")}
        subtitle={site.bio.short}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.about") },
        ]}
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-6">
          {site.bio.long.map((paragraph, index) => (
            <FadeIn key={index} delay={index * 0.05}>
              <p className="text-lg leading-relaxed text-[var(--muted-foreground)]">
                {paragraph}
              </p>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="border-t border-[var(--surface-border)]">
        <div className="grid gap-8 sm:grid-cols-2">
          <GlassCard>
            <h2 className="text-lg font-semibold font-[family-name:var(--font-display)]">
              {ta("mission")}
            </h2>
            <p className="mt-3 text-[var(--muted-foreground)]">
              {site.mission}
            </p>
          </GlassCard>
          <GlassCard>
            <h2 className="text-lg font-semibold font-[family-name:var(--font-display)]">
              {ta("vision")}
            </h2>
            <p className="mt-3 text-[var(--muted-foreground)]">{site.vision}</p>
          </GlassCard>
        </div>
      </Section>

      <Section className="border-t border-[var(--surface-border)]">
        <SectionHeading
          eyebrow={ta("valuesEyebrow")}
          title={ta("valuesTitle")}
        />
        <ValuesGrid values={site.values} />
      </Section>

      <Section className="border-t border-[var(--surface-border)]">
        <SectionHeading
          eyebrow={ta("processEyebrow")}
          title={ta("processTitle")}
          description={site.philosophy}
        />
        <HowIWork intro={site.howIWork.intro} steps={site.howIWork.steps} />
      </Section>

      <Section className="border-t border-[var(--surface-border)]">
        <SectionHeading
          eyebrow={ta("funFactsEyebrow")}
          title={ta("funFactsTitle")}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {site.funFacts.map((fact) => (
            <GlassCard key={fact} padding="sm">
              <p className="text-sm text-[var(--muted-foreground)]">{fact}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section className="border-t border-[var(--surface-border)]">
        <CTABlock title={ta("ctaTitle")} description={ta("ctaDescription")}>
          <MagneticButton>
            <Button size="lg" asChild>
              <Link href="/timeline">{t("nav.timeline")}</Link>
            </Button>
          </MagneticButton>
        </CTABlock>
      </Section>
    </>
  );
}
