import { readJsonDir, readJsonFile } from "./fs-utils";
import { technologySchema, type Technology } from "@/lib/schemas/tech";

function loadBase(): Technology[] {
  const files = readJsonDir<unknown>("tech-stack").filter(
    ({ file }) => !file.includes(".ar."),
  );
  return files
    .map(({ data }) => technologySchema.parse(data))
    .sort((a, b) => b.proficiency - a.proficiency);
}

function withLocale(base: Technology[], locale: string): Technology[] {
  if (locale === "en") return base;

  return base.map((tech) => {
    const override = readJsonFile<Partial<Technology>>(
      `tech-stack/${tech.slug}.ar.json`,
    );
    return override ? { ...tech, ...override } : tech;
  });
}

export function getAllTechnologies(locale: string = "en"): Technology[] {
  return withLocale(loadBase(), locale);
}

export function getTechnology(
  slug: string,
  locale: string = "en",
): Technology | null {
  return getAllTechnologies(locale).find((t) => t.slug === slug) ?? null;
}

export function getFeaturedTechnologies(
  limit = 6,
  locale: string = "en",
): Technology[] {
  return [...getAllTechnologies(locale)]
    .sort((a, b) => b.projectSlugs.length - a.projectSlugs.length)
    .slice(0, limit);
}

export function getTechnologiesByCategory(
  category: string,
  locale: string = "en",
): Technology[] {
  return getAllTechnologies(locale).filter((t) => t.category === category);
}

export function getAllTechSlugs(): string[] {
  return loadBase().map((t) => t.slug);
}
