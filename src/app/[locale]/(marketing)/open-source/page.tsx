import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { FaGithub, FaCodeBranch } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GlassCard } from "@/components/shared/glass-card";
import { GithubActivity } from "@/components/shared/github-activity";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { getSiteContent } from "@/lib/content/site";
import { getGithubProfile } from "@/lib/github";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.openSource" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/open-source",
    locale,
  });
}

export default async function OpenSourcePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const to = await getTranslations({ locale, namespace: "pages.openSource" });
  const site = getSiteContent(locale);
  const githubProfile = await getGithubProfile();

  return (
    <>
      <PageHeader
        eyebrow={t("nav.openSource")}
        title={to("title")}
        subtitle={to("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.openSource") },
        ]}
      />
      <Section>
        <div className="mx-auto max-w-2xl space-y-6">
          <FadeIn>
            <GlassCard hover={false}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                <FaGithub aria-hidden="true" className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-semibold">{to("publicRepos")}</h2>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                {to("publicReposDesc")}
              </p>
              <Button variant="secondary" size="sm" className="mt-4" asChild>
                <a href={site.socials.github} target="_blank" rel="noreferrer">
                  <FaGithub aria-hidden="true" className="h-4 w-4" />{" "}
                  {to("viewGithub")}
                </a>
              </Button>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={0.08}>
            <GlassCard hover={false}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                <FaCodeBranch aria-hidden="true" className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-semibold">{to("codebergMirror")}</h2>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                {to("codebergDesc")}
              </p>
              <Button variant="secondary" size="sm" className="mt-4" asChild>
                <a
                  href={site.socials.codeberg}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaCodeBranch aria-hidden="true" className="h-4 w-4" />{" "}
                  {to("viewCodeberg")}
                </a>
              </Button>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={0.16}>
            <GlassCard hover={false}>
              <h2 className="font-semibold">{to("whatsNext")}</h2>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                {to.rich("whatsNextDesc", {
                  roadmap: (chunks) => (
                    <Link
                      href="/roadmap"
                      className="underline underline-offset-4 hover:text-[var(--accent-text)]"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </GlassCard>
          </FadeIn>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <GithubActivity profile={githubProfile} locale={locale} />
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
