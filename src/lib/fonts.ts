import localFont from "next/font/local";

/**
 * Self-hosted editorial stack. Files live in `src/fonts` so GitHub Pages and
 * offline builds never hit a runtime Google CDN.
 */
export const fontDisplay = localFont({
  src: [
    {
      path: "../fonts/fraunces-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../fonts/fraunces-latin-wght-italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const fontSans = localFont({
  src: [
    {
      path: "../fonts/geist-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-geist",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const fontArabic = localFont({
  src: [
    {
      path: "../fonts/ibm-plex-sans-arabic-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ibm-plex-sans-arabic-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/ibm-plex-sans-arabic-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/ibm-plex-sans-arabic-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ibm-arabic",
  display: "swap",
  fallback: ["Tahoma", "Arial", "sans-serif"],
});
