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

export interface TechDomainSummary {
  category: Technology["category"];
  count: number;
}

/**
 * Groups the real tech-stack content into domains with a real count per group,
 * computed via a single `reduce`. Every place that shows "N technologies" per
 * domain (the Fast CV summary, the /tech-stack overview) calls this same
 * function so the numbers never drift apart on different pages.
 */
export function getTechDomainSummary(locale: string = "en"): TechDomainSummary[] {
  const counts = getAllTechnologies(locale).reduce<Record<string, number>>(
    (acc, tech) => {
      acc[tech.category] = (acc[tech.category] ?? 0) + 1;
      return acc;
    },
    {},
  );

  return Object.entries(counts)
    .map(([category, count]) => ({
      category: category as Technology["category"],
      count,
    }))
    .sort((a, b) => b.count - a.count);
}
