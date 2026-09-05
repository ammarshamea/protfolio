import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-children";
import { getAllPosts } from "@/lib/content/blog";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.blog" });
  const metadata = generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/blog",
    locale,
  });
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      types: { "application/rss+xml": "/feed.xml" },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const tb = await getTranslations({ locale, namespace: "pages.blog" });
  const posts = getAllPosts();

  return (
    <>
      <PageHeader
        eyebrow={`${t("nav.blog")} · ${posts.length}`}
        title={tb("title")}
        subtitle={tb("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.blog") },
        ]}
      />
      <Section>
        {posts.length === 0 ? (
          <EmptyState
            title={tb("emptyTitle")}
            description={tb("emptyDescription")}
          />
        ) : (
          <>
            <h2 className="sr-only">{tb("srTitle")}</h2>
            <StaggerContainer className="mx-auto grid max-w-3xl gap-6">
              {posts.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>
                    <GlassCard>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted-foreground)]">
                        <Badge variant="accent">{post.category}</Badge>
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString(locale, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                        <span aria-hidden="true">&middot;</span>
                        <span>
                          {t("common.readingTime", {
                            minutes: post.readingTime,
                          })}
                        </span>
                      </div>
                      <h3 className="mt-3 text-xl font-semibold font-[family-name:var(--font-display)]">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                        {post.description}
                      </p>
                      {post.tags.length > 0 ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      ) : null}
                    </GlassCard>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </>
        )}
      </Section>
    </>
  );
}
