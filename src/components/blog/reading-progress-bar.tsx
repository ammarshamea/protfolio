"use client";

import { useReadingProgress } from "@/hooks/use-reading-progress";

export function ReadingProgressBar() {
  const progress = useReadingProgress();

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
