import Image from "next/image";

interface PortraitStat {
  value: string;
  label: string;
}

/**
 * Framed hero portrait with optional floating stat chips. Stats must come from
 * real derived data (project counts, live products, etc.) — never a decorative
 * 5.0-style rating, matching the a11y/proof bar this shell is held to.
 */
export function FramedPortrait({
  src,
  alt,
  stats = [],
}: {
  src: string;
  alt: string;
  stats?: PortraitStat[];
}) {
  return (
    <div className="relative pb-8 sm:pb-10">
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-[2rem] bg-[var(--accent)]/10 blur-3xl sm:-inset-8"
      />
      <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--surface-border)] shadow-[var(--shadow-card)]">
        <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            className="object-cover object-[center_18%]"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
      </div>

      {stats.length > 0 ? (
        <dl className="absolute inset-x-4 bottom-0 flex flex-wrap justify-center gap-3 sm:inset-x-auto sm:start-6 sm:justify-start">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 rounded-[var(--radius-lg)] border border-[var(--surface-border)] bg-[var(--surface)]/95 px-4 py-2.5 shadow-[var(--shadow-card)] backdrop-blur-md"
            >
              <dd className="text-base font-semibold tabular-nums text-[var(--foreground)]">
                {stat.value}
              </dd>
              <dt className="text-xs text-[var(--muted-foreground)]">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}
