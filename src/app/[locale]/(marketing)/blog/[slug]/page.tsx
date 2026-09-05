import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/shared/json-ld";
import { MdxContent } from "@/components/blog/mdx-content";
import { ReadingProgressBar } from "@/components/blog/reading-progress-bar";
import { getAllPosts, getPost } from "@/lib/content/blog";
import {
  generatePageMetadata,
  blogPostingJsonLd,
  breadcrumbJsonLd,
  absoluteUrl,
} from "@/lib/seo";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return generatePageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    locale,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <>
      <ReadingProgressBar />
      <PageHeader
        locale={locale}
        eyebrow={`${post.category} · ${t("common.readingTime", { minutes: post.readingTime })}`}
        title={post.title}
        subtitle={post.description}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.blog"), href: "/blog" },
          { label: post.title },
        ]}
      />
      <Section rhythm="compact">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-[var(--muted-foreground)]">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span aria-hidden="true">&middot;</span>
            <span>
              {t("common.readingTime", { minutes: post.readingTime })}
            </span>
          </div>

          <article>
            <MdxContent source={post.content} />
          </article>

          {post.tags.length > 0 ? (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-[var(--surface-border)] pt-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}

          <div className="mt-6">
            <Link
              href="/blog"
              className="text-sm font-medium text-[var(--accent-text)] hover:underline"
            >
              {t("common.backToBlog")}
            </Link>
          </div>
        </div>
      </Section>

      <JsonLd data={blogPostingJsonLd(post, locale)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("nav.home"), url: absoluteUrl(`/${locale}`) },
          { name: t("nav.blog"), url: absoluteUrl(`/${locale}/blog`) },
          { name: post.title, url: absoluteUrl(`/${locale}/blog/${slug}`) },
        ])}
      />
    </>
  );
}
