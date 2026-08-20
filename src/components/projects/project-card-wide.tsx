import { Link } from "@/i18n/navigation";
import { ProjectVisualPanel } from "./project-visual-panel";
import type { Project } from "@/lib/schemas/project";
import { cn } from "@/lib/utils";

export function ProjectCardWide({
  project,
  categoryLabel,
  reverse = false,
}: {
  project: Project;
  categoryLabel: string;
  reverse?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group grid gap-6 sm:grid-cols-2 sm:items-center sm:gap-10"
    >
      <ProjectVisualPanel
        project={project}
        className={cn(
          "aspect-[4/3] transition-transform duration-500 ease-out group-hover:scale-[1.02]",
          reverse && "sm:order-2",
        )}
      />
      <div className={cn("flex flex-col gap-3", reverse && "sm:order-1")}>
        <span className="text-[length:var(--text-label)] uppercase tracking-[0.15em] opacity-45">
          {project.year} — {categoryLabel}
        </span>
        <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          {project.title}
        </h3>
        <p className="max-w-md text-sm opacity-70">{project.tagline}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.1em] opacity-45">
          {project.stack.slice(0, 4).join(" · ")}
        </p>
      </div>
    </Link>
  );
}
