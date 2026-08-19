"use client";

import { useCallback, useEffect, useState } from "react";
import {
  RECRUITER_MODE_CHANGE_EVENT,
  isRecruiterModeEnabled,
  setRecruiterMode,
} from "@/lib/recruiter-mode-events";

/** Recruiter Mode toggle — persisted in localStorage, supports ?mode=recruiter deep links. */
export function useRecruiterMode() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect --
       window/localStorage aren't available during SSR, so the deep-link and persisted
       state can only be read post-mount. */
    if (
      new URLSearchParams(window.location.search).get("mode") === "recruiter"
    ) {
      setRecruiterMode(true);
      setEnabled(true);
    } else {
      setEnabled(isRecruiterModeEnabled());
    }
    /* eslint-enable react-hooks/set-state-in-effect */

    const listener = (event: Event) =>
      setEnabled((event as CustomEvent<boolean>).detail);
    window.addEventListener(RECRUITER_MODE_CHANGE_EVENT, listener);
    return () =>
      window.removeEventListener(RECRUITER_MODE_CHANGE_EVENT, listener);
  }, []);

  const toggle = useCallback(() => {
    setRecruiterMode(!enabled);
    setEnabled(!enabled);
  }, [enabled]);

  return { enabled, toggle };
}
