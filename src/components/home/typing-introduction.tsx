"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function TypingIntroduction({ titles }: { titles: string[] }) {
  const reducedMotion = useReducedMotion();
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const currentTitle = titles[titleIndex];
    const speed = deleting ? 35 : 65;

    const timeout = setTimeout(() => {
      if (!deleting && charIndex < currentTitle.length) {
        setCharIndex((c) => c + 1);
      } else if (!deleting && charIndex === currentTitle.length) {
        setTimeout(() => setDeleting(true), 1400);
      } else if (deleting && charIndex > 0) {
        setCharIndex((c) => c - 1);
      } else {
        setDeleting(false);
        setTitleIndex((i) => (i + 1) % titles.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, titleIndex, titles, reducedMotion]);

  if (reducedMotion) {
    return <span className="text-gradient">{titles[0]}</span>;
  }

  return (
    <span className="text-gradient">
      {titles[titleIndex].slice(0, charIndex)}
      <span
        className="ms-0.5 inline-block w-[2px] animate-pulse bg-[var(--accent)] align-middle"
        style={{ height: "0.9em" }}
      />
    </span>
  );
}
