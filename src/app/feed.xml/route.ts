import { getAllPosts } from "@/lib/content/blog";
import { buildRssFeed } from "@/lib/rss";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export function GET() {
  const posts = getAllPosts();
  const feedUrl = absoluteUrl("/feed.xml");

  const xml = buildRssFeed({
    title: "Ammar Shamea — Blog",
    description:
      "Notes on Flutter, Laravel, and full-stack engineering from real client projects.",
    feedUrl,
    siteUrl: SITE_URL,
    items: posts.map((post) => ({
      title: post.title,
      link: absoluteUrl(`/en/blog/${post.slug}`),
      description: post.description,
      pubDate: new Date(post.date).toUTCString(),
      guid: absoluteUrl(`/en/blog/${post.slug}`),
    })),
  });

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
