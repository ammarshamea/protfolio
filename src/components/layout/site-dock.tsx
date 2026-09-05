import { getLocale, getTranslations } from "next-intl/server";
import { AppDock } from "@/components/home/shell/app-dock";
import { getSiteContent } from "@/lib/content/site";
import { getFeaturedProjects } from "@/lib/content/projects";
import { getTechDomainSummary } from "@/lib/content/tech-stack";

/** Server wrapper that feeds the global dock real Fast CV content on every page. */
export async function SiteDock() {
  const locale = await getLocale();
  const t = await getTranslations({ locale });
  const site = getSiteContent(locale);
  const featuredProjects = getFeaturedProjects(locale);
  const domains = getTechDomainSummary(locale);
  const whatsappHref = `${site.socials.whatsapp}?text=${encodeURIComponent(t("hero.whatsappMessage"))}`;

  return (
    <AppDock
      fastCv={{
        name: site.name,
        tagline: site.tagline,
        summary: site.bio.short,
        domains,
        projects: featuredProjects.slice(0, 3),
        whatsappHref,
      }}
    />
  );
}
