import { Link } from "@/i18n/navigation";
import { GlassCard } from "@/components/shared/glass-card";
import type { Technology } from "@/lib/schemas/tech";

export function FeaturedTechnologies({
  technologies,
}: {
  technologies: Technology[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {technologies.map((tech) => (
        <Link key={tech.slug} href={`/stack/${tech.slug}`}>
          <GlassCard
            padding="sm"
            className="flex h-full flex-col items-center justify-center gap-2 py-6 text-center"
          >
            <span className="text-sm font-medium">{tech.name}</span>
            <span className="text-xs text-[var(--muted-foreground)]">
              {tech.yearsOfExperience}+ yrs
            </span>
          </GlassCard>
        </Link>
      ))}
    </div>
  );
}
