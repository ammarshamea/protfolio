"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scroll-scrubbed reveal for hero-weight media — the panel starts slightly
 * zoomed in and settles to its resting scale as it crosses the viewport.
 * One of two deliberate GSAP moments on the site (see also ScrollMarquee);
 * everything else uses framer-motion's lighter viewport-triggered fades.
 */
export function ScrollScale({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const el = ref.current;

    const tween = gsap.fromTo(
      el,
      { scale: 1.1 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "top 30%",
          scrub: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <div ref={ref} className="h-full w-full">
        {children}
      </div>
    </div>
  );
}
