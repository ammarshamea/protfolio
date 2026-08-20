import { Link } from "@/i18n/navigation";
import { ProjectVisualPanel } from "./project-visual-panel";
import type { Project } from "@/lib/schemas/project";
import { cn } from "@/lib/utils";

export function ProjectCardEditorial({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <Link href={`/projects/${project.slug}`} className={cn("group block", className)}>
      <ProjectVisualPanel
        project={project}
        className="aspect-[3/4] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
      />
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="font-[family-name:var(--font-display)] text-base font-semibold leading-snug">
          {project.title}
        </h3>
        <span className="shrink-0 text-xs opacity-45">{project.year}</span>
      </div>
      <p className="mt-1 text-xs uppercase tracking-[0.08em] opacity-45">
        {project.stack.slice(0, 2).join(" · ")}
      </p>
    </Link>
  );
}
