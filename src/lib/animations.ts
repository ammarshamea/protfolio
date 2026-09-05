import type { Variants, Transition } from "framer-motion";

export const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];
/** Slower, softer ease reserved for the first-paint hero entrance. */
export const EASE_PREMIUM: Transition["ease"] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

/** Hero entrance — plays once on mount, never gated behind scrolling. */
export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 1, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_PREMIUM },
  },
};

export const heroMedia: Variants = {
  hidden: { opacity: 1, scale: 0.985, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_PREMIUM, delay: 0.25 },
  },
};

/**
 * Generous positive margin so below-fold reveals start before the element
 * reaches the viewport. Above-fold content must NOT rely on this alone —
 * FadeIn / StaggerContainer keep first paint visible and only hide elements
 * that layout measurement proves are well below the fold.
 */
export const viewportOnce = {
  once: true,
  amount: 0 as const,
  margin: "25% 0px 25% 0px",
};
