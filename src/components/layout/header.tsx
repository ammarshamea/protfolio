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

interface SiteSocials {
  github: string;
  codeberg: string;
  linkedin: string;
  whatsapp: string;
  email: string;
}

export function Header({
  socials,
  contactEmail,
}: {
  socials: SiteSocials;
  contactEmail: string;
}) {
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

  // The home page replaces this header with the bottom AppDock, so its own real
  // routes (/, /tech-stack, /projects, /contact) stay crawlable without a heavy
  // top bar competing with the hero for attention.
  if (pathname === "/") return null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 overflow-x-clip transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-b border-[var(--surface-border)] bg-[var(--background)]/90 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-[var(--background)]/70 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-18 max-w-[90rem] items-center justify-between px-6 sm:px-10">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {visibleNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative py-2 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]",
                  isActive && "text-[var(--foreground)]",
                )}
              >
                {t(`nav.${item.key}` as Parameters<typeof t>[0])}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-[var(--accent)] transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Button size="sm" className="hidden lg:inline-flex" asChild>
            <Link href="/contact">{t("common.getInTouch")}</Link>
          </Button>
          <div className="hidden items-center gap-0.5 border-s border-[var(--surface-border)] ps-2 sm:flex">
            <Button
              variant="ghost"
              size="icon"
              onClick={dispatchOpenCommandPalette}
              aria-label={t("common.openCommandPalette")}
            >
              <Command className="h-[18px] w-[18px]" aria-hidden="true" />
            </Button>
            <div className="hidden items-center lg:flex">
              <ThemeToggle label={t("common.toggleTheme")} />
              <AccentPicker label="Accent color" />
              <LocaleSwitcher label={t("common.toggleLocale")} />
              <RecruiterModeToggle label={t("common.recruiterMode")} />
            </div>
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
      <MobileNav
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        socials={socials}
        contactEmail={contactEmail}
      />
    </header>
  );
}
