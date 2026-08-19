"use client";

import { useCallback, useEffect, useState } from "react";

export const ACCENTS = ["indigo", "blue", "purple", "emerald"] as const;
export type Accent = (typeof ACCENTS)[number];

const STORAGE_KEY = "accent-color";

export function useAccent() {
  const [accent, setAccentState] = useState<Accent>("indigo");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Accent | null;
    const initial = stored && ACCENTS.includes(stored) ? stored : "indigo";
    // localStorage isn't available during SSR, so the persisted accent can only be read post-mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAccentState(initial);
    document.documentElement.setAttribute("data-accent", initial);
  }, []);

  const setAccent = useCallback((value: Accent) => {
    setAccentState(value);
    localStorage.setItem(STORAGE_KEY, value);
    document.documentElement.setAttribute("data-accent", value);
  }, []);

  return { accent, setAccent };
}
