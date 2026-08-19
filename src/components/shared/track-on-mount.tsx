"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/track";
import type { AnalyticsEventInput } from "@/lib/schemas/analytics";

/** Fires a single analytics event when the host page mounts. */
export function TrackOnMount({ event }: { event: AnalyticsEventInput }) {
  useEffect(() => {
    trackEvent(event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event.type, event.label, event.path]);

  return null;
}
