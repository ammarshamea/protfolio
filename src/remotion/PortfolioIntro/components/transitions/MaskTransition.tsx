import { interpolate } from "remotion";
import type { CSSProperties, ReactNode } from "react";
import { easeInOutQuint } from "../../lib/easing";
import type { TransitionPhase } from "./types";

/** Expanding circular reveal — used for the opening reveal and the final merge into the homepage. */
export function getMaskTransitionStyle(phase: TransitionPhase, progress: number): CSSProperties {
  if (phase === "none") return {};
  const p = easeInOutQuint(Math.min(1, Math.max(0, progress)));

  if (phase === "enter") {
    return { clipPath: `circle(${interpolate(p, [0, 1], [0, 75])}% at 50% 50%)` };
  }

  // The outgoing layer isn't clipped — it just dims so the incoming reveal reads clearly on top.
  return { filter: `brightness(${interpolate(p, [0, 1], [1, 0.55])})` };
}

export function MaskTransition({
  phase,
  progress,
  children,
}: {
  phase: TransitionPhase;
  progress: number;
  children: ReactNode;
}) {
  return <div style={getMaskTransitionStyle(phase, progress)}>{children}</div>;
}
