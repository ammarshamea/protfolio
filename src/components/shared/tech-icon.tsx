import { createElement } from "react";
import { cn } from "@/lib/utils";
import { resolveTechIcon } from "@/lib/tech-icons";

export function TechIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return createElement(resolveTechIcon(name), {
    "aria-hidden": true,
    className: cn("shrink-0", className),
  });
}
