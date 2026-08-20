import { cn } from "@/lib/utils";

type Atmosphere = "ink" | "paper" | "warm";
type Rhythm = "open" | "compact" | "dense";

const rhythmMap: Record<Rhythm, string> = {
  open: "py-[var(--space-section-open)]",
  compact: "py-[var(--space-section-compact)]",
  dense: "py-[var(--space-section-dense)]",
};

const atmosphereBorderMap: Record<Atmosphere, string> = {
  ink: "border-[var(--ink-border)]",
  paper: "border-[var(--paper-border)]",
  warm: "border-[var(--warm-border)]",
};

interface SectionProps extends React.ComponentProps<"section"> {
  /** Fixed editorial mood, independent of the light/dark theme toggle. Omit to inherit the ambient theme. */
  atmosphere?: Atmosphere;
  /** Vertical rhythm — sections should alternate, not repeat the same spacing. */
  rhythm?: Rhythm;
  /** Full-bleed removes the max-width container for edge-to-edge compositions. */
  bleed?: boolean;
  /** Renders a hairline top border in the current atmosphere's border color. */
  divider?: boolean;
  containerClassName?: string;
}

export function Section({
  atmosphere,
  rhythm = "open",
  bleed = false,
  divider = false,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-atmosphere={atmosphere}
      className={cn(
        rhythmMap[rhythm],
        divider &&
          (atmosphere
            ? atmosphereBorderMap[atmosphere]
            : "border-[var(--surface-border)]"),
        divider && "border-t",
        className,
      )}
      {...props}
    >
      {bleed ? (
        children
      ) : (
        <div className={cn("mx-auto max-w-[90rem] px-6 sm:px-10", containerClassName)}>
          {children}
        </div>
      )}
    </section>
  );
}

/** "01 / Selected Work" — the recurring editorial numbering used to open sections. */
export function SectionLabel({
  index,
  label,
  className,
}: {
  index?: number | string;
  label: string;
  className?: string;
  tone?: "muted" | "signal";
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-[length:var(--text-label)] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]",
        className,
      )}
    >
      {index !== undefined ? (
        <span className="tabular-nums">
          {typeof index === "number" ? String(index).padStart(2, "0") : index}
        </span>
      ) : null}
      <span aria-hidden="true" className="h-px w-6 bg-current opacity-30" />
      {label}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = "start",
  size = "default",
  className,
}: {
  eyebrow?: string;
  index?: number | string;
  title: string;
  description?: string;
  align?: "start" | "center";
  size?: "default" | "display";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <SectionLabel index={index} label={eyebrow} className="mb-5" />
      ) : null}
      <h2
        className={cn(
          "font-[family-name:var(--font-display)] font-semibold tracking-tight",
          size === "display"
            ? "text-[length:var(--text-display)]"
            : "text-[length:var(--text-h2)]",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-[length:var(--text-body-lg)] text-[var(--muted-foreground)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
