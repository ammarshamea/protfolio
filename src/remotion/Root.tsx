import { Composition } from "remotion";
import { PortfolioIntro, portfolioIntroSchema } from "./PortfolioIntro/PortfolioIntro";
import { getTotalDurationInFrames } from "./PortfolioIntro/config/sceneData";
import { FPS, WIDTH, HEIGHT } from "./PortfolioIntro/config/introConfig";

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="PortfolioIntroEn"
        component={PortfolioIntro}
        schema={portfolioIntroSchema}
        durationInFrames={getTotalDurationInFrames("en")}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{ locale: "en" }}
      />
      <Composition
        id="PortfolioIntroAr"
        component={PortfolioIntro}
        schema={portfolioIntroSchema}
        durationInFrames={getTotalDurationInFrames("ar")}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{ locale: "ar" }}
      />
    </>
  );
}
