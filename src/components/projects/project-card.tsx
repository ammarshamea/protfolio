import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ProjectVisualPanel } from "./project-visual-panel";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/schemas/project";

export function ProjectCard({
  project,
  featuredLayout = false,
}: {
  project: Project;
  featuredLayout?: boolean;
}) {
  const t = useTranslations("common");
  const tp = useTranslations("pages.projects");
  const td = useTranslations("pages.projects.detail");

  return (
    <article
      className={cn(
        "flex h-full min-w-0 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--surface-border)] bg-[var(--surface)] shadow-[var(--shadow-card)]",
        featuredLayout && "lg:flex-row",
      )}
    >
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          "relative block overflow-hidden",
          featuredLayout
            ? "aspect-[16/10] lg:aspect-auto lg:min-h-full lg:w-[48%] lg:shrink-0"
            : "aspect-[16/10]",
        )}
      >
        <ProjectVisualPanel
          project={project}
          className="absolute inset-0 h-full w-full"
          sizes={
            featuredLayout
              ? "(max-width: 1024px) 100vw, 42vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
        />
        <span className="absolute start-4 top-4 rounded-full bg-[var(--surface)]/95 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--accent)]">
          {tp(`categories.${project.category}`)}
        </span>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold leading-snug">
            <Link
              href={`/projects/${project.slug}`}
              className="hover:text-[var(--accent)]"
            >
              {project.title}
            </Link>
          </h3>
          <span className="shrink-0 text-sm tabular-nums text-[var(--muted-foreground)]">
            {project.year}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
          {project.tagline}
        </p>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div className="min-w-0">
            <dt className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted-foreground)]">
              {td("role")}
            </dt>
            <dd className="mt-1 font-medium">{project.role}</dd>
          </div>
          <div className="min-w-0">
            <dt className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted-foreground)]">
              {td("duration")}
            </dt>
            <dd className="mt-1 font-medium">{project.duration}</dd>
          </div>
        </dl>
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-[var(--muted)] px-2.5 py-1 text-[11px] font-medium text-[var(--muted-foreground)]"
            >
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-4 pt-1 text-sm font-medium">
          <Link
            href={`/projects/${project.slug}`}
            className="text-[var(--accent)] hover:underline"
          >
            {t("viewCaseStudy")}
          </Link>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[var(--accent)]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {t("liveDemo")}
            </a>
          ) : null}
          {project.featured ? (
            <span className="ms-auto text-[11px] uppercase tracking-[0.08em] text-[var(--accent)]">
              {t("featured")}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
