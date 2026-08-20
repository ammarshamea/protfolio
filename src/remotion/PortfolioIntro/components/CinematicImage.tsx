import { AbsoluteFill, Img, interpolate } from "remotion";
import type { CSSProperties } from "react";
import type { CameraKeyframe } from "../config/sceneData";

interface Props {
  src: string;
  progress: number;
  camera: CameraKeyframe;
  style?: CSSProperties;
}

/** A still image driven by an eased Ken-Burns style camera move. */
export function CinematicImage({ src, progress, camera, style }: Props) {
  const eased = camera.easing(Math.min(1, Math.max(0, progress)));
  const scale = interpolate(eased, [0, 1], [camera.startScale, camera.endScale]);
  const x = interpolate(eased, [0, 1], [camera.startX ?? 0, camera.endX ?? camera.startX ?? 0]);
  const y = interpolate(eased, [0, 1], [camera.startY ?? 0, camera.endY ?? camera.startY ?? 0]);

  return (
    <AbsoluteFill style={{ overflow: "hidden", ...style }}>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translate(${x}%, ${y}%)`,
          transformOrigin: "center center",
        }}
      />
    </AbsoluteFill>
  );
}
