import { readJsonDir, readJsonFile } from "./fs-utils";
import { projectSchema, type Project } from "@/lib/schemas/project";

function loadBase(): Project[] {
  const files = readJsonDir<unknown>("projects").filter(
    ({ file }) => !file.includes(".ar."),
  );
  return files
    .map(({ data }) => projectSchema.parse(data))
    .sort((a, b) => Number(b.year) - Number(a.year));
}

export function getAllProjects(locale: string = "en"): Project[] {
  const base = loadBase();
  if (locale === "en") return base;

  return base.map((project) => {
    const override = readJsonFile<Partial<Project>>(
      `projects/${project.slug}.ar.json`,
    );
    return override ? { ...project, ...override } : project;
  });
}

export function getProject(
  slug: string,
  locale: string = "en",
): Project | null {
  return getAllProjects(locale).find((p) => p.slug === slug) ?? null;
}

export function getFeaturedProjects(locale: string = "en"): Project[] {
  return getAllProjects(locale).filter((p) => p.featured);
}

export function getFavoriteProjects(locale: string = "en"): Project[] {
  return getAllProjects(locale).filter((p) => p.favorite);
}

export function getProjectsByCategory(
  category: string,
  locale: string = "en",
): Project[] {
  if (category === "all") return getAllProjects(locale);
  return getAllProjects(locale).filter((p) => p.category === category);
}

export function getAllProjectSlugs(): string[] {
  return loadBase().map((p) => p.slug);
}

export function getShowcaseProjects(locale: string = "en"): Project[] {
  return getAllProjects(locale).filter((p) => p.listing !== "open-source");
}

export function getOpenSourceProjects(locale: string = "en"): Project[] {
  return getAllProjects(locale).filter((p) => p.listing === "open-source");
}
