import type { AnalyticsEventInput } from "@/lib/schemas/analytics";

/** Fire-and-forget client-side event tracking — never blocks or throws on the caller. */
export function trackEvent(event: AnalyticsEventInput) {
  if (typeof window === "undefined") return;
  try {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Analytics must never break the page.
  }
}
