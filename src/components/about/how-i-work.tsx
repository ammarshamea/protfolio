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
      <p className="mb-10 max-w-2xl text-[length:var(--text-body-lg)] leading-relaxed text-[var(--muted-foreground)]">
        {intro}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ delay: index * 0.05 }}
            className="rounded-[var(--radius-lg)] border border-[var(--surface-border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)]"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
