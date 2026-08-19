"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Contrast } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const THEME_ORDER = ["light", "dark", "high-contrast"] as const;

const ICONS = {
  light: Sun,
  dark: Moon,
  "high-contrast": Contrast,
};

export function ThemeToggle({ label }: { label: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // The active theme is only known once mounted on the client, to avoid hydration mismatches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const current = mounted
    ? ((theme as (typeof THEME_ORDER)[number]) ?? "dark")
    : "dark";
  const Icon = ICONS[current] ?? Moon;

  function handleClick() {
    const currentIndex = THEME_ORDER.indexOf(current);
    const next = THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length];
    setTheme(next);
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClick}
          aria-label={label}
        >
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {label}: {current}
      </TooltipContent>
    </Tooltip>
  );
}
