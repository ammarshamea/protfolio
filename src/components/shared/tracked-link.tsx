"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackEvent } from "@/lib/track";

/** An <a> that fires a cta_click analytics event before navigating. */
export function TrackedLink({
  label,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { label: string }) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent({ type: "cta_click", label });
        onClick?.(event);
      }}
    />
  );
}
