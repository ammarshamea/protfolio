export function CurrentStatus({ status }: { status: string }) {
  return (
    <div className="inline-flex max-w-full items-center gap-2.5 text-[13px] text-[var(--atmosphere-muted,var(--muted-foreground))]">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--signal,var(--accent))]"
      />
      <span className="truncate">{status}</span>
    </div>
  );
}
