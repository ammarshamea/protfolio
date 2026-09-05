"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./project-card";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-children";
import { EmptyState } from "@/components/shared/empty-state";
import type { Project, ProjectCategory } from "@/lib/schemas/project";
import { cn } from "@/lib/utils";

const CATEGORIES: (ProjectCategory | "all")[] = [
  "all",
  "saas",
  "mobile",
  "web",
  "agency",
  "automation",
  "package",
];

const PAGE_SIZE = 9;

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const t = useTranslations("common");
  const tp = useTranslations("pages.projects");
  const [category, setCategory] = useState<ProjectCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        category === "all" || project.category === category;
      const matchesQuery =
        !query ||
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.stack.some((tech) =>
          tech.toLowerCase().includes(query.toLowerCase()),
        );
      return matchesCategory && matchesQuery;
    });
  }, [projects, category, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <div>
      <div className="mb-12 flex flex-col gap-6 border-b border-[var(--surface-border)] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <nav
          aria-label={tp("srTitle")}
          className="flex flex-wrap gap-x-6 gap-y-2"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
              className={cn(
                "relative pb-3 text-sm font-medium uppercase tracking-[0.06em] transition-colors",
                category === cat
                  ? "text-[var(--foreground)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
              )}
            >
              {tp(`categories.${cat}`)}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 -bottom-px h-px origin-left bg-[var(--foreground)] transition-transform duration-300",
                  category === cat ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          ))}
        </nav>

        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <Input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder={t("searchPlaceholder")}
            className="ps-10 pe-4"
          />
        </div>
      </div>

      {paginated.length === 0 ? (
        <EmptyState title={t("noResults")} description={tp("filterEmpty")} />
      ) : (
        <StaggerContainer
          key={safePage}
          animateOnMount
          className="grid gap-6 sm:grid-cols-2"
        >
          {paginated.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      {totalPages > 1 ? (
        <div className="mt-14 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              variant={safePage === index + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setPage(index + 1)}
              className="h-9 w-9 rounded-[var(--radius-sm)] p-0"
            >
              {index + 1}
            </Button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
