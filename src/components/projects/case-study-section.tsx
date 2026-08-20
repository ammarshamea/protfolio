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
    <FadeIn className="grid gap-5 border-t border-[var(--surface-border)] py-12 first:border-t-0 first:pt-0 sm:grid-cols-12 sm:gap-10">
      <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] font-semibold tracking-tight sm:col-span-3">
        {title}
      </h2>
      <div className="max-w-[60ch] text-[var(--muted-foreground)] sm:col-span-9">
        {children}
      </div>
    </FadeIn>
  );
}

export function CaseStudyList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--foreground)]/40" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
