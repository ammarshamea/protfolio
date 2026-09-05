import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/schemas/project";

export function ProjectVisualPanel({
  project,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
}: {
  project: Project;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn("relative overflow-hidden bg-[var(--muted)]", className)}
    >
      {project.coverImage ? (
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.035]"
          sizes={sizes}
          priority={priority}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--surface-strong)] px-6 text-center">
          <span className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            {project.title}
          </span>
        </div>
      )}
    </div>
  );
}
