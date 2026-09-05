"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GlassCard } from "@/components/shared/glass-card";
import { TechIcon } from "@/components/shared/tech-icon";
import type { Technology } from "@/lib/schemas/tech";

export function FeaturedTechnologies({
  technologies,
}: {
  technologies: Technology[];
}) {
  const ts = useTranslations("pages.skills");

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {technologies.map((tech) => (
        <Link key={tech.slug} href={`/stack/${tech.slug}`}>
          <GlassCard
            padding="sm"
            className="flex h-full flex-col items-center justify-center gap-2 py-6 text-center"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--muted)] text-[var(--foreground)]">
              <TechIcon name={tech.slug} className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium">{tech.name}</span>
            <span className="text-xs text-[var(--muted-foreground)]">
              {tech.yearsOfExperience}
              {ts("yearsSuffix")}
            </span>
          </GlassCard>
        </Link>
      ))}
    </div>
  );
}
