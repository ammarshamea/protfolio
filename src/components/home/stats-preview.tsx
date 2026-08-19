import { AnimatedCounter } from "@/components/shared/animated-counter";

export function StatsPreview({
  stats,
}: {
  stats: { value: number; suffix: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
      {stats.map((stat) => (
        <AnimatedCounter key={stat.label} {...stat} />
      ))}
    </div>
  );
}
