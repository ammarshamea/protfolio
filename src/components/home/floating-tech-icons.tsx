"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const ICONS = [
  { label: "Flutter", top: "12%", left: "8%", duration: 7 },
  { label: "Laravel", top: "24%", left: "88%", duration: 9 },
  { label: "Next.js", top: "70%", left: "6%", duration: 8 },
  { label: "Firebase", top: "78%", left: "90%", duration: 6.5 },
  { label: "AI", top: "8%", left: "48%", duration: 10 },
];

export function FloatingTechIcons() {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
    >
      {ICONS.map((icon) => (
        <motion.span
          key={icon.label}
          className="glass absolute rounded-full px-4 py-2 text-xs font-medium text-[var(--muted-foreground)]"
          style={{ top: icon.top, left: icon.left }}
          animate={{ y: [0, -16, 0] }}
          transition={{
            duration: icon.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {icon.label}
        </motion.span>
      ))}
    </div>
  );
}
