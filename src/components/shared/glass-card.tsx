import { cn } from "@/lib/utils";

interface GlassCardProps extends React.ComponentProps<"div"> {
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddingMap = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

/**
 * Restrained bordered surface — deliberately flat, no blur/glow. Used where a
 * contained surface genuinely helps (FAQ items, metadata panels, list rows),
 * not as a default wrapper for everything.
 */
export function GlassCard({
  className,
  hover = true,
  padding = "md",
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--surface-border)] bg-[var(--surface)] shadow-[var(--shadow-card)] transition-[border-color,background-color] duration-200",
        paddingMap[padding],
        hover && "hover:border-[var(--foreground)]/25",
        className,
      )}
      {...props}
    />
  );
}
