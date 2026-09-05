"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface FadeInProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children?: ReactNode;
  delay?: number;
}

/**
 * Scroll reveal that can never leave content hidden: with reduced motion (or
 * Recruiter Mode) it renders a plain div, and the viewport margin in
 * `viewportOnce` starts the animation before the element is on screen.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  ...props
}: FadeInProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      transition={{ delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
