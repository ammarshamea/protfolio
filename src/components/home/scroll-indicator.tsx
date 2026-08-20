"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ScrollIndicator({ label }: { label: string }) {
  const reduced = useReducedMotion();

  return (
    <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--atmosphere-muted,var(--muted-foreground))]">
      <span>{label}</span>
      <motion.span
        aria-hidden="true"
        className="h-8 w-px bg-current opacity-40"
        animate={reduced ? undefined : { scaleY: [0.3, 1, 0.3] }}
        style={{ transformOrigin: "top" }}
        transition={
          reduced
            ? undefined
            : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
        }
      />
    </div>
  );
}
