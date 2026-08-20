import { Link } from "@/i18n/navigation";
import { ProjectVisualPanel } from "./project-visual-panel";
import { ProjectMeta } from "./project-meta";
import { ScrollScale } from "@/components/motion/scroll-scale";
import type { Project } from "@/lib/schemas/project";

export function ProjectCardFeatured({
  project,
  index,
  roleLabel,
  stackLabel,
}: {
  project: Project;
  index: number;
  roleLabel: string;
  stackLabel: string;
}) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-current/15 pb-5">
        <div className="flex items-baseline gap-4">
          <span className="text-[length:var(--text-label)] tabular-nums opacity-40">
            {String(index).padStart(2, "0")}
          </span>
          <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-h1)] font-semibold leading-none tracking-tight">
            {project.title}
          </h3>
        </div>
        <span className="shrink-0 pb-1 text-sm opacity-50">{project.year}</span>
      </div>

      <ScrollScale>
        <ProjectVisualPanel
          project={project}
          priority
          sizes="(max-width: 768px) 100vw, 90rem"
          className="aspect-[16/10] transition-transform duration-500 ease-out group-hover:scale-[1.02] sm:aspect-[21/9]"
        />
      </ScrollScale>

      <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <p className="max-w-lg text-[length:var(--text-body-lg)] opacity-70">
          {project.tagline}
        </p>
        <ProjectMeta
          fields={[
            { label: roleLabel, value: project.role },
            { label: stackLabel, value: project.stack.slice(0, 4).join(" · ") },
          ]}
          className="sm:justify-end"
        />
      </div>
    </Link>
  );
}
