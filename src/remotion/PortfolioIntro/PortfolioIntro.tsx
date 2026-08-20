import type { FC } from "react";
import { z } from "zod";
import { AbsoluteFill, Sequence } from "remotion";
import { SCENES, getSceneDurationInFrames } from "./config/sceneData";
import { TRANSITION_FRAMES, BRAND, FONT_FAMILY, type Locale } from "./config/introConfig";
import { Scene } from "./components/Scene";
import { FilmGrain } from "./components/FilmGrain";
import { Vignette } from "./components/Vignette";

export const portfolioIntroSchema = z.object({
  locale: z.enum(["en", "ar"]),
});

export type PortfolioIntroProps = z.infer<typeof portfolioIntroSchema>;

interface TimelineEntry {
  start: number;
  seqLen: number;
  entryFrames: number;
  exitFrames: number;
}

function buildTimeline(locale: Locale): TimelineEntry[] {
  let nominalStart = 0;
  return SCENES.map((scene, index) => {
    const duration = getSceneDurationInFrames(scene.id, locale);
    const entryFrames = index === 0 ? 0 : TRANSITION_FRAMES;
    const exitFrames = index === SCENES.length - 1 ? 0 : TRANSITION_FRAMES;
    const start = nominalStart - entryFrames;
    const seqLen = entryFrames + duration + exitFrames;
    nominalStart += duration;
    return { start, seqLen, entryFrames, exitFrames };
  });
}

export const PortfolioIntro: FC<PortfolioIntroProps> = ({ locale }) => {
  const fontFamily = FONT_FAMILY[locale];
  const timeline = buildTimeline(locale);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.background,
        direction: locale === "ar" ? "rtl" : "ltr",
      }}
    >
      {SCENES.map((scene, index) => (
        <Sequence
          key={scene.id}
          from={timeline[index].start}
          durationInFrames={timeline[index].seqLen}
          style={{ zIndex: index }}
        >
          <Scene
            scene={scene}
            sceneIndex={index}
            seqLen={timeline[index].seqLen}
            entryFrames={timeline[index].entryFrames}
            exitFrames={timeline[index].exitFrames}
            nextTransitionIn={SCENES[index + 1]?.transitionIn}
            locale={locale}
            fontFamily={fontFamily}
          />
        </Sequence>
      ))}
      <FilmGrain />
      <Vignette />
    </AbsoluteFill>
  );
};
