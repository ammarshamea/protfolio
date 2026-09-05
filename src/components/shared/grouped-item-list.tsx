import { ExternalLink } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { TechIcon } from "@/components/shared/tech-icon";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-children";

interface GroupedItem {
  category: string;
  name: string;
  description: string;
  url?: string;
}

/** Renders items grouped by category — shared by /uses, /uses/setup, /toolbox, and /favorites. */
export function GroupedItemList({
  items,
  categoryLabels,
}: {
  items: GroupedItem[];
  categoryLabels?: Record<string, string>;
}) {
  const groups = items.reduce<Record<string, GroupedItem[]>>((acc, item) => {
    acc[item.category] = acc[item.category]
      ? [...acc[item.category], item]
      : [item];
    return acc;
  }, {});

  return (
    <div className="space-y-12">
      {Object.entries(groups).map(([category, groupItems]) => (
        <div key={category}>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
            {categoryLabels?.[category] ?? category}
          </h2>
          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groupItems.map((item) => (
              <StaggerItem key={item.name}>
                <GlassCard className={item.url ? "group h-full" : "h-full"}>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--muted)] text-[var(--foreground)]">
                    <TechIcon name={item.name} className="h-5 w-5" />
                  </div>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start justify-between gap-2"
                    >
                      <h3 className="font-semibold group-hover:text-[var(--accent-text)]">
                        {item.name}
                      </h3>
                      <ExternalLink
                        aria-hidden="true"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--muted-foreground)]"
                      />
                    </a>
                  ) : (
                    <h3 className="font-semibold">{item.name}</h3>
                  )}
                  <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                    {item.description}
                  </p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      ))}
    </div>
  );
}
