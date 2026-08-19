"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#050816",
          color: "#fff",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "1.25rem", fontWeight: 600 }}>
            Something went wrong
          </p>
          {/* A plain anchor is deliberate here — this boundary must render even if routing is broken. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/en" style={{ color: "#7c3aed" }}>
            Go to homepage
          </a>
        </div>
      </body>
    </html>
  );
}
