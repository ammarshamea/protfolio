import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import type { CSSProperties } from "react";
import { CinematicImage } from "./CinematicImage";
import { CinematicText } from "./CinematicText";
import { LowerThirdScrim } from "./LowerThirdScrim";
import { getZoomTransitionStyle } from "./transitions/ZoomTransition";
import { getWhipTransitionStyle } from "./transitions/WhipTransition";
import { getMaskTransitionStyle } from "./transitions/MaskTransition";
import type { TransitionPhase } from "./transitions/types";
import type { IntroScene, TransitionType } from "../config/sceneData";
import type { Locale } from "../config/introConfig";
import { easeInCubic } from "../lib/easing";

interface Props {
  scene: IntroScene;
  sceneIndex: number;
  seqLen: number;
  entryFrames: number;
  exitFrames: number;
  nextTransitionIn?: TransitionType;
  locale: Locale;
  fontFamily: string;
}

function getTransitionStyle(
  type: TransitionType | undefined,
  phase: TransitionPhase,
  progress: number,
  direction: 1 | -1,
): CSSProperties {
  switch (type) {
    case "zoom":
      return getZoomTransitionStyle(phase, progress);
    case "whip":
      return getWhipTransitionStyle(phase, progress, direction);
    case "mask":
      return getMaskTransitionStyle(phase, progress);
    default:
      return {};
  }
}

export function Scene({
  scene,
  sceneIndex,
  seqLen,
  entryFrames,
  exitFrames,
  nextTransitionIn,
  locale,
  fontFamily,
}: Props) {
  const frame = useCurrentFrame();
  const direction: 1 | -1 = sceneIndex % 2 === 0 ? 1 : -1;

  const cameraProgress = seqLen <= 1 ? 1 : frame / (seqLen - 1);

  const entryProgress = entryFrames > 0 ? frame / entryFrames : 1;
  const exitStart = seqLen - exitFrames;
  const exitProgress = exitFrames > 0 ? (frame - exitStart) / exitFrames : 0;

  const isEntering = entryFrames > 0 && frame < entryFrames;
  const isExiting = exitFrames > 0 && frame >= exitStart;

  const transitionStyle = isEntering
    ? getTransitionStyle(scene.transitionIn, "enter", entryProgress, direction)
    : isExiting
      ? getTransitionStyle(nextTransitionIn, "exit", exitProgress, direction)
      : {};

  // Delay the incoming title slightly past the start of the cut, and force the outgoing
  // title to clear out fast (well before the crossfade's midpoint) — otherwise two
  // centered text blocks overlap into an illegible double-exposure during every transition.
  const textWindowStart = entryFrames > 0 ? entryFrames * 0.5 : 0;
  const textDuration = Math.max(1, seqLen - textWindowStart);
  const textProgress = Math.min(1, Math.max(0, (frame - textWindowStart) / textDuration));

  const textFadeOutFrames = Math.max(1, Math.round(exitFrames * 0.45));
  const textExitOpacity = isExiting
    ? interpolate(frame, [exitStart, exitStart + textFadeOutFrames], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: easeInCubic,
      })
    : 1;

  return (
    <AbsoluteFill style={transitionStyle}>
      <CinematicImage src={scene.image} progress={cameraProgress} camera={scene.camera} />
      <LowerThirdScrim />
      <CinematicText
        lines={scene.title[locale]}
        progress={textProgress}
        fontFamily={fontFamily}
        locale={locale}
        exitOpacity={textExitOpacity}
      />
    </AbsoluteFill>
  );
}
