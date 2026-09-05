import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/ui/badge";
import { TechStack } from "@/components/shared/tech-stack";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-children";
import { getPlayground } from "@/lib/content/misc";
import { generatePageMetadata } from "@/lib/seo";

const PLAYGROUND_CATEGORIES = ["flutter", "css", "ai", "component"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.playground" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/playground",
    locale,
  });
}

export default async function PlaygroundPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const tp = await getTranslations({ locale, namespace: "pages.playground" });
  const items = getPlayground(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={`${t("nav.playground")} · ${items.length}`}
        title={tp("title")}
        subtitle={tp("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.playground") },
        ]}
      />
      <Section>
        <h2 className="sr-only">{tp("srTitle")}</h2>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <StaggerItem key={item.slug}>
              <GlassCard className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold">{item.title}</h3>
                  <Badge variant="outline" className="shrink-0">
                    {PLAYGROUND_CATEGORIES.includes(
                      item.category as (typeof PLAYGROUND_CATEGORIES)[number],
                    )
                      ? tp(
                          `categories.${item.category as (typeof PLAYGROUND_CATEGORIES)[number]}`,
                        )
                      : item.category}
                  </Badge>
                </div>
                <p className="mt-2 flex-1 text-sm text-[var(--muted-foreground)]">
                  {item.description}
                </p>
                <TechStack technologies={item.stack} className="mt-4" />
                {item.liveUrl || item.githubUrl ? (
                  <div className="mt-4 flex gap-4 border-t border-[var(--surface-border)] pt-4 text-sm">
                    {item.liveUrl ? (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium hover:text-[var(--accent-text)]"
                      >
                        <ExternalLink
                          aria-hidden="true"
                          className="h-3.5 w-3.5"
                        />{" "}
                        {tp("live")}
                      </a>
                    ) : null}
                    {item.githubUrl ? (
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium hover:text-[var(--accent-text)]"
                      >
                        <FaGithub aria-hidden="true" className="h-3.5 w-3.5" />{" "}
                        {tp("source")}
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>
    </>
  );
}
