import { Link } from "@/i18n/navigation";
import { SectionLabel } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";
import { FadeIn } from "@/components/motion/fade-in";
import type { Project } from "@/lib/schemas/project";

export function SelectedWork({
  projects,
  eyebrow,
  title,
  viewAllLabel,
  viewAllCount,
}: {
  projects: Project[];
  eyebrow: string;
  title: string;
  viewAllLabel: string;
  viewAllCount: number;
}) {
  const [lead, ...rest] = projects;

  return (
    <div>
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionLabel index={2} label={eyebrow} className="mb-4" />
          <h2 className="max-w-xl font-[family-name:var(--font-display)] text-[length:var(--text-h1)] font-semibold tracking-tight">
            {title}
          </h2>
        </div>
        <Button variant="secondary" asChild>
          <Link href="/projects">
            {viewAllLabel} ({viewAllCount})
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {lead ? (
          <FadeIn>
            <ProjectCard project={lead} featuredLayout priority />
          </FadeIn>
        ) : null}
        {rest.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((project, index) => (
              <FadeIn key={project.slug} delay={index * 0.04}>
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
