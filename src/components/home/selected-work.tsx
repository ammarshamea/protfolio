import { Link } from "@/i18n/navigation";
import { SectionLabel } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectVisualPanel } from "@/components/projects/project-visual-panel";
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
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionLabel index={2} label={eyebrow} className="mb-4" />
          <h2 className="max-w-xl font-[family-name:var(--font-display)] text-[length:var(--text-h1)] font-semibold leading-[0.95] tracking-tight text-[var(--cream,#ffeec8)]">
            {title}
          </h2>
        </div>
        <Button variant="outline" asChild>
          <Link href="/projects">
            {viewAllLabel} ({viewAllCount})
          </Link>
        </Button>
      </div>

      <div className="grid gap-10 lg:gap-14">
        {lead ? (
          <FadeIn>
            <Link href={`/projects/${lead.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden border border-[var(--surface-border)] sm:aspect-[21/9]">
                <ProjectVisualPanel
                  project={lead}
                  priority
                  className="absolute inset-0 h-full w-full"
                  sizes="100vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--background)]/85 via-[var(--background)]/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-8">
                  <div className="max-w-2xl">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-text)]">
                      {lead.year}
                    </p>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] font-semibold leading-[0.95] tracking-tight text-[var(--cream,#ffeec8)]">
                      {lead.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm text-[var(--muted-foreground)] sm:text-base">
                      {lead.tagline}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </FadeIn>
        ) : null}
        {rest.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-12">
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
