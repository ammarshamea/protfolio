"use client";

import { useState } from "react";
import { Command, Ellipsis } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { AccentPicker } from "@/components/layout/accent-picker";
import { RecruiterModeToggle } from "@/components/layout/recruiter-mode-toggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { footerNavGroups } from "@/lib/navigation";
import { recruiterModeConfig } from "@/lib/recruiter-mode";
import { useRecruiterMode } from "@/hooks/use-recruiter-mode";
import { dispatchOpenCommandPalette } from "@/lib/command-palette-events";
import { cn } from "@/lib/utils";

const itemClass =
  "flex items-center gap-2 rounded-full px-2 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] sm:px-3.5 sm:py-2.5";

/**
 * Overflow menu for the pages the dock cannot hold. Every destination is a real
 * `Link` so the rest of the sitemap stays crawlable after the top header is gone.
 */
export function DockMoreSheet() {
  const t = useTranslations();
  const pathname = usePathname();
  const { enabled: recruiterMode } = useRecruiterMode();
  const [open, setOpen] = useState(false);

  const visibleGroups = recruiterMode
    ? footerNavGroups
        .map((group) => ({
          ...group,
          items: group.items.filter(
            (item) => !recruiterModeConfig.hiddenRoutes.includes(item.key),
          ),
        }))
        .filter((group) => group.items.length > 0)
    : footerNavGroups;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={t("dock.more")}
        className={cn(
          itemClass,
          "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
        )}
      >
        <Ellipsis className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
        <span className="sr-only sm:not-sr-only">{t("dock.more")}</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent solid className="max-w-2xl">
          <DialogTitle>{t("dock.moreTitle")}</DialogTitle>
          <DialogDescription>{t("dock.moreDescription")}</DialogDescription>

          <div className="mt-4 grid max-h-[55vh] gap-6 overflow-y-auto pe-1 sm:grid-cols-2">
            {visibleGroups.map((group) => (
              <section key={group.titleKey}>
                <h3 className="mb-3 text-[11px] font-semibold uppercase text-[var(--accent)]">
                  {t(`nav.${group.titleKey}` as Parameters<typeof t>[0])}
                </h3>
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const active =
                      pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "block rounded-[var(--radius)] px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                            active
                              ? "bg-[var(--accent)]/10 font-medium text-[var(--accent)]"
                              : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
                          )}
                        >
                          {t(`nav.${item.key}` as Parameters<typeof t>[0])}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[var(--surface-border)] pt-4">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                dispatchOpenCommandPalette();
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] px-3.5 py-2 text-sm font-medium hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <Command className="h-4 w-4" aria-hidden="true" />
              {t("common.openCommandPalette")}
            </button>
            <AccentPicker label={t("dock.accent")} />
            <RecruiterModeToggle label={t("common.recruiterMode")} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
