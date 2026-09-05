"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, type HTMLMotionProps } from "framer-motion";
import { EASE } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface FadeInProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children?: ReactNode;
  delay?: number;
}

type RevealMode = "ssr" | "enter" | "wait";

/**
 * Scroll reveal that can never leave first-paint content hidden.
 *
 * SSR and the first client frame render at full opacity. After layout we
 * measure: if the node is near the viewport we keep it visible (optional
 * soft settle); only nodes clearly below the fold start hidden and play
 * when they intersect. A timeout failsafe forces visibility.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  ...props
}: FadeInProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0,
    margin: "30% 0px 30% 0px",
  });
  const [mode, setMode] = useState<RevealMode>("ssr");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) {
      setMode("enter");
      return;
    }
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 800;
    const nearViewport = rect.top < vh + 80 && rect.bottom > -40;
    setMode(nearViewport ? "enter" : "wait");

    const failsafe = window.setTimeout(() => {
      setMode((current) => (current === "wait" ? "enter" : current));
    }, 900);
    return () => window.clearTimeout(failsafe);
  }, []);

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  const visible = mode !== "wait" || inView;

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{
        duration: mode === "ssr" ? 0 : 0.55,
        delay: mode === "wait" && visible ? delay : 0,
        ease: EASE,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
