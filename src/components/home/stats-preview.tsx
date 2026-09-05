import { AnimatedCounter } from "@/components/shared/animated-counter";

export function StatsPreview({
  stats,
}: {
  stats: { value: number; suffix: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-px bg-[var(--surface-border)] lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-[var(--background)] px-5 py-7">
          <AnimatedCounter {...stat} />
        </div>
      ))}
    </div>
  );
}
