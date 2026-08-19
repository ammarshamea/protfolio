import { GlassCard } from "@/components/shared/glass-card";
import { ProjectCover } from "@/components/shared/project-cover";
import { TechStack } from "@/components/shared/tech-stack";
import type { Project } from "@/lib/schemas/project";

function ProjectColumn({ project }: { project: Project }) {
  return (
    <GlassCard hover={false} className="flex h-full flex-col gap-4">
      <ProjectCover
        title={project.title}
        stack={project.stack}
        coverImage={project.coverImage}
      />
      <h2 className="text-lg font-semibold font-[family-name:var(--font-display)]">
        {project.title}
      </h2>
      <dl className="space-y-3 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
            Role
          </dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
            Duration
          </dt>
          <dd>{project.duration}</dd>
        </div>
        <div>
          <dt className="mb-2 text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
            Stack
          </dt>
          <dd>
            <TechStack technologies={project.stack} />
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
            Features
          </dt>
          <dd className="mt-1 space-y-1 text-[var(--muted-foreground)]">
            {project.features.slice(0, 4).map((f) => (
              <p key={f}>&bull; {f}</p>
            ))}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
            Results
          </dt>
          <dd className="mt-1 space-y-1 text-[var(--muted-foreground)]">
            {project.results.map((r) => (
              <p key={r}>&bull; {r}</p>
            ))}
          </dd>
        </div>
      </dl>
    </GlassCard>
  );
}

export function ProjectComparison({
  projectA,
  projectB,
}: {
  projectA: Project;
  projectB: Project;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <ProjectColumn project={projectA} />
      <ProjectColumn project={projectB} />
    </div>
  );
}
