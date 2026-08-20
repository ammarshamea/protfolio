import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)]",
        accent: "border-transparent bg-[var(--accent)]/15 text-[var(--accent)]",
        success:
          "border-transparent bg-[var(--success)]/15 text-[var(--success)]",
        warning:
          "border-transparent bg-[var(--warning)]/15 text-[var(--warning)]",
        outline: "border-[var(--surface-border)] bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
