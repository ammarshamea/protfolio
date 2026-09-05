"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, type HTMLMotionProps } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type MotionDivProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children?: ReactNode;
};

/**
 * Staggered children. First paint is visible; below-fold groups wait for
 * intersection. `animateOnMount` always plays the stagger after hydrate.
 */
export function StaggerContainer({
  children,
  className,
  animateOnMount = false,
  ...props
}: MotionDivProps & { animateOnMount?: boolean }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0,
    margin: "30% 0px 30% 0px",
  });
  const [ready, setReady] = useState(false);
  const [belowFold, setBelowFold] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el && !animateOnMount) {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      setBelowFold(rect.top > vh + 80);
    }
    setReady(true);
  }, [animateOnMount]);

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  const show = !ready || animateOnMount || !belowFold || inView;

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={show ? "visible" : "hidden"}
      variants={staggerContainer}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, ...props }: MotionDivProps) {
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
