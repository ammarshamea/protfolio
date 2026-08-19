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
        "glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium",
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success)] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--success)]" />
      </span>
      {label}
    </div>
  );
}
