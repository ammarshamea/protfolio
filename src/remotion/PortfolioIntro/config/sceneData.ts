import { staticFile } from "remotion";
import {
  easeInOutCubic,
  easeInOutQuint,
  easeOutExpo,
  easeInCubic,
  type EasingFn,
} from "../lib/easing";
import timing from "./voice-timing.json";
import { FPS, type Locale } from "./introConfig";

export type TransitionType = "mask" | "zoom" | "whip";
export type Drift = "left" | "right" | "none";

export interface TitleLine {
  text: string;
  drift?: Drift;
}

export interface CameraKeyframe {
  startScale: number;
  endScale: number;
  startX?: number;
  endX?: number;
  startY?: number;
  endY?: number;
  easing: EasingFn;
}

export interface IntroScene {
  id: string;
  image: string;
  /** Transition used to reveal this scene from the previous one. */
  transitionIn: TransitionType;
  camera: CameraKeyframe;
  title: Record<Locale, TitleLine[]>;
  voiceLine: Record<Locale, string>;
}

const img = (name: string) => staticFile(`generated/portfolio-intro/${name}`);

export const SCENES: IntroScene[] = [
  {
    id: "opening",
    image: img("scene-01-opening.png"),
    transitionIn: "mask",
    camera: { startScale: 1, endScale: 1.08, startY: -1, endY: 1, easing: easeInOutCubic },
    title: {
      en: [{ text: "AMMAR SHAMEA", drift: "none" }],
      ar: [{ text: "عمار شامية", drift: "none" }],
    },
    voiceLine: {
      en: "I'm Ammar Shamea.",
      ar: "أنا عمار شامية.",
    },
  },
  {
    id: "identity",
    image: img("scene-02-identity.png"),
    transitionIn: "zoom",
    camera: { startScale: 1.05, endScale: 1, startX: -1, endX: 1, easing: easeInOutCubic },
    title: {
      en: [
        { text: "FLUTTER", drift: "left" },
        { text: "FULL STACK", drift: "right" },
      ],
      ar: [
        { text: "مطوّر Flutter", drift: "right" },
        { text: "و Full Stack", drift: "left" },
      ],
    },
    voiceLine: {
      en: "I build Flutter apps and full-stack systems.",
      ar: "أبني تطبيقات Flutter وأنظمة متكاملة.",
    },
  },
  {
    id: "codeapi",
    image: img("scene-03-codeapi.png"),
    transitionIn: "whip",
    camera: { startScale: 1.08, endScale: 1, easing: easeOutExpo },
    title: {
      en: [
        { text: "CLEAN", drift: "none" },
        { text: "ARCHITECTURE", drift: "none" },
      ],
      ar: [
        { text: "بنية", drift: "none" },
        { text: "نظيفة", drift: "none" },
      ],
    },
    voiceLine: {
      en: "Clean architecture, from the interface to the API.",
      ar: "بنية نظيفة، من الواجهة إلى الـ API.",
    },
  },
  {
    id: "ideas",
    image: img("scene-04-ideas.png"),
    transitionIn: "zoom",
    camera: { startScale: 1.1, endScale: 1, startX: 1, endX: -1, easing: easeOutExpo },
    title: {
      en: [
        { text: "REAL APPS.", drift: "left" },
        { text: "REAL BUSINESSES.", drift: "right" },
      ],
      ar: [
        { text: "تطبيقات حقيقية", drift: "right" },
        { text: "لشركات حقيقية", drift: "left" },
      ],
    },
    voiceLine: {
      en: "For real businesses that run on them.",
      ar: "تعتمد عليها الشركات فعليًا في عملها.",
    },
  },
  {
    id: "designprocess",
    image: img("scene-05-designprocess.png"),
    transitionIn: "whip",
    camera: { startScale: 1, endScale: 1.06, startX: -1, endX: 1, easing: easeInOutCubic },
    title: {
      en: [
        { text: "DESIGN", drift: "none" },
        { text: "THAT WORKS", drift: "none" },
      ],
      ar: [
        { text: "تصميم", drift: "none" },
        { text: "يعمل فعليًا", drift: "none" },
      ],
    },
    voiceLine: {
      en: "Every screen designed with intent.",
      ar: "كل شاشة مصممة بعناية ووضوح.",
    },
  },
  {
    id: "designcode",
    image: img("scene-06-designcode.png"),
    transitionIn: "zoom",
    camera: { startScale: 1.04, endScale: 1.1, startX: 1, endX: -1, easing: easeInOutCubic },
    title: {
      en: [
        { text: "DESIGN", drift: "left" },
        { text: "MOTION", drift: "none" },
        { text: "CODE", drift: "right" },
      ],
      ar: [
        { text: "تصميم", drift: "right" },
        { text: "حركة", drift: "none" },
        { text: "برمجة", drift: "left" },
      ],
    },
    voiceLine: {
      en: "Design, motion, and code — in one system.",
      ar: "تصميم وحركة وبرمجة في نظام واحد.",
    },
  },
  {
    id: "clyxorder",
    image: img("scene-07-clyxorder.png"),
    transitionIn: "whip",
    camera: { startScale: 1.1, endScale: 1, easing: easeOutExpo },
    title: {
      en: [{ text: "CLYX ORDER", drift: "none" }],
      ar: [{ text: "Clyx Order", drift: "none" }],
    },
    voiceLine: {
      en: "Clyx Order.",
      ar: "Clyx Order.",
    },
  },
  {
    id: "pureger",
    image: img("scene-08-pureger.png"),
    transitionIn: "zoom",
    camera: { startScale: 1, endScale: 1.08, startX: -1, endX: 1, easing: easeInOutCubic },
    title: {
      en: [{ text: "PUREGER", drift: "none" }],
      ar: [{ text: "Pureger", drift: "none" }],
    },
    voiceLine: {
      en: "Pureger.",
      ar: "Pureger.",
    },
  },
  {
    id: "nivxtime",
    image: img("scene-09-nivxtime.png"),
    transitionIn: "whip",
    camera: { startScale: 1.08, endScale: 1, startX: 1, endX: -1, easing: easeOutExpo },
    title: {
      en: [{ text: "NIVXTIME", drift: "none" }],
      ar: [{ text: "NIVXTIME", drift: "none" }],
    },
    voiceLine: {
      en: "NIVXTIME.",
      ar: "NIVXTIME.",
    },
  },
  {
    id: "build",
    image: img("scene-10-build.png"),
    transitionIn: "zoom",
    camera: { startScale: 1, endScale: 1.12, startY: 1, endY: -2, easing: easeInCubic },
    title: {
      en: [
        { text: "I BUILD", drift: "left" },
        { text: "DIGITAL EXPERIENCES", drift: "right" },
      ],
      ar: [
        { text: "أبني", drift: "right" },
        { text: "تجارب رقمية متكاملة", drift: "left" },
      ],
    },
    voiceLine: {
      en: "I build complete digital experiences.",
      ar: "أبني تجارب رقمية متكاملة.",
    },
  },
  {
    id: "cloud",
    image: img("scene-11-cloud.png"),
    transitionIn: "whip",
    camera: { startScale: 1.05, endScale: 1, easing: easeInOutCubic },
    title: {
      en: [
        { text: "SCALABLE", drift: "none" },
        { text: "CLOUD SYSTEMS", drift: "none" },
      ],
      ar: [
        { text: "أنظمة سحابية", drift: "none" },
        { text: "قابلة للتوسّع", drift: "none" },
      ],
    },
    voiceLine: {
      en: "Backed by scalable cloud systems.",
      ar: "مدعومة بأنظمة سحابية قابلة للتوسّع.",
    },
  },
  {
    id: "security",
    image: img("scene-12-security.png"),
    transitionIn: "zoom",
    camera: { startScale: 1, endScale: 1.06, easing: easeInOutQuint },
    title: {
      en: [
        { text: "SECURE.", drift: "none" },
        { text: "RELIABLE.", drift: "none" },
      ],
      ar: [
        { text: "آمن.", drift: "none" },
        { text: "موثوق.", drift: "none" },
      ],
    },
    voiceLine: {
      en: "Secure and reliable, by design.",
      ar: "آمن وموثوق بالتصميم.",
    },
  },
  {
    id: "ecosystem",
    image: img("scene-13-ecosystem.png"),
    transitionIn: "whip",
    camera: { startScale: 1.06, endScale: 1, startX: -1, endX: 1, easing: easeInOutCubic },
    title: {
      en: [
        { text: "BUILT FOR", drift: "none" },
        { text: "REAL TEAMS", drift: "none" },
      ],
      ar: [
        { text: "لفرق عمل", drift: "none" },
        { text: "حقيقية", drift: "none" },
      ],
    },
    voiceLine: {
      en: "Built for real teams, not just demos.",
      ar: "مبني لفرق عمل حقيقية، لا للعروض فقط.",
    },
  },
  {
    id: "global",
    image: img("scene-14-global.png"),
    transitionIn: "zoom",
    camera: { startScale: 1, endScale: 1.08, startX: 1, endX: -1, easing: easeInOutCubic },
    title: {
      en: [
        { text: "READY TO", drift: "none" },
        { text: "SCALE GLOBALLY", drift: "none" },
      ],
      ar: [
        { text: "جاهز", drift: "none" },
        { text: "للتوسّع عالميًا", drift: "none" },
      ],
    },
    voiceLine: {
      en: "Ready to scale, wherever you grow.",
      ar: "جاهز للتوسّع أينما تنمو أعمالك.",
    },
  },
  {
    id: "testimonial",
    image: img("scene-15-testimonial.png"),
    transitionIn: "whip",
    camera: { startScale: 1.05, endScale: 1, easing: easeOutExpo },
    title: {
      en: [
        { text: "TRUSTED", drift: "none" },
        { text: "BY CLIENTS", drift: "none" },
      ],
      ar: [
        { text: "موثوق", drift: "none" },
        { text: "من العملاء", drift: "none" },
      ],
    },
    voiceLine: {
      en: "Trusted by the people who use it.",
      ar: "موثوق من الأشخاص الذين يستخدمونه.",
    },
  },
  {
    id: "analytics",
    image: img("scene-16-analytics.png"),
    transitionIn: "zoom",
    camera: { startScale: 1, endScale: 1.1, startX: -1, endX: 1, easing: easeInOutCubic },
    title: {
      en: [
        { text: "DATA-DRIVEN", drift: "none" },
        { text: "DECISIONS", drift: "none" },
      ],
      ar: [
        { text: "قرارات", drift: "none" },
        { text: "مبنية على البيانات", drift: "none" },
      ],
    },
    voiceLine: {
      en: "Every decision, backed by data.",
      ar: "كل قرار مبنيّ على بيانات حقيقية.",
    },
  },
  {
    id: "growth",
    image: img("scene-17-growth.png"),
    transitionIn: "whip",
    camera: { startScale: 1.02, endScale: 1.12, easing: easeInOutQuint },
    title: {
      en: [
        { text: "GROWTH.", drift: "none" },
        { text: "IMPACT.", drift: "none" },
      ],
      ar: [
        { text: "نمو.", drift: "none" },
        { text: "تأثير.", drift: "none" },
      ],
    },
    voiceLine: {
      en: "Built once, to scale forever.",
      ar: "تُبنى مرة واحدة، لتتوسّع للأبد.",
    },
  },
  {
    id: "process",
    image: img("scene-18-process.png"),
    transitionIn: "zoom",
    camera: { startScale: 1.06, endScale: 1, startX: 1, endX: -1, easing: easeInOutCubic },
    title: {
      en: [
        { text: "PRECISION.", drift: "none" },
        { text: "PROCESS.", drift: "none" },
      ],
      ar: [
        { text: "دقة", drift: "none" },
        { text: "في العملية", drift: "none" },
      ],
    },
    voiceLine: {
      en: "Precision in process, focus on outcome.",
      ar: "دقة في العملية، وتركيز على النتيجة.",
    },
  },
  {
    id: "climax",
    image: img("scene-19-climax.png"),
    transitionIn: "whip",
    camera: { startScale: 1, endScale: 1.15, startY: 1, endY: -2, easing: easeInCubic },
    title: {
      en: [
        { text: "FROM IDEA", drift: "left" },
        { text: "TO EXPERIENCE", drift: "right" },
      ],
      ar: [
        { text: "من الفكرة", drift: "right" },
        { text: "إلى التجربة", drift: "left" },
      ],
    },
    voiceLine: {
      en: "From idea to experience.",
      ar: "من الفكرة إلى التجربة.",
    },
  },
  {
    id: "ending",
    image: img("scene-20-ending.png"),
    transitionIn: "mask",
    camera: { startScale: 1, endScale: 1.06, easing: easeInOutCubic },
    title: {
      en: [{ text: "WELCOME IN", drift: "none" }],
      ar: [{ text: "تفضل — هذه أعمالي", drift: "none" }],
    },
    voiceLine: {
      en: "Welcome in.",
      ar: "تفضل، هذه أعمالي.",
    },
  },
];

type TimingTable = Record<Locale, Record<string, number>>;

export function getSceneDurationInFrames(sceneId: string, locale: Locale): number {
  const seconds = (timing as TimingTable)[locale]?.[sceneId];
  return Math.round((seconds ?? 1.6) * FPS);
}

export function getTotalDurationInFrames(locale: Locale): number {
  return SCENES.reduce((sum, scene) => sum + getSceneDurationInFrames(scene.id, locale), 0);
}
