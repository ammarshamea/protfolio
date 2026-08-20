"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Generative identity mark for the hero — no photography, no stock video.
 * A slow-rotating technical ring plus a fixed coordinate grid, evoking
 * architecture/blueprint precision rather than decoration for its own sake.
 */
export function AbstractHeroVisual() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute -right-[10%] top-[-15%] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle_at_50%_50%,var(--signal-ink)_0%,transparent_70%)] opacity-[0.09] sm:h-[85vh] sm:w-[85vh]" />
      <div className="absolute -left-[15%] bottom-[-20%] h-[55vh] w-[55vh] rounded-full bg-[radial-gradient(circle_at_50%_50%,var(--ink-foreground)_0%,transparent_70%)] opacity-[0.04]" />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full text-[var(--ink-foreground)]"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={(i + 1) * 14}
            y1="0"
            x2={(i + 1) * 14}
            y2="100"
            stroke="currentColor"
            strokeWidth="0.06"
            opacity="0.08"
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={(i + 1) * 14}
            x2="100"
            y2={(i + 1) * 14}
            stroke="currentColor"
            strokeWidth="0.06"
            opacity="0.08"
          />
        ))}

        <motion.g
          style={{ originX: "78%", originY: "22%" }}
          animate={reduced ? undefined : { rotate: 360 }}
          transition={
            reduced ? undefined : { duration: 140, repeat: Infinity, ease: "linear" }
          }
        >
          <circle
            cx="78"
            cy="22"
            r="26"
            fill="none"
            stroke="var(--signal-ink)"
            strokeWidth="0.15"
            strokeDasharray="0.6 3"
            opacity="0.5"
          />
          <circle
            cx="78"
            cy="22"
            r="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
            opacity="0.18"
          />
          <circle cx="78" cy="44" r="0.6" fill="var(--signal-ink)" opacity="0.8" />
        </motion.g>

        <circle
          cx="16"
          cy="82"
          r="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.1"
          opacity="0.14"
        />
      </svg>
    </div>
  );
}
