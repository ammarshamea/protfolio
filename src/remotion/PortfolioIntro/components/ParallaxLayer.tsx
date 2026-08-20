import { AbsoluteFill, interpolate } from "remotion";
import type { CSSProperties, ReactNode } from "react";

interface Props {
  progress: number;
  /** Vertical drift in pixels applied across the full progress range — gives typography its own depth relative to the background. */
  speed: number;
  children: ReactNode;
  style?: CSSProperties;
}

export function ParallaxLayer({ progress, speed, children, style }: Props) {
  const offset = interpolate(progress, [0, 1], [speed, -speed]);
  return (
    <AbsoluteFill style={{ transform: `translateY(${offset}px)`, ...style }}>
      {children}
    </AbsoluteFill>
  );
}
