"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function ShortcutsDialog({
  open,
  onOpenChange,
  title,
  shortcuts,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  shortcuts: { keys: string; label: string }[];
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent solid className="max-w-sm">
        <DialogTitle>{title}</DialogTitle>
        <ul className="mt-4 space-y-3">
          {shortcuts.map((shortcut) => (
            <li
              key={shortcut.label}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <span className="text-[var(--muted-foreground)]">
                {shortcut.label}
              </span>
              <kbd className="kbd shrink-0">{shortcut.keys}</kbd>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
