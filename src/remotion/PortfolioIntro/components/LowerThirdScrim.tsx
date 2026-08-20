import { AbsoluteFill } from "remotion";

/**
 * Localized darkening behind the lower-third title. The new key-art is bright and often has
 * holographic UI panels directly behind where the title sits, so a plain drop-shadow on the text
 * isn't reliable — this guarantees contrast without ever reading as a hard black bar.
 */
export function LowerThirdScrim() {
  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.18) 65%, rgba(0,0,0,0.58) 83%, rgba(0,0,0,0.7) 100%)",
        pointerEvents: "none",
      }}
    />
  );
}
