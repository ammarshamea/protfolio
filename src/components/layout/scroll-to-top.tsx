"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { usePathname } from "@/i18n/navigation";

export function ScrollToTop({ label }: { label: string }) {
  const visible = useScrollTop();
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={label}
          className="fixed bottom-[calc(var(--dock-space)+0.65rem)] right-4 z-30 flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] transition-colors hover:text-[var(--accent)] rtl:right-auto rtl:left-4"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
