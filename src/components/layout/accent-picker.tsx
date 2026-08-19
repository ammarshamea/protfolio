"use client";

import { Palette } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ACCENTS } from "@/hooks/use-accent";
import { useAccentContext } from "@/components/providers/accent-provider";
import { cn } from "@/lib/utils";

const ACCENT_SWATCHES: Record<string, string> = {
  indigo: "#4f46e5",
  blue: "#3b82f6",
  purple: "#7c3aed",
  emerald: "#10b981",
};

export function AccentPicker({ label }: { label: string }) {
  const { accent, setAccent } = useAccentContext();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={label}>
          <Palette className="h-[18px] w-[18px]" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogTitle>{label}</DialogTitle>
        <div className="mt-4 flex items-center gap-4">
          {ACCENTS.map((value) => (
            <button
              key={value}
              type="button"
              aria-label={value}
              onClick={() => setAccent(value)}
              className={cn(
                "h-10 w-10 rounded-full border-2 transition-transform hover:scale-110",
                accent === value
                  ? "border-[var(--foreground)]"
                  : "border-transparent",
              )}
              style={{ backgroundColor: ACCENT_SWATCHES[value] }}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
