import { AbsoluteFill, interpolate } from "remotion";
import { easeOutExpo, easeOutQuart } from "../lib/easing";
import type { TitleLine } from "../config/sceneData";
import type { Locale } from "../config/introConfig";

interface Props {
  lines: TitleLine[];
  /** 0 -> 1 across this scene's entire visible duration. */
  progress: number;
  fontFamily: string;
  locale: Locale;
  fontSize?: number;
  color?: string;
  /** External multiplier (1 -> 0) used to clear the title quickly before the next scene's cut. */
  exitOpacity?: number;
}

const DRIFT_PX = 22;

export function CinematicText({
  lines,
  progress,
  fontFamily,
  locale,
  fontSize = 84,
  color = "#fafafa",
  exitOpacity = 1,
}: Props) {
  // Arabic is a cursive script: any non-zero letter-spacing forces the browser to drop
  // glyph shaping, breaking letter joining. The Latin "tracking-in" reveal is swapped
  // for an equally premium blur-resolve so joined letters never get pulled apart.
  const isCursiveScript = locale === "ar";

  const reveal = interpolate(progress, [0, 0.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutExpo,
  });
  const trackingReveal = interpolate(progress, [0, 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutQuart,
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "column",
        gap: fontSize * 0.12,
        paddingBottom: "13%",
      }}
    >
      {lines.map((line, index) => {
        const drift =
          line.drift === "left" ? -DRIFT_PX : line.drift === "right" ? DRIFT_PX : 0;
        const x = interpolate(progress, [0, 1], [drift, -drift]);
        const y = interpolate(reveal, [0, 1], [112, 0]);
        const letterSpacing = isCursiveScript
          ? "normal"
          : `${interpolate(trackingReveal, [0, 1], [0.22, 0.02])}em`;
        const resolveBlur = isCursiveScript
          ? interpolate(trackingReveal, [0, 1], [9, 0])
          : 0;
        const opacity = interpolate(reveal, [0, 1], [0, 1]) * exitOpacity;

        return (
          <div
            key={index}
            style={{ overflow: isCursiveScript ? "visible" : "hidden", lineHeight: 1.08 }}
          >
            <div
              style={{
                transform: `translate(${x}px, ${y}%)`,
                fontFamily,
                fontSize,
                fontWeight: 700,
                letterSpacing,
                color,
                textAlign: "center",
                whiteSpace: "nowrap",
                opacity,
                filter: resolveBlur > 0.01 ? `blur(${resolveBlur}px)` : undefined,
                textShadow: "0 2px 28px rgba(0,0,0,0.55)",
              }}
            >
              {line.text}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}
