import type { ReactNode } from "react";
import { GlassCard } from "./glass-card";
import { cn } from "@/lib/utils";

export function CTABlock({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <GlassCard
      hover={false}
      padding="lg"
      className={cn("text-center", className)}
    >
      <h2 className="text-2xl font-semibold font-[family-name:var(--font-display)] sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-3 max-w-xl text-[var(--muted-foreground)]">
          {description}
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {children}
      </div>
    </GlassCard>
  );
}
