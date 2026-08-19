import { Inbox, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  className,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass flex flex-col items-center gap-4 rounded-2xl px-8 py-16 text-center",
        className,
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div>
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="mt-2 max-w-sm text-sm text-[var(--muted-foreground)]">
          {description}
        </p>
      </div>
    </div>
  );
}
