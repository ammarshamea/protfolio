"use client";

import { SerwistProvider } from "@serwist/turbopack/react";

/**
 * Service workers cache HTML and chunk URLs aggressively. In development,
 * Turbopack regenerates chunk hashes on every restart — a registered SW
 * then serves stale HTML that 404s on `/_next/static/chunks/*.js`.
 * Only enable Serwist in production builds.
 */
export function PwaProvider({ children }: { children: React.ReactNode }) {
  if (
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_STATIC_EXPORT === "true"
  ) {
    return children;
  }

  return <SerwistProvider swUrl="/serwist/sw.js">{children}</SerwistProvider>;
}
