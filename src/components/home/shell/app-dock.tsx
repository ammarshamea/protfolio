"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Home,
  Layers,
  FolderKanban,
  FileText,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { DockMoreSheet } from "./dock-more-sheet";
import { FastReportDialog } from "./fast-report-dialog";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Project } from "@/lib/schemas/project";
import type { TechDomainSummary } from "@/lib/content/tech-stack";
import { cn } from "@/lib/utils";

interface DockLink {
  key: "home" | "stack" | "projects" | "contact";
  href: string;
  icon: LucideIcon;
}

const START_LINKS: DockLink[] = [
  { key: "home", href: "/", icon: Home },
  { key: "stack", href: "/tech-stack", icon: Layers },
];

const END_LINKS: DockLink[] = [
  { key: "projects", href: "/projects", icon: FolderKanban },
  { key: "contact", href: "/contact", icon: MessageCircle },
];

const itemClass =
  "relative flex items-center gap-2 rounded-[var(--radius)] px-2 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:px-3.5 sm:py-2.5";

export interface FastCvContent {
  name: string;
  tagline: string;
  summary: string;
  domains: TechDomainSummary[];
  projects: Project[];
  whatsappHref: string;
}

function isDockActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/tech-stack") {
    return pathname === "/tech-stack" || pathname.startsWith("/stack/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Sliding active pill — one shared layoutId so it glides between dock items. */
function ActivePill() {
  const reduced = useReducedMotion();
  const pillClass =
    "absolute inset-0 rounded-[var(--radius)] bg-[var(--accent)]/12";
  if (reduced) {
    return <span aria-hidden="true" className={pillClass} />;
  }
  return (
    <motion.span
      layoutId="dock-active-pill"
      aria-hidden="true"
      className={pillClass}
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
    />
  );
}

/**
 * Site-wide bottom navigation. Every primary destination is a real `Link`.
 * Fast CV opens an accessible dialog with a `/resume` fallback; More holds
 * the rest of the sitemap so the top header is no longer required.
 */
export function AppDock({ fastCv }: { fastCv?: FastCvContent }) {
  const t = useTranslations("dock");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [fastCvOpen, setFastCvOpen] = useState(false);
  const fastCvActive = pathname === "/resume";

  return (
    <>
      <nav
        aria-label={t("ariaLabel")}
        className="fixed inset-x-0 bottom-[max(0.65rem,env(safe-area-inset-bottom))] z-40 flex justify-center px-2 sm:bottom-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-4"
      >
        <div className="flex max-w-[calc(100vw-0.5rem)] items-center gap-0.5 overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--surface-border)] bg-[var(--background)]/92 p-1 sm:p-1.5">
          {START_LINKS.map((item) => (
            <DockLinkItem
              key={item.key}
              item={item}
              label={t(item.key)}
              active={isDockActive(pathname, item.href)}
            />
          ))}

          {fastCv ? (
            <button
              type="button"
              onClick={() => setFastCvOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={fastCvOpen}
              aria-label={t("openFastCv")}
              className={cn(
                itemClass,
                fastCvActive
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
              )}
            >
              {fastCvActive ? <ActivePill /> : null}
              <FileText
                className="relative h-[18px] w-[18px] shrink-0"
                aria-hidden="true"
              />
              <span className="relative sr-only sm:not-sr-only">
                {t("fastCv")}
              </span>
            </button>
          ) : (
            <Link
              href="/resume"
              aria-label={t("fastCv")}
              aria-current={fastCvActive ? "page" : undefined}
              className={cn(
                itemClass,
                fastCvActive
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
              )}
            >
              {fastCvActive ? <ActivePill /> : null}
              <FileText
                className="relative h-[18px] w-[18px] shrink-0"
                aria-hidden="true"
              />
              <span className="relative sr-only sm:not-sr-only">
                {t("fastCv")}
              </span>
            </Link>
          )}

          {END_LINKS.map((item) => (
            <DockLinkItem
              key={item.key}
              item={item}
              label={t(item.key)}
              active={isDockActive(pathname, item.href)}
            />
          ))}

          <div
            aria-hidden="true"
            className="mx-1 hidden h-6 w-px shrink-0 bg-[var(--surface-border)] min-[420px]:block"
          />
          <DockMoreSheet />
          <ThemeToggle label={tCommon("toggleTheme")} />
          <LocaleSwitcher label={tCommon("toggleLocale")} />
        </div>
      </nav>

      {fastCv ? (
        <FastReportDialog
          open={fastCvOpen}
          onOpenChange={setFastCvOpen}
          name={fastCv.name}
          tagline={fastCv.tagline}
          summary={fastCv.summary}
          domains={fastCv.domains}
          projects={fastCv.projects}
          whatsappHref={fastCv.whatsappHref}
        />
      ) : null}
    </>
  );
}

function DockLinkItem({
  item,
  label,
  active,
}: {
  item: DockLink;
  label: string;
  active: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      aria-label={label}
      className={cn(
        itemClass,
        active
          ? "text-[var(--accent)]"
          : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
      )}
    >
      {active ? <ActivePill /> : null}
      <Icon
        className="relative h-[18px] w-[18px] shrink-0"
        aria-hidden="true"
      />
      <span className="relative sr-only sm:not-sr-only">{label}</span>
    </Link>
  );
}
