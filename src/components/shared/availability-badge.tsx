import { cn } from "@/lib/utils";

export function AvailabilityBadge({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--surface-border)] px-3.5 py-1.5 text-sm font-medium text-[var(--accent-text)]",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success)] opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
      </span>
      {label}
    </div>
  );
}
