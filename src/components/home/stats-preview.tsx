import { AnimatedCounter } from "@/components/shared/animated-counter";

export function StatsPreview({
  stats,
}: {
  stats: { value: number; suffix: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[var(--radius-lg)] border border-[var(--surface-border)] bg-[var(--surface)] px-5 py-6 shadow-[var(--shadow-card)]"
        >
          <AnimatedCounter {...stat} />
        </div>
      ))}
    </div>
  );
}
