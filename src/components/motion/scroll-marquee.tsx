"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Oversized ghost text that drifts horizontally as the section scrolls
 * through view, tied to scroll position rather than a fixed-duration loop.
 */
export function ScrollMarquee({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !trackRef.current) return;
    const el = trackRef.current;

    const tween = gsap.to(el, {
      xPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: el.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none overflow-hidden whitespace-nowrap", className)}
    >
      <div ref={trackRef} className="inline-block">
        <span className="font-[family-name:var(--font-display)] text-[11vw] font-bold uppercase leading-none tracking-tight opacity-[0.05]">
          {text} — {text} — {text}
        </span>
      </div>
    </div>
  );
}
