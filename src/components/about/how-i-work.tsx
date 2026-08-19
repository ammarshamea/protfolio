"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";

export function HowIWork({
  intro,
  steps,
}: {
  intro: string;
  steps: { title: string; description: string }[];
}) {
  return (
    <div>
      <p className="mb-10 max-w-2xl text-[var(--muted-foreground)]">{intro}</p>
      <ol className="relative space-y-10 ps-8">
        <div
          className="absolute bottom-2 start-3 top-2 w-px bg-[var(--surface-border)]"
          aria-hidden="true"
        />
        {steps.map((step, index) => (
          <motion.li
            key={step.title}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ delay: index * 0.05 }}
            className="relative"
          >
            <span className="absolute -start-8 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-semibold text-[var(--accent-foreground)]">
              {index + 1}
            </span>
            <h3 className="font-semibold">{step.title}</h3>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              {step.description}
            </p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
