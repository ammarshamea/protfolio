import { getShowcaseProjects, getOpenSourceProjects } from "./projects";
import { getStats } from "./misc";

/**
 * Single source of truth for every headline number on the site
 * (hero, stats strip, projects eyebrow, /stats).
 */
export function getPortfolioMetrics(locale: string = "en") {
  const showcase = getShowcaseProjects(locale);
  const openSource = getOpenSourceProjects(locale);
  const stats = getStats();
  const years = Number.parseInt(stats.yearsExperience, 10) || 2;

  return {
    projectsDelivered: showcase.length,
    liveProducts: showcase.filter((project) => Boolean(project.liveUrl)).length,
    mobileApps: showcase.filter((project) => project.category === "mobile")
      .length,
    openSource: openSource.length,
    yearsExperience: years,
    yearsExperienceLabel: stats.yearsExperience,
    clientsServed: stats.clientsServed,
  };
}

export type PortfolioMetrics = ReturnType<typeof getPortfolioMetrics>;
