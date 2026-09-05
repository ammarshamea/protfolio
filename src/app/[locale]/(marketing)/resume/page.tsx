import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GlassCard } from "@/components/shared/glass-card";
import { TechStack } from "@/components/shared/tech-stack";
import { QRCodeDisplay } from "@/components/resume/qr-code-display";
import { VCardDownload } from "@/components/resume/vcard-download";
import { PrintButton } from "@/components/resume/print-button";
import { CopyButton } from "@/components/shared/copy-button";
import { getSiteContent } from "@/lib/content/site";
import { getExperience } from "@/lib/content/misc";
import { getFeaturedProjects } from "@/lib/content/projects";
import { getAllTechnologies } from "@/lib/content/tech-stack";
import { generatePageMetadata, absoluteUrl } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const site = getSiteContent(locale);
  return generatePageMetadata({
    title: t("nav.resume"),
    description: site.bio.short,
    path: "/resume",
    locale,
  });
}

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const site = getSiteContent(locale);
  const experience = getExperience(locale);
  const projects = getFeaturedProjects(locale);
  const technologies = getAllTechnologies(locale).slice(0, 12);
  const resumeUrl = absoluteUrl(`/${locale}/resume`);

  return (
    <>
      <PageHeader
        eyebrow={t("nav.resume")}
        title={site.name}
        subtitle={site.titles.join(" · ")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.resume") },
        ]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <GlassCard hover={false}>
              <h2 className="mb-3 text-lg font-semibold font-[family-name:var(--font-display)]">
                {t("resume.summary")}
              </h2>
              <p className="text-[var(--muted-foreground)]">
                {site.bio.long[0]}
              </p>
            </GlassCard>

            <div>
              <h2 className="mb-4 text-lg font-semibold font-[family-name:var(--font-display)]">
                {t("resume.experience")}
              </h2>
              <div className="space-y-6">
                {experience.map((job) => (
                  <GlassCard key={job.company} hover={false}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-semibold">
                        {job.role} &middot; {job.company}
                      </h3>
                      <span className="text-sm text-[var(--muted-foreground)]">
                        {job.year}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {job.responsibilities.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm text-[var(--muted-foreground)]"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <TechStack technologies={job.technologies} />
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-lg font-semibold font-[family-name:var(--font-display)]">
                {t("resume.skills")}
              </h2>
              <TechStack technologies={technologies.map((t) => t.name)} />
            </div>

            <div>
              <h2 className="mb-4 text-lg font-semibold font-[family-name:var(--font-display)]">
                {t("resume.projects")}
              </h2>
              <div className="space-y-3">
                {projects.map((project) => (
                  <GlassCard key={project.slug} hover={false} padding="sm">
                    <p className="font-medium">{project.title}</p>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {project.tagline}
                    </p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6 no-print">
            <GlassCard
              hover={false}
              className="flex flex-col items-center gap-4 text-center"
            >
              <QRCodeDisplay url={resumeUrl} />
              <p className="text-xs text-[var(--muted-foreground)]">
                {t("resume.scanToView")}
              </p>
            </GlassCard>

            <GlassCard hover={false}>
              <div className="mb-5 flex justify-center">
                <Image
                  src={site.portrait}
                  alt={site.name}
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-full object-cover object-[center_18%] ring-2 ring-[var(--surface-border)]"
                />
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[var(--accent)]" />{" "}
                  {site.contact.email}
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-[var(--accent)]" />{" "}
                  {site.contact.whatsapp}
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[var(--accent)]" />{" "}
                  {site.location}
                </li>
              </ul>

              <div className="mt-6 flex flex-col gap-3 border-t border-[var(--surface-border)] pt-6">
                <CopyButton
                  value={site.contact.email}
                  label={t("common.copyEmail")}
                  copiedLabel={t("common.emailCopied")}
                />
                <VCardDownload
                  name={site.name}
                  email={site.contact.email}
                  phone={site.contact.whatsapp}
                  url={resumeUrl}
                  title={site.titles[0]}
                  label={t("resume.downloadVCard")}
                />
                <PrintButton label={t("resume.printResume")} />
              </div>
            </GlassCard>
          </aside>
        </div>
      </Section>
    </>
  );
}
