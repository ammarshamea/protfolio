import { AbsoluteFill } from "remotion";

/** Soft edge darkening — keeps focus on the center where titles live. */
export function Vignette() {
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(0,0,0,0) 42%, rgba(0,0,0,0.6) 100%)",
        pointerEvents: "none",
      }}
    />
  );
}
