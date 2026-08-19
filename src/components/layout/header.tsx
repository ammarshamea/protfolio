"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Command, Menu } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { AccentPicker } from "./accent-picker";
import { LocaleSwitcher } from "./locale-switcher";
import { RecruiterModeToggle } from "./recruiter-mode-toggle";
import { MobileNav } from "./mobile-nav";
import { primaryNav } from "@/lib/navigation";
import { recruiterModeConfig } from "@/lib/recruiter-mode";
import { useRecruiterMode } from "@/hooks/use-recruiter-mode";
import { dispatchOpenCommandPalette } from "@/lib/command-palette-events";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const { enabled: recruiterMode } = useRecruiterMode();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const visibleNav = recruiterMode
    ? primaryNav.filter(
        (item) => !recruiterModeConfig.hiddenRoutes.includes(item.key),
      )
    : primaryNav;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "glass shadow-sm" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {visibleNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-[var(--accent-text)]",
                  isActive
                    ? "text-[var(--accent-text)]"
                    : "text-[var(--foreground)]",
                )}
              >
                {t(`nav.${item.key}` as Parameters<typeof t>[0])}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={dispatchOpenCommandPalette}
            aria-label={t("common.openCommandPalette")}
          >
            <Command className="h-3.5 w-3.5" />
            <kbd className="kbd text-[10px] leading-none">K</kbd>
          </Button>
          <div className="hidden sm:flex sm:items-center">
            <ThemeToggle label={t("common.toggleTheme")} />
            <AccentPicker label="Accent color" />
            <LocaleSwitcher label={t("common.toggleLocale")} />
            <RecruiterModeToggle label={t("common.recruiterMode")} />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label={t("nav.menu")}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </header>
  );
}
