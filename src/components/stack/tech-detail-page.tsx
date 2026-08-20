import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { GlassCard } from "@/components/shared/glass-card";
import { ProjectCover } from "@/components/shared/project-cover";
import type { Technology } from "@/lib/schemas/tech";
import type { Project } from "@/lib/schemas/project";

export async function TechDetailPage({
  technology,
  projects,
  locale,
}: {
  technology: Technology;
  projects: Project[];
  locale: string;
}) {
  const td = await getTranslations({
    locale,
    namespace: "pages.techStack.detail",
  });
  const tc = await getTranslations({ locale, namespace: "pages.categories" });

  return (
    <div className="grid gap-12 lg:grid-cols-3">
      <div className="space-y-8 lg:col-span-2">
        <GlassCard hover={false}>
          <h2 className="mb-2 text-lg font-semibold font-[family-name:var(--font-display)]">
            {td("experience")}
          </h2>
          <p className="text-[var(--muted-foreground)]">
            {technology.experience}
          </p>
        </GlassCard>
        <GlassCard hover={false}>
          <h2 className="mb-2 text-lg font-semibold font-[family-name:var(--font-display)]">
            {td("whyChosen")}
          </h2>
          <p className="text-[var(--muted-foreground)]">
            {technology.whyChosen}
          </p>
        </GlassCard>
        {technology.alternatives.length > 0 ? (
          <GlassCard hover={false}>
            <h2 className="mb-2 text-lg font-semibold font-[family-name:var(--font-display)]">
              {td("alternatives")}
            </h2>
            <p className="text-[var(--muted-foreground)]">
              {technology.alternatives.join(", ")}
            </p>
          </GlassCard>
        ) : null}

        {projects.length > 0 ? (
          <div>
            <h2 className="mb-4 text-lg font-semibold font-[family-name:var(--font-display)]">
              {td("usedIn")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`}>
                  <GlassCard padding="sm">
                    <ProjectCover
                      title={project.title}
                      stack={project.stack}
                      coverImage={project.coverImage}
                      className="mb-3 aspect-[16/9]"
                    />
                    <p className="text-sm font-medium">{project.title}</p>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <aside>
        <GlassCard hover={false}>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                {td("category")}
              </dt>
              <dd className="font-medium">{tc(technology.category)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                {td("experienceLabel")}
              </dt>
              <dd className="font-medium">
                {td("years", { years: technology.yearsOfExperience })}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                {td("proficiency")}
              </dt>
              <dd className="mt-1 h-1.5 w-full overflow-hidden rounded-sm bg-[var(--muted)]">
                <div
                  className="h-full bg-[var(--accent)]"
                  style={{ width: `${(technology.proficiency / 5) * 100}%` }}
                />
              </dd>
            </div>
          </dl>
        </GlassCard>
      </aside>
    </div>
  );
}
