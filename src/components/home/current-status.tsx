import { Sparkles } from "lucide-react";

export function CurrentStatus({ status }: { status: string }) {
  return (
    <div className="glass inline-flex max-w-full items-center gap-2 rounded-full px-4 py-2 text-sm text-[var(--muted-foreground)]">
      <Sparkles className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
      <span className="truncate">{status}</span>
    </div>
  );
}
