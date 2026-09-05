import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllProjectSlugs } from "@/lib/content/projects";
import { getAllTechSlugs } from "@/lib/content/tech-stack";
import { getAllPosts } from "@/lib/content/blog";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

/** Static routes that currently have a page implemented. Extend as new pages ship. */
const builtStaticPaths: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/projects", priority: 0.9 },
  { path: "/projects/favorites", priority: 0.6 },
  { path: "/projects/compare", priority: 0.5 },
  { path: "/timeline", priority: 0.7 },
  { path: "/skills", priority: 0.7 },
  { path: "/tech-stack", priority: 0.7 },
  { path: "/resume", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
  { path: "/services", priority: 0.7 },
  { path: "/experience", priority: 0.7 },
  { path: "/blog", priority: 0.7 },
  { path: "/open-source", priority: 0.5 },
  { path: "/uses", priority: 0.5 },
  { path: "/uses/setup", priority: 0.4 },
  { path: "/now", priority: 0.5 },
  { path: "/roadmap", priority: 0.5 },
  { path: "/reading", priority: 0.4 },
  { path: "/toolbox", priority: 0.4 },
  { path: "/playground", priority: 0.5 },
  { path: "/lab", priority: 0.5 },
  { path: "/favorites", priority: 0.4 },
  { path: "/stats", priority: 0.5 },
  { path: "/speaking", priority: 0.3 },
  { path: "/press", priority: 0.3 },
  { path: "/changelog", priority: 0.4 },
  { path: "/sitemap-page", priority: 0.3 },
  { path: "/api-docs", priority: 0.2 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

function localizedEntries(
  path: string,
  priority: number,
): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    lastModified: new Date(),
    priority,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
      ),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = builtStaticPaths.flatMap(({ path, priority }) =>
    localizedEntries(path, priority),
  );

  const projectPages = getAllProjectSlugs().flatMap((slug) =>
    localizedEntries(`/projects/${slug}`, 0.8),
  );

  const techPages = getAllTechSlugs().flatMap((slug) =>
    localizedEntries(`/stack/${slug}`, 0.6),
  );

  const blogPages = getAllPosts().flatMap((post) =>
    localizedEntries(`/blog/${post.slug}`, 0.6),
  );

  return [...staticPages, ...projectPages, ...techPages, ...blogPages];
}
