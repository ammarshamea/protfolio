"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/track";

/** Records a page_view on every route change. Mounted once in the locale layout. */
export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent({ type: "page_view", path: pathname });
  }, [pathname]);

  return null;
}
