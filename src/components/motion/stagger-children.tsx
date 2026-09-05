"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type MotionDivProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children?: ReactNode;
};

export function StaggerContainer({
  children,
  className,
  animateOnMount = false,
  ...props
}: MotionDivProps & { animateOnMount?: boolean }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      {...(animateOnMount
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: viewportOnce })}
      variants={staggerContainer}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: MotionDivProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div variants={staggerItem} className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}
