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

export function GlassCard({
  className,
  hover = true,
  padding = "md",
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl transition-all duration-300",
        paddingMap[padding],
        hover &&
          "hover:-translate-y-1 hover:border-[var(--accent)]/40 hover:shadow-[0_20px_60px_-20px_var(--accent)]",
        className,
      )}
      {...props}
    />
  );
}
