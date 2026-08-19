"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

export function CompareSelector({
  projects,
  selectedA,
  selectedB,
}: {
  projects: { slug: string; title: string }[];
  selectedA?: string;
  selectedB?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: "a" | "b", value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2">
      {(["a", "b"] as const).map((key) => (
        <select
          key={key}
          aria-label={
            key === "a"
              ? "First project to compare"
              : "Second project to compare"
          }
          value={key === "a" ? selectedA : selectedB}
          onChange={(event) => updateParam(key, event.target.value)}
          className="h-11 w-full rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          {projects.map((project) => (
            <option key={project.slug} value={project.slug}>
              {project.title}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}
