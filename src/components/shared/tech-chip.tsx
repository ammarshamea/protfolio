import { cn } from "@/lib/utils";
import { TechIcon } from "./tech-icon";

export function TechChip({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[var(--radius)] border border-[var(--surface-border)] px-2.5 py-1 text-[11px] font-medium text-[var(--muted-foreground)]",
        className,
      )}
    >
      <TechIcon name={name} className="h-3.5 w-3.5" />
      {name}
    </span>
  );
}

export function TechChipList({
  items,
  limit,
  className,
}: {
  items: string[];
  limit?: number;
  className?: string;
}) {
  const shown = limit ? items.slice(0, limit) : items;
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {shown.map((tech) => (
        <li key={tech}>
          <TechChip name={tech} />
        </li>
      ))}
    </ul>
  );
}
