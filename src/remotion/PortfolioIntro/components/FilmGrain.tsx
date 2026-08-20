import { AbsoluteFill, useCurrentFrame } from "remotion";

/** Subtle animated 35mm-style grain. Meant to be felt, not seen. */
export function FilmGrain() {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ mixBlendMode: "overlay", opacity: 0.05, pointerEvents: "none" }}>
      <svg width="100%" height="100%">
        <filter id="film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={2}
            seed={frame % 6}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain)" />
      </svg>
    </AbsoluteFill>
  );
}
