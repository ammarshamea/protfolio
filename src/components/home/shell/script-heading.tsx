import { Caveat } from "next/font/google";
import { cn } from "@/lib/utils";

// Latin-only handwritten accent for the English eyebrow line. Arabic never uses a
// script/cursive substitute font — real Arabic script already reads as handwritten
// and a foreign "script" font would break letterforms, so AR gets a bold accent
// line in the site's own Arabic font instead.
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-script",
});

/**
 * Hero name lockup: a short handwritten-feeling eyebrow line above the full,
 * un-split name/title. The name is rendered as one text node (no per-character
 * spans) so screen readers announce it normally and Arabic ligatures never break.
 */
export function ScriptHeading({
  eyebrow,
  name,
  locale,
  size = "hero",
}: {
  eyebrow: string;
  name: string;
  locale: string;
  size?: "hero" | "page";
}) {
  const isArabic = locale === "ar";

  return (
    <div>
      <p
        className={cn(
          "text-[var(--accent)]",
          size === "hero" ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
          isArabic
            ? "font-[family-name:var(--font-arabic)] font-bold"
            : cn(caveat.className, "tracking-wide"),
        )}
      >
        {eyebrow}
      </p>
      <h1
        className={cn(
          "mt-2 text-balance font-[family-name:var(--font-display)] font-semibold tracking-tight",
          size === "hero"
            ? "text-[length:var(--text-display-xl)]"
            : "text-[length:var(--text-display)] leading-[1.02]",
        )}
      >
        {name}
      </h1>
    </div>
  );
}
