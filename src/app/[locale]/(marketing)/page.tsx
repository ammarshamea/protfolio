import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowRight, FileDown, MessageCircle } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/shared/section";
import { AuroraBackground } from "@/components/effects/aurora-background";
import { FloatingTechIcons } from "@/components/home/floating-tech-icons";
import { TypingIntroduction } from "@/components/home/typing-introduction";
import { CurrentStatus } from "@/components/home/current-status";
import { ScrollIndicator } from "@/components/home/scroll-indicator";
import { StatsPreview } from "@/components/home/stats-preview";
import { AvailabilityBadge } from "@/components/shared/availability-badge";
import { SocialLinks } from "@/components/shared/social-links";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { FadeIn } from "@/components/motion/fade-in";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-children";
import { ProjectCard } from "@/components/projects/project-card";
import { FeaturedTechnologies } from "@/components/shared/featured-technologies";
import { CTABlock } from "@/components/shared/cta-block";
import { getSiteContent } from "@/lib/content/site";
import { getFeaturedProjects } from "@/lib/content/projects";
import { getFeaturedTechnologies } from "@/lib/content/tech-stack";
import { getNow } from "@/lib/content/misc";
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
  const site = getSiteContent(locale);
  const featuredProjects = getFeaturedProjects(locale);
  const featuredTech = getFeaturedTechnologies(6, locale);
  const now = getNow(locale);

  return (
    <>
      <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-20">
        <AuroraBackground />
        <FloatingTechIcons />

        <div className="mx-auto w-full max-w-4xl px-6 py-24 text-center">
          <FadeIn className="flex flex-col items-center gap-6">
            <AvailabilityBadge label={t("hero.availabilityBadge")} />

            <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
              {site.name}
            </h1>

            <p className="min-h-[2.5em] text-2xl font-medium sm:text-3xl">
              <TypingIntroduction titles={site.titles} />
            </p>

            <p className="max-w-xl text-lg text-[var(--muted-foreground)]">
              {site.tagline}
            </p>

            <CurrentStatus status={now.heroStatus} />

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton>
                <Button size="lg" asChild>
                  <Link href="/resume">
                    <FileDown className="h-4 w-4" />
                    {t("common.downloadResume")}
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/projects">
                    {t("nav.projects")}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">
                    <MessageCircle className="h-4 w-4" />
                    {t("common.getInTouch")}
                  </Link>
                </Button>
              </MagneticButton>
            </div>

            <SocialLinks socials={site.socials} className="mt-4" />
          </FadeIn>
        </div>

        <ScrollIndicator label={t("hero.scrollHint")} />
      </section>

      <Section className="border-t border-[var(--surface-border)]">
        <StatsPreview
          stats={[
            { value: 2, suffix: "+", label: "Years of experience" },
            { value: 16, suffix: "+", label: "Projects delivered" },
            {
              value: featuredProjects.filter((p) => p.liveUrl).length + 3,
              suffix: "",
              label: "Live products",
            },
            { value: 12, suffix: "+", label: "Mobile apps shipped" },
          ]}
        />
      </Section>

      <Section>
        <SectionHeading
          eyebrow={t("common.featured")}
          title={t("nav.projects")}
          description={site.bio.short}
        />
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeIn className="mt-10 text-center">
          <Button variant="secondary" asChild>
            <Link href="/projects">
              {t("common.viewAll")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </Button>
        </FadeIn>
      </Section>

      <Section className="border-t border-[var(--surface-border)]">
        <SectionHeading eyebrow="Stack" title={t("nav.techStack")} />
        <FadeIn>
          <FeaturedTechnologies technologies={featuredTech} />
        </FadeIn>
      </Section>

      <Section className="border-t border-[var(--surface-border)]">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <SectionHeading
              eyebrow={t("nav.about")}
              title={site.mission}
              className="mb-6"
            />
            <p className="text-[var(--muted-foreground)]">{site.bio.long[0]}</p>
            <Button variant="link" asChild className="mt-4 px-0">
              <Link href="/about">
                {t("common.readMore")}
                <span className="sr-only"> {t("nav.about")}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </Button>
          </FadeIn>
          <FadeIn delay={0.1} className="glass rounded-2xl p-8">
            <ul className="space-y-4">
              {site.values.slice(0, 4).map((value) => (
                <li key={value.title}>
                  <p className="font-medium">{value.title}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {value.description}
                  </p>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Section>

      <Section className="border-t border-[var(--surface-border)]">
        <FadeIn>
          <CTABlock
            title={t("common.getInTouch")}
            description={site.contact.availability.join(" · ")}
          >
            <MagneticButton>
              <Button size="lg" asChild>
                <Link href="/contact">{t("common.sendMessage")}</Link>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button size="lg" variant="secondary" asChild>
                <a href={site.socials.github} target="_blank" rel="noreferrer">
                  <FaGithub className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </MagneticButton>
          </CTABlock>
        </FadeIn>
      </Section>
    </>
  );
}
