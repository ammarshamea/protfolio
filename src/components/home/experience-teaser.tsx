import { Link } from "@/i18n/navigation";
import { SectionLabel } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import type { TimelineItem } from "@/lib/schemas/misc";

export function ExperienceTeaser({
  items,
  eyebrow,
  title,
  moreLabel,
}: {
  items: TimelineItem[];
  eyebrow: string;
  title: string;
  moreLabel: string;
}) {
  return (
    <div>
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionLabel index={5} label={eyebrow} className="mb-4" />
          <h2 className="max-w-lg font-[family-name:var(--font-display)] text-[length:var(--text-h1)] font-semibold leading-[0.95] tracking-tight text-[var(--cream,#ffeec8)]">
            {title}
          </h2>
        </div>
        <Button variant="secondary" asChild>
          <Link href="/timeline">{moreLabel}</Link>
        </Button>
      </div>
      <div className="grid gap-4">
        {items.map((item) => (
          <article
            key={`${item.year}-${item.title}`}
            className="grid gap-3 border-t border-[var(--surface-border)] py-5 sm:grid-cols-12 sm:items-start"
          >
            <span className="font-[family-name:var(--font-display)] text-lg font-semibold tabular-nums text-[var(--accent)] sm:col-span-2">
              {item.year}
            </span>
            <h3 className="font-semibold sm:col-span-3">{item.title}</h3>
            <p className="text-sm leading-relaxed text-[var(--muted-foreground)] sm:col-span-7">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
