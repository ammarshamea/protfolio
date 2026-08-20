import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { FileDown, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Section, SectionLabel } from "@/components/shared/section";
import { IntroPlayer } from "@/components/home/intro-splash";
import { CurrentStatus } from "@/components/home/current-status";
import { StatsPreview } from "@/components/home/stats-preview";
import { IdentityIntro } from "@/components/home/identity-intro";
import { SelectedWork } from "@/components/home/selected-work";
import { Capabilities } from "@/components/home/capabilities";
import { ExperienceTeaser } from "@/components/home/experience-teaser";
import { ContactCta } from "@/components/home/contact-cta";
import { AvailabilityBadge } from "@/components/shared/availability-badge";
import { FadeIn } from "@/components/motion/fade-in";
import { getSiteContent } from "@/lib/content/site";
import { getAllProjects, getFeaturedProjects } from "@/lib/content/projects";
import { getNow, getStats, getServices, getTimeline } from "@/lib/content/misc";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const site = getSiteContent(locale);
  return generatePageMetadata({
    title: `${site.name} — ${site.titles[0]} & ${site.titles[2]}`,
    description: site.bio.short,
    path: "/",
    locale,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const th = await getTranslations({ locale, namespace: "home" });
  const site = getSiteContent(locale);
  const allProjects = getAllProjects(locale);
  const featuredProjects = getFeaturedProjects(locale);
  const now = getNow(locale);
  const stats = getStats();
  const services = getServices(locale);
  const timeline = getTimeline(locale);

  return (
    <>
      <section id="top" className="relative overflow-x-clip pt-28 sm:pt-32">
        <div className="mx-auto grid max-w-[90rem] items-center gap-10 px-6 py-10 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
          <FadeIn className="min-w-0">
            <AvailabilityBadge label={t("hero.availabilityBadge")} />
            <p className="mt-6 text-sm font-medium text-[var(--accent)]">
              {site.location}
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-display-xl)] font-semibold tracking-tight">
              {site.name}
            </h1>
            <p className="mt-3 text-[length:var(--text-h3)] font-medium text-[var(--muted-foreground)]">
              {site.titles[0]} · {site.titles[2]}
            </p>
            <p className="mt-6 max-w-xl text-[length:var(--text-body-lg)] leading-relaxed text-[var(--muted-foreground)]">
              {site.bio.short}
            </p>
            <div className="mt-5">
              <CurrentStatus status={now.heroStatus} />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/contact">
                  <MessageCircle className="h-4 w-4" />
                  {t("common.getInTouch")}
                </Link>
              </Button>
              <IntroPlayer locale={locale} label={t("hero.introQuick")} />
              <Button size="lg" variant="outline" asChild>
                <Link href="/projects">{t("nav.projects")}</Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <Link href="/resume">
                  <FileDown className="h-4 w-4" />
                  {t("common.downloadResume")}
                </Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="relative min-w-0">
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-[2rem] bg-[var(--accent)]/10 blur-3xl"
            />
            <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--surface-border)] shadow-[var(--shadow-card)]">
              <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src="/images/hero-studio.png"
                  alt={site.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Section rhythm="dense">
        <IdentityIntro
          label={t("nav.about")}
          statement={site.tagline}
          description={site.bio.long[0]}
          readMoreLabel={t("common.readMore")}
        />
      </Section>

      <Section atmosphere="paper" rhythm="open">
        <SelectedWork
          projects={featuredProjects}
          eyebrow={th("workEyebrow")}
          title={th("workTitle")}
          viewAllLabel={t("common.viewAll")}
          viewAllCount={allProjects.length}
        />
      </Section>

      <Section rhythm="open">
        <SectionLabel index={3} label={th("capabilitiesEyebrow")} className="mb-4" />
        <h2 className="mb-10 max-w-xl font-[family-name:var(--font-display)] text-[length:var(--text-h1)] font-semibold tracking-tight">
          {th("capabilitiesTitle")}
        </h2>
        <Capabilities services={services} />
      </Section>

      <Section atmosphere="paper" rhythm="compact">
        <StatsPreview
          stats={[
            {
              value: Number.parseInt(stats.yearsExperience, 10) || 2,
              suffix: "+",
              label: t("hero.yearsExperience"),
            },
            {
              value: allProjects.length,
              suffix: "+",
              label: t("hero.projectsDelivered"),
            },
            {
              value: allProjects.filter((p) => p.liveUrl).length,
              suffix: "",
              label: t("hero.liveProducts"),
            },
            {
              value: allProjects.filter((p) => p.category === "mobile").length,
              suffix: "+",
              label: t("hero.mobileApps"),
            },
          ]}
        />
      </Section>

      <Section rhythm="open">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <SectionLabel index={4} label={t("nav.about")} className="mb-5" />
            <p className="font-[family-name:var(--font-display)] text-[length:var(--text-h1)] font-semibold tracking-tight">
              {site.mission}
            </p>
            <p className="mt-5 max-w-[42rem] text-[length:var(--text-body-lg)] leading-relaxed text-[var(--muted-foreground)]">
              {site.bio.long[1]}
            </p>
            <Button className="mt-6" variant="secondary" asChild>
              <Link href="/about">{t("common.readMore")}</Link>
            </Button>
          </div>
          <div className="relative min-w-0 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--surface-border)] shadow-[var(--shadow-card)] lg:col-span-7">
            <div className="relative aspect-[16/10]">
              <Image
                src="/images/about-portrait.png"
                alt={site.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section atmosphere="paper" rhythm="compact">
        <ExperienceTeaser
          items={timeline}
          eyebrow={t("nav.experience")}
          title={t("pages.timeline.title")}
          moreLabel={th("experienceMore")}
        />
      </Section>

      <Section rhythm="open">
        <ContactCta
          eyebrow={t("nav.contact")}
          headline={th("contactHeadline")}
          primaryLabel={t("common.sendMessage")}
          location={site.contact.location}
          availability={site.contact.availability.join(" · ")}
          email={site.contact.email}
          socials={site.socials}
        />
      </Section>
    </>
  );
}
