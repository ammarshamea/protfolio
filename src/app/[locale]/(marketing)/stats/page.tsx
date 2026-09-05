import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Briefcase, Calendar, Globe, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GlassCard } from "@/components/shared/glass-card";
import { TechIcon } from "@/components/shared/tech-icon";
import { FadeIn } from "@/components/motion/fade-in";
import { getAllProjects } from "@/lib/content/projects";
import { getFeaturedTechnologies } from "@/lib/content/tech-stack";
import { getStats } from "@/lib/content/misc";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.stats" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/stats",
    locale,
  });
}

export default async function StatsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const ts = await getTranslations({ locale, namespace: "pages.stats" });
  const projects = getAllProjects(locale);
  const stats = getStats();
  const topTech = getFeaturedTechnologies(3, locale);

  const summary = [
    {
      icon: Briefcase,
      label: ts("projectsDelivered"),
      value: `${projects.length}+`,
    },
    {
      icon: Calendar,
      label: ts("yearsExperience"),
      value: stats.yearsExperience,
    },
    {
      icon: Globe,
      label: ts("liveProducts"),
      value: `${projects.filter((p) => p.liveUrl).length}`,
    },
    {
      icon: Users,
      label: ts("clientsServed"),
      value: `${stats.clientsServed}`,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("nav.stats")}
        title={ts("title")}
        subtitle={ts("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.stats") },
        ]}
      />
      <Section>
        <h2 className="sr-only">{ts("srTitle")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summary.map((item, index) => (
            <FadeIn key={item.label} delay={index * 0.06}>
              <GlassCard hover={false} className="text-center">
                <item.icon
                  aria-hidden="true"
                  className="mx-auto h-6 w-6 text-[var(--accent)]"
                />
                <p className="mt-3 text-3xl font-semibold font-[family-name:var(--font-display)]">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                  {item.label}
                </p>
              </GlassCard>
            </FadeIn>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
            {ts("topTech")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {topTech.map((tech) => (
              <GlassCard key={tech.slug} hover={false}>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--muted)] text-[var(--foreground)]">
                    <TechIcon name={tech.slug} className="h-5 w-5" />
                  </span>
                  <p className="font-semibold">{tech.name}</p>
                </div>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                  {tech.projectSlugs.length === 1
                    ? ts("projectCount", { count: tech.projectSlugs.length })
                    : ts("projectCountPlural", {
                        count: tech.projectSlugs.length,
                      })}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
