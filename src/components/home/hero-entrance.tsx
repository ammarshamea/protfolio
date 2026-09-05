"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { heroContainer, heroItem, heroMedia } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * First-paint hero entrance: plays once on mount (never scroll-gated), with a
 * short premium stagger. Renders plain content under reduced motion.
 */
export function HeroEntrance({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={heroContainer}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function HeroItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div variants={heroItem} className={cn(className)}>
      {children}
    </motion.div>
  );
}

/**
 * Hero media: mount entrance plus a very light scroll parallax (transform-only,
 * disabled for reduced motion). The parallax range is small enough that it can
 * never push the frame out of its rounded container or cause overflow.
 */
export function HeroMedia({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 28]);

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate="visible"
      variants={heroMedia}
      className={cn(className)}
    >
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </motion.div>
  );
}
