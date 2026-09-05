"use client";

import { useSearchParams } from "next/navigation";
import { ProjectComparison } from "@/components/projects/project-comparison";
import { CompareSelector } from "@/components/projects/compare-selector";
import { EmptyState } from "@/components/shared/empty-state";
import type { Project } from "@/lib/schemas/project";

export function CompareProjectsView({
  projects,
  emptyTitle,
  emptyDescription,
}: {
  projects: Project[];
  emptyTitle: string;
  emptyDescription: string;
}) {
  const searchParams = useSearchParams();
  const a = searchParams.get("a") ?? undefined;
  const b = searchParams.get("b") ?? undefined;
  const projectA = projects.find((p) => p.slug === a) ?? projects[0];
  const projectB = projects.find((p) => p.slug === b) ?? projects[1];

  return (
    <>
      <CompareSelector
        projects={projects.map((p) => ({ slug: p.slug, title: p.title }))}
        selectedA={projectA?.slug}
        selectedB={projectB?.slug}
      />
      {projectA && projectB ? (
        <ProjectComparison projectA={projectA} projectB={projectB} />
      ) : (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      )}
    </>
  );
}
