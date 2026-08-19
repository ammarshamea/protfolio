"use client";

import { useEffect, useRef } from "react";

interface ShortcutHandlers {
  onOpenPalette?: () => void;
  onGoHome?: () => void;
  onGoProjects?: () => void;
  onGoAbout?: () => void;
  onShowShortcuts?: () => void;
}

/** Raycast-style chords: Ctrl/Cmd+K, and G then H/P/A. Ignores input while typing in fields. */
export function useKeyboardShortcuts({
  onOpenPalette,
  onGoHome,
  onGoProjects,
  onGoAbout,
  onShowShortcuts,
}: ShortcutHandlers) {
  const pendingG = useRef(false);

  useEffect(() => {
    function isTypingContext(target: EventTarget | null) {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        target.isContentEditable ||
        tag === "SELECT"
      );
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (isTypingContext(event.target)) return;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenPalette?.();
        return;
      }

      if (event.key === "?") {
        onShowShortcuts?.();
        return;
      }

      if (pendingG.current) {
        pendingG.current = false;
        if (event.key.toLowerCase() === "h") onGoHome?.();
        if (event.key.toLowerCase() === "p") onGoProjects?.();
        if (event.key.toLowerCase() === "a") onGoAbout?.();
        return;
      }

      if (event.key.toLowerCase() === "g") {
        pendingG.current = true;
        setTimeout(() => {
          pendingG.current = false;
        }, 1000);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenPalette, onGoHome, onGoProjects, onGoAbout, onShowShortcuts]);
}
