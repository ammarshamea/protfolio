"use client";

import { useEffect, useState } from "react";
import {
  RECRUITER_MODE_CHANGE_EVENT,
  isRecruiterModeEnabled,
} from "@/lib/recruiter-mode-events";

/** True when the system prefers reduced motion, or Recruiter Mode is active. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches || isRecruiterModeEnabled());

    update();
    query.addEventListener("change", update);
    window.addEventListener(RECRUITER_MODE_CHANGE_EVENT, update);
    return () => {
      query.removeEventListener("change", update);
      window.removeEventListener(RECRUITER_MODE_CHANGE_EVENT, update);
    };
  }, []);

  return reduced;
}
