"use client";

import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { footerNavGroups } from "@/lib/navigation";
import { recruiterModeConfig } from "@/lib/recruiter-mode";
import { useRecruiterMode } from "@/hooks/use-recruiter-mode";
import { ThemeToggle } from "./theme-toggle";
import { AccentPicker } from "./accent-picker";
import { LocaleSwitcher } from "./locale-switcher";
import { RecruiterModeToggle } from "./recruiter-mode-toggle";

export function MobileNav({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations();
  const { enabled: recruiterMode } = useRecruiterMode();
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
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="glass ms-auto flex h-full w-[85%] max-w-sm flex-col gap-8 overflow-y-auto p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-display)] text-lg font-semibold">
                {t("nav.menu")}
              </span>
              <button
                onClick={() => onOpenChange(false)}
                aria-label={t("nav.close")}
                className="rounded-full p-2 hover:bg-[var(--surface)]"
              >
                &times;
              </button>
            </div>

            {visibleGroups.map((group) => (
              <div key={group.titleKey}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
                  {t(`nav.${group.titleKey}` as Parameters<typeof t>[0])}
                </p>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => onOpenChange(false)}
                        className="block rounded-lg px-2 py-2 text-sm font-medium transition-colors hover:bg-[var(--surface)] hover:text-[var(--accent)]"
                      >
                        {t(`nav.${item.key}` as Parameters<typeof t>[0])}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="mt-auto flex items-center gap-1 border-t border-[var(--surface-border)] pt-6">
              <ThemeToggle label={t("common.toggleTheme")} />
              <AccentPicker label="Accent color" />
              <LocaleSwitcher label={t("common.toggleLocale")} />
              <RecruiterModeToggle label={t("common.recruiterMode")} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
