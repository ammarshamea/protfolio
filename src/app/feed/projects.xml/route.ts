import { getAllProjects } from "@/lib/content/projects";
import { fileMTime } from "@/lib/content/fs-utils";
import { buildRssFeed } from "@/lib/rss";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export function GET() {
  const projects = getAllProjects();
  const feedUrl = absoluteUrl("/feed/projects.xml");

  const xml = buildRssFeed({
    title: "Ammar Shamea — Projects",
    description:
      "New and recently updated Flutter, Laravel, and full-stack projects.",
    feedUrl,
    siteUrl: SITE_URL,
    items: projects.map((project) => {
      const mtime = fileMTime(`projects/${project.slug}.json`) ?? new Date();
      return {
        title: project.title,
        link: absoluteUrl(`/en/projects/${project.slug}`),
        description: project.tagline,
        pubDate: mtime.toUTCString(),
        guid: absoluteUrl(`/en/projects/${project.slug}`),
      };
    }),
  });

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
