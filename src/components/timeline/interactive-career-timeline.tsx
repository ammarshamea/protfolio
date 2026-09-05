import { FadeIn } from "@/components/motion/fade-in";
import { GlassCard } from "@/components/shared/glass-card";
import type { TimelineItem } from "@/lib/schemas/misc";

export function InteractiveCareerTimeline({
  items,
}: {
  items: TimelineItem[];
}) {
  return (
    <div className="relative">
      <div
        className="absolute bottom-4 start-4 top-4 w-px bg-[var(--surface-border)] sm:start-1/2"
        aria-hidden="true"
      />
      <div className="space-y-16">
        {items.map((item, index) => (
          <FadeIn
            key={item.year}
            delay={index * 0.04}
            className={`relative flex flex-col gap-6 ps-12 sm:ps-0 ${
              index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
            }`}
          >
            <span className="absolute start-2 top-1 flex h-5 w-5 items-center justify-center rounded-full border-4 border-[var(--background)] bg-[var(--accent)] sm:start-1/2 sm:-translate-x-1/2 rtl:sm:translate-x-1/2" />

            <div className="sm:w-1/2" />
            <div className="sm:w-1/2">
              <GlassCard>
                <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent-text)]">
                  {item.year}
                </p>
                <h2 className="mt-1 text-lg font-semibold font-[family-name:var(--font-display)]">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                  {item.description}
                </p>
                {item.highlights.length > 0 ? (
                  <ul className="mt-4 space-y-1.5">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-2 text-sm text-[var(--muted-foreground)]"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </GlassCard>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
