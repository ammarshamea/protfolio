"use client";

import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SocialLinks } from "@/components/shared/social-links";
import { primaryNav, footerNavGroups } from "@/lib/navigation";
import { recruiterModeConfig } from "@/lib/recruiter-mode";
import { useRecruiterMode } from "@/hooks/use-recruiter-mode";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";

interface SiteSocials {
  github: string;
  codeberg: string;
  linkedin: string;
  whatsapp: string;
  email: string;
}

export function MobileNav({
  open,
  onOpenChange,
  socials,
  contactEmail,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  socials: SiteSocials;
  contactEmail: string;
}) {
  const t = useTranslations();
  const { enabled: recruiterMode } = useRecruiterMode();
  const mainItems = [{ key: "home", href: "/" }, ...primaryNav];
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
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[var(--background)] text-[var(--foreground)] lg:hidden"
        >
          <div className="flex items-center justify-between px-6 pt-6 sm:px-10">
            <span className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.2em] opacity-60">
              {t("nav.menu")}
            </span>
            <button
              onClick={() => onOpenChange(false)}
              aria-label={t("nav.close")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--surface-border)] transition-colors hover:border-[var(--accent)]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Primary"
            className="flex flex-1 flex-col justify-center gap-1 px-6 py-10 sm:px-10"
          >
            {mainItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + index * 0.05, duration: 0.4 }}
              >
                <Link
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className="group flex items-baseline gap-4 py-2.5"
                >
                  <span className="text-[length:var(--text-label)] tabular-nums opacity-40">
                    {String(index).padStart(2, "0")}
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-[length:var(--text-h1)] font-semibold tracking-tight">
                    {t(`nav.${item.key}` as Parameters<typeof t>[0])}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="grid grid-cols-2 gap-6 border-t border-[var(--surface-border)] px-6 py-8 sm:grid-cols-4 sm:px-10">
            {visibleGroups.map((group) => (
              <div key={group.titleKey}>
                <p className="mb-3 text-[length:var(--text-label)] uppercase tracking-[0.15em] opacity-40">
                  {t(`nav.${group.titleKey}` as Parameters<typeof t>[0])}
                </p>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => onOpenChange(false)}
                        className="text-sm opacity-70 transition-opacity hover:opacity-100"
                      >
                        {t(`nav.${item.key}` as Parameters<typeof t>[0])}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-[var(--surface-border)] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <a
              href={socials.email}
              className="text-sm underline-offset-4 opacity-70 hover:underline hover:opacity-100"
            >
              {contactEmail}
            </a>
            <div className="flex items-center gap-3">
              <SocialLinks socials={socials} variant="footer" />
              <div className="ms-2 flex items-center border-s border-[var(--surface-border)] ps-2">
                <ThemeToggle label={t("common.toggleTheme")} />
                <LocaleSwitcher label={t("common.toggleLocale")} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
