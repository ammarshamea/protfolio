import { loadFont as loadSora } from "@remotion/google-fonts/Sora";
import { loadFont as loadNotoArabic } from "@remotion/google-fonts/NotoSansArabic";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

/** Transition overlap window shared by every cut, in frames (0.6s @ 30fps). */
export const TRANSITION_FRAMES = 18;

export const BRAND = {
  background: "#0c0c0d",
  foreground: "#fafafa",
  accent: "#4f46e5",
  accentLight: "#8b8fff",
} as const;

const sora = loadSora("normal", { weights: ["600", "700", "800"] });
const notoArabic = loadNotoArabic("normal", { weights: ["600", "700", "800"] });

export const FONT_FAMILY: Record<"en" | "ar", string> = {
  en: sora.fontFamily,
  ar: notoArabic.fontFamily,
};

export type Locale = "en" | "ar";
