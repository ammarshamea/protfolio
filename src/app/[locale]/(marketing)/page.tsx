import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Section, SectionLabel } from "@/components/shared/section";
import { IntroGate, IntroPlayer } from "@/components/home/intro-splash";
import { CurrentStatus } from "@/components/home/current-status";
import { StatsPreview } from "@/components/home/stats-preview";
import { IdentityIntro } from "@/components/home/identity-intro";
import { SelectedWork } from "@/components/home/selected-work";
import { Capabilities } from "@/components/home/capabilities";
import { ExperienceTeaser } from "@/components/home/experience-teaser";
import { ContactCta } from "@/components/home/contact-cta";
import { ScriptHeading } from "@/components/home/shell/script-heading";
import { StatusPills } from "@/components/home/shell/status-pills";
import { FramedPortrait } from "@/components/home/shell/framed-portrait";
import {
  HeroEntrance,
  HeroItem,
  HeroMedia,
} from "@/components/home/hero-entrance";
import { getSiteContent } from "@/lib/content/site";
import { getFeaturedProjects } from "@/lib/content/projects";
import { getPortfolioMetrics } from "@/lib/content/metrics";
import { getNow, getServices, getTimeline } from "@/lib/content/misc";
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
  const metrics = getPortfolioMetrics(locale);
  const featuredProjects = getFeaturedProjects(locale);
  const now = getNow(locale);
  const services = getServices(locale);
  const timeline = getTimeline(locale);
  const whatsappHref = `${site.socials.whatsapp}?text=${encodeURIComponent(t("hero.whatsappMessage"))}`;

  return (
    <IntroGate locale={locale}>
      <section
        id="top"
        className="relative overflow-x-clip pb-6 pt-16 sm:pt-20"
      >
        <div className="mx-auto grid max-w-[90rem] items-center gap-10 px-6 py-10 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
          <HeroEntrance className="min-w-0">
            <HeroItem>
              <ScriptHeading
                eyebrow={t("hero.eyebrow")}
                name={site.name}
                locale={locale}
              />
            </HeroItem>
            <HeroItem>
              <p className="mt-3 text-[length:var(--text-h3)] font-medium text-[var(--muted-foreground)]">
                {site.titles[0]} · {site.titles[2]}
              </p>
            </HeroItem>
            <HeroItem>
              <p className="mt-6 max-w-xl text-[length:var(--text-body-lg)] leading-relaxed text-[var(--muted-foreground)]">
                {site.bio.short}
              </p>
            </HeroItem>
            <HeroItem className="mt-6">
              <StatusPills
                availabilityLabel={t("hero.availabilityBadge")}
                timezone={site.contact.timezone}
                whatsappHref={whatsappHref}
                whatsappLabel={t("hero.whatsappCta")}
              />
            </HeroItem>
            <HeroItem className="mt-3">
              <CurrentStatus status={now.heroStatus} />
            </HeroItem>
            <HeroItem className="mt-8">
              <div className="flex flex-wrap gap-3">
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">
                    <MessageCircle className="h-4 w-4" />
                    {t("common.getInTouch")}
                  </Link>
                </Button>
                <IntroPlayer locale={locale} label={t("hero.introQuick")} />
              </div>
            </HeroItem>
          </HeroEntrance>

          <HeroMedia className="relative min-w-0">
            <FramedPortrait
              src={site.portrait}
              alt={site.name}
              stats={[
                {
                  value: `${metrics.projectsDelivered}+`,
                  label: t("hero.projectsDelivered"),
                },
                {
                  value: `${metrics.liveProducts}`,
                  label: t("hero.liveProducts"),
                },
              ]}
            />
          </HeroMedia>
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
          viewAllCount={metrics.projectsDelivered}
        />
      </Section>

      <Section rhythm="open">
        <SectionLabel
          index={3}
          label={th("capabilitiesEyebrow")}
          className="mb-4"
        />
        <h2 className="mb-10 max-w-xl font-[family-name:var(--font-display)] text-[length:var(--text-h1)] font-semibold tracking-tight">
          {th("capabilitiesTitle")}
        </h2>
        <Capabilities services={services} />
      </Section>

      <Section atmosphere="paper" rhythm="compact">
        <StatsPreview
          stats={[
            {
              value: metrics.yearsExperience,
              suffix: "+",
              label: t("hero.yearsExperience"),
            },
            {
              value: metrics.projectsDelivered,
              suffix: "+",
              label: t("hero.projectsDelivered"),
            },
            {
              value: metrics.liveProducts,
              suffix: "",
              label: t("hero.liveProducts"),
            },
            {
              value: metrics.mobileApps,
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
                src={site.portrait}
                alt={site.name}
                fill
                className="object-cover object-[center_18%]"
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
    </IntroGate>
  );
}
