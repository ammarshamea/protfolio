import { interpolate } from "remotion";
import type { CSSProperties, ReactNode } from "react";
import { easeInOutCubic } from "../../lib/easing";
import type { TransitionPhase } from "./types";

/** Push-through crossfade: outgoing scene zooms past camera, incoming resolves from a soft over-zoomed blur. */
export function getZoomTransitionStyle(phase: TransitionPhase, progress: number): CSSProperties {
  if (phase === "none") return {};
  const p = easeInOutCubic(Math.min(1, Math.max(0, progress)));

  if (phase === "enter") {
    return {
      transform: `scale(${interpolate(p, [0, 1], [1.22, 1])})`,
      opacity: interpolate(p, [0, 1], [0, 1]),
      filter: `blur(${interpolate(p, [0, 0.6, 1], [10, 2, 0])}px)`,
    };
  }

  return {
    transform: `scale(${interpolate(p, [0, 1], [1, 1.14])})`,
    opacity: interpolate(p, [0, 1], [1, 0]),
    filter: `blur(${interpolate(p, [0, 1], [0, 6])}px)`,
  };
}

export function ZoomTransition({
  phase,
  progress,
  children,
}: {
  phase: TransitionPhase;
  progress: number;
  children: ReactNode;
}) {
  return <div style={getZoomTransitionStyle(phase, progress)}>{children}</div>;
}
