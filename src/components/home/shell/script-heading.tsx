import { cn } from "@/lib/utils";

/**
 * Hero name lockup: italic Fraunces eyebrow over the full, un-split name.
 * The name is one text node so screen readers announce it normally and Arabic
 * ligatures never break. EN only gets tight negative tracking.
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
          "font-[family-name:var(--font-display)] italic text-[var(--accent-text)]",
          size === "hero" ? "text-lg sm:text-xl" : "text-base sm:text-lg",
          isArabic &&
            "not-italic font-[family-name:var(--font-ar)] font-semibold",
        )}
      >
        {eyebrow}
      </p>
      <h1
        className={cn(
          "mt-3 text-balance font-[family-name:var(--font-display)] font-semibold text-[var(--cream,#ffeec8)]",
          size === "hero"
            ? "text-[length:var(--text-display-xl)] leading-[0.86]"
            : "text-[length:var(--text-display)] leading-[0.94]",
          isArabic ? "tracking-normal" : "tracking-[-0.045em]",
        )}
      >
        {name}
      </h1>
    </div>
  );
}
