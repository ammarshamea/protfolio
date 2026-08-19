"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator({ label }: { label: string }) {
  return (
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-[var(--muted-foreground)]"
    >
      <span>{label}</span>
      <ChevronDown className="h-4 w-4" />
    </motion.div>
  );
}
