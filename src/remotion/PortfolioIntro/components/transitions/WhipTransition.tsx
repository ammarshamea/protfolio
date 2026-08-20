import { interpolate } from "remotion";
import type { CSSProperties, ReactNode } from "react";
import { easeOutExpo, easeInCubic } from "../../lib/easing";
import type { TransitionPhase } from "./types";

/** Fast directional blur pan — used for the higher-energy cuts. */
export function getWhipTransitionStyle(
  phase: TransitionPhase,
  progress: number,
  direction: 1 | -1 = 1,
): CSSProperties {
  if (phase === "none") return {};
  const p = Math.min(1, Math.max(0, progress));

  if (phase === "enter") {
    const eased = easeOutExpo(p);
    return {
      transform: `translateX(${interpolate(eased, [0, 1], [14 * direction, 0])}%)`,
      filter: `blur(${interpolate(p, [0, 0.35, 1], [22, 10, 0])}px)`,
      opacity: interpolate(p, [0, 0.25, 1], [0, 1, 1]),
    };
  }

  const eased = easeInCubic(p);
  return {
    transform: `translateX(${interpolate(eased, [0, 1], [0, 16 * direction])}%)`,
    filter: `blur(${interpolate(p, [0, 1], [0, 20])}px)`,
    opacity: interpolate(p, [0, 1], [1, 0]),
  };
}

export function WhipTransition({
  phase,
  progress,
  direction = 1,
  children,
}: {
  phase: TransitionPhase;
  progress: number;
  direction?: 1 | -1;
  children: ReactNode;
}) {
  return <div style={getWhipTransitionStyle(phase, progress, direction)}>{children}</div>;
}
