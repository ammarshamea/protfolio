import { getAllProjects } from "@/lib/content/projects";
import { getAllTechnologies } from "@/lib/content/tech-stack";
import { allNavItems } from "@/lib/navigation";
import type { SearchItem } from "./search";

/** Server-only: reads content collections from disk. Never import this from a client component. */
export function buildSearchIndex(locale: string): SearchItem[] {
  const projects: SearchItem[] = getAllProjects(locale).map((project) => ({
    id: `project-${project.slug}`,
    title: project.title,
    subtitle: project.tagline,
    href: `/${locale}/projects/${project.slug}`,
    group: "projects",
  }));

  const technologies: SearchItem[] = getAllTechnologies(locale).map((tech) => ({
    id: `tech-${tech.slug}`,
    title: tech.name,
    subtitle: `${tech.yearsOfExperience}+ years`,
    href: `/${locale}/stack/${tech.slug}`,
    group: "technologies",
  }));

  const pages: SearchItem[] = allNavItems.map((item) => ({
    id: `page-${item.key}`,
    title: item.key,
    href: `/${locale}${item.href}`,
    group: "pages",
  }));

  return [...projects, ...technologies, ...pages];
}
