import { Easing } from "remotion";

/** Cinematic bezier curves — avoid linear/robotic motion. */
export const easeInOutCubic = Easing.bezier(0.65, 0, 0.35, 1);
export const easeOutQuart = Easing.bezier(0.25, 1, 0.5, 1);
export const easeInOutQuint = Easing.bezier(0.83, 0, 0.17, 1);
export const easeOutExpo = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInCubic = Easing.bezier(0.55, 0, 1, 0.45);

export type EasingFn = (t: number) => number;
