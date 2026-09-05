"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { viewportOnce } from "@/lib/animations";
import { TechIcon } from "@/components/shared/tech-icon";
import type { Technology } from "@/lib/schemas/tech";

export function SkillVisualization({
  technologies,
}: {
  technologies: Technology[];
}) {
  const tc = useTranslations("pages.categories");
  const ts = useTranslations("pages.skills");

  const grouped = technologies.reduce<Record<string, Technology[]>>(
    (acc, tech) => {
      acc[tech.category] = acc[tech.category]
        ? [...acc[tech.category], tech]
        : [tech];
      return acc;
    },
    {},
  );

  return (
    <div className="grid gap-10 sm:grid-cols-2">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
            {tc(category)}
          </h2>
          <div className="space-y-4">
            {items.map((tech) => (
              <div key={tech.slug}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-2 font-medium">
                    <TechIcon name={tech.slug} className="h-4 w-4" />
                    {tech.name}
                  </span>
                  <span className="text-[var(--muted-foreground)]">
                    {tech.yearsOfExperience}
                    {ts("yearsSuffix")}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-sm bg-[var(--muted)]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(tech.proficiency / 5) * 100}%` }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-[var(--accent)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
