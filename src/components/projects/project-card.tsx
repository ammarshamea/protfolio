import { useTranslations } from "next-intl";
import { ArrowUpRight, Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { GlassCard } from "@/components/shared/glass-card";
import { ProjectCover } from "@/components/shared/project-cover";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/schemas/project";

export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("common");

  return (
    <GlassCard
      padding="sm"
      className="group flex h-full flex-col overflow-hidden"
    >
      <Link href={`/projects/${project.slug}`} className="flex h-full flex-col">
        <div className="relative overflow-hidden rounded-xl">
          <div className="transition-transform duration-500 group-hover:scale-105">
            <ProjectCover
              title={project.title}
              stack={project.stack}
              coverImage={project.coverImage}
            />
          </div>
          <div className="absolute right-3 top-3 flex gap-2 rtl:right-auto rtl:left-3">
            {project.featured ? (
              <Badge variant="accent">{t("featured")}</Badge>
            ) : null}
            {project.favorite ? (
              <Badge variant="warning">
                <Star className="h-3 w-3" /> {t("favorite")}
              </Badge>
            ) : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold font-[family-name:var(--font-display)]">
              {project.title}
            </h3>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--muted-foreground)] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 rtl:group-hover:-translate-x-1 rtl:rotate-[-90deg]" />
          </div>
          <p className="mt-2 line-clamp-2 flex-1 text-sm text-[var(--muted-foreground)]">
            {project.tagline}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="outline" className="text-[11px]">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </GlassCard>
  );
}
