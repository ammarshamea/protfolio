"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useAccent, type Accent } from "@/hooks/use-accent";

interface AccentContextValue {
  accent: Accent;
  setAccent: (accent: Accent) => void;
}

const AccentContext = createContext<AccentContextValue | null>(null);

export function AccentProvider({ children }: { children: ReactNode }) {
  const value = useAccent();
  return (
    <AccentContext.Provider value={value}>{children}</AccentContext.Provider>
  );
}

export function useAccentContext() {
  const ctx = useContext(AccentContext);
  if (!ctx)
    throw new Error("useAccentContext must be used within AccentProvider");
  return ctx;
}
