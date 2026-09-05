"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * The resting state is ALWAYS the real value — SSR, no-JS, reduced motion, and
 * above-the-fold renders all show the true number. The 0→n count-up only runs
 * as a one-time enhancement when the user scrolls the counter into view after
 * mount, so a "0" is never the lasting state of the page.
 */
export function AnimatedCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px 60px 0px" });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(value);
  const played = useRef(false);
  const visibleAtMount = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      visibleAtMount.current =
        rect.top < window.innerHeight && rect.bottom > 0;
    }
  }, []);

  useEffect(() => {
    if (!isInView || played.current || reduced || visibleAtMount.current) {
      return;
    }
    played.current = true;
    const duration = 900;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    }

    setCount(0);
    requestAnimationFrame(tick);
  }, [isInView, reduced, value]);

  return (
    <div ref={ref}>
      <div className="font-[family-name:var(--font-display)] text-[length:var(--text-display)] font-semibold leading-none tracking-tight">
        {count}
        {suffix}
      </div>
      <p className="mt-3 text-sm uppercase tracking-[0.1em] opacity-60">
        {label}
      </p>
    </div>
  );
}
