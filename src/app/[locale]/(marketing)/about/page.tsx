import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Section, SectionLabel } from "@/components/shared/section";
import { FadeIn } from "@/components/motion/fade-in";
import { ValuesGrid } from "@/components/about/values-grid";
import { HowIWork } from "@/components/about/how-i-work";
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
      <header className="border-b border-[var(--surface-border)] pb-16 pt-32 sm:pt-40">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-10">
          <SectionLabel label={t("nav.about")} className="mb-6" />
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-6">
              <h1 className="font-[family-name:var(--font-display)] text-[length:var(--text-display)] font-semibold tracking-tight">
                {site.motto}
              </h1>
              <p className="mt-6 max-w-xl text-[length:var(--text-body-lg)] leading-relaxed text-[var(--muted-foreground)]">
                {site.philosophy}
              </p>
            </div>
            <div className="relative min-w-0 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--surface-border)] shadow-[var(--shadow-card)] lg:col-span-6">
              <div className="relative aspect-[4/5] sm:aspect-[5/4]">
                <Image
                  src="/images/about-portrait.png"
                  alt={site.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <Section rhythm="open">
        <div className="grid gap-6 lg:grid-cols-12">
          {site.bio.long.map((paragraph, index) => (
            <FadeIn key={index} delay={index * 0.05} className="lg:col-span-6">
              <p className="text-[length:var(--text-body-lg)] leading-relaxed text-[var(--muted-foreground)]">
                {paragraph}
              </p>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section atmosphere="paper" rhythm="compact">
        <div className="grid gap-5 sm:grid-cols-2">
          <FadeIn className="rounded-[var(--radius-lg)] border border-[var(--surface-border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
            <SectionLabel label={ta("mission")} className="mb-4" />
            <p className="text-[length:var(--text-h3)] font-medium leading-snug">
              {site.mission}
            </p>
          </FadeIn>
          <FadeIn
            delay={0.06}
            className="rounded-[var(--radius-lg)] border border-[var(--surface-border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]"
          >
            <SectionLabel label={ta("vision")} className="mb-4" />
            <p className="text-[length:var(--text-h3)] font-medium leading-snug">
              {site.vision}
            </p>
          </FadeIn>
        </div>
      </Section>

      <Section rhythm="compact">
        <SectionLabel index={1} label={ta("valuesTitle")} className="mb-8" />
        <ValuesGrid values={site.values} />
      </Section>

      <Section atmosphere="paper" rhythm="open">
        <SectionLabel index={2} label={ta("processTitle")} className="mb-8" />
        <HowIWork intro={site.howIWork.intro} steps={site.howIWork.steps} />
      </Section>

      <Section rhythm="compact">
        <SectionLabel index={3} label={ta("funFactsTitle")} className="mb-8" />
        <div className="grid gap-4 sm:grid-cols-2">
          {site.funFacts.map((fact) => (
            <FadeIn
              key={fact}
              className="rounded-[var(--radius-lg)] border border-[var(--surface-border)] bg-[var(--surface)] p-5 text-sm leading-relaxed text-[var(--muted-foreground)] shadow-[var(--shadow-card)]"
            >
              {fact}
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section rhythm="open">
        <div className="rounded-[var(--radius-xl)] border border-[var(--surface-border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-card)] sm:p-10">
          <p className="max-w-xl font-[family-name:var(--font-display)] text-[length:var(--text-h1)] font-semibold tracking-tight">
            {ta("ctaTitle")}
          </p>
          <p className="mt-4 max-w-lg text-[var(--muted-foreground)]">
            {ta("ctaDescription")}
          </p>
          <Button className="mt-6" asChild>
            <Link href="/timeline">{t("nav.timeline")}</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
