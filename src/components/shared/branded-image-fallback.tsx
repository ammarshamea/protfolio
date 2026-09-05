import { cn } from "@/lib/utils";
import { TechChip } from "./tech-chip";

export function BrandedImageFallback({
  title,
  stack,
  className,
}: {
  title: string;
  stack: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex aspect-video w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border border-[var(--surface-border)] bg-[var(--muted)] p-8 text-center",
        className,
      )}
    >
      <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)] sm:text-3xl">
        {title}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {stack.slice(0, 4).map((tech) => (
          <TechChip
            key={tech}
            name={tech}
            className="rounded-md border border-[var(--surface-border)] bg-[var(--surface)] px-3 py-1 text-xs"
          />
        ))}
      </div>
    </div>
  );
}
