import type { ReactNode } from "react";
import { FadeIn } from "@/components/motion/fade-in";

export function CaseStudySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <FadeIn className="border-t border-[var(--surface-border)] py-10 first:border-t-0 first:pt-0">
      <h2 className="mb-4 text-xl font-semibold font-[family-name:var(--font-display)]">
        {title}
      </h2>
      {children}
    </FadeIn>
  );
}

export function CaseStudyList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[var(--muted-foreground)]">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
