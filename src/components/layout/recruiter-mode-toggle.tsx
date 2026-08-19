"use client";

import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRecruiterMode } from "@/hooks/use-recruiter-mode";

export function RecruiterModeToggle({ label }: { label: string }) {
  const { enabled, toggle } = useRecruiterMode();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={enabled ? "default" : "ghost"}
          size="icon"
          onClick={toggle}
          aria-pressed={enabled}
          aria-label={label}
        >
          <Briefcase className="h-[18px] w-[18px]" aria-hidden="true" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
