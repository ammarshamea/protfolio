"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Portrait-oriented generative mark for the About page — no headshot exists,
 * so this stands in as an intentional, on-brand identity visual rather than
 * a generic placeholder box.
 */
export function IdentityVisual({ initials = "AS" }: { initials?: string }) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--warm-border)] bg-[var(--warm-surface)]"
    >
      <svg viewBox="0 0 100 125" className="absolute inset-0 h-full w-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={(i + 1) * 20}
            x2="100"
            y2={(i + 1) * 20}
            stroke="var(--warm-foreground)"
            strokeWidth="0.08"
            opacity="0.08"
          />
        ))}

        <motion.g
          style={{ originX: "50%", originY: "48%" }}
          animate={reduced ? undefined : { rotate: 360 }}
          transition={
            reduced ? undefined : { duration: 90, repeat: Infinity, ease: "linear" }
          }
        >
          <circle
            cx="50"
            cy="60"
            r="34"
            fill="none"
            stroke="var(--signal-ink)"
            strokeWidth="0.2"
            strokeDasharray="0.4 2.6"
            opacity="0.55"
          />
        </motion.g>
        <circle
          cx="50"
          cy="60"
          r="24"
          fill="none"
          stroke="var(--warm-foreground)"
          strokeWidth="0.12"
          opacity="0.16"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-[family-name:var(--font-display)] text-6xl font-bold text-[var(--warm-foreground)] opacity-90">
          {initials}
        </span>
      </div>
    </div>
  );
}
