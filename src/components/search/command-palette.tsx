"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import {
  Folder,
  FileText,
  Cpu,
  Terminal,
  ExternalLink,
  Sun,
  Moon,
  Contrast,
  Mail,
  Download,
  Languages,
  Printer,
  MessageSquare,
} from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { useRouter, usePathname } from "@/i18n/navigation";
import { createFuse, type SearchItem } from "@/lib/search";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { OPEN_COMMAND_PALETTE_EVENT } from "@/lib/command-palette-events";
import { trackEvent } from "@/lib/track";
import { ShortcutsDialog } from "./shortcuts-dialog";
import type { SiteContent } from "@/lib/schemas/site";

const GROUP_ICONS = {
  projects: Folder,
  pages: FileText,
  technologies: Cpu,
};

export function CommandPalette({
  items,
  socials,
  email,
}: {
  items: SearchItem[];
  socials: SiteContent["socials"];
  email: string;
}) {
  const [open, setOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  const nextLocale = locale === "en" ? "ar" : "en";
  const t = useTranslations();

  const fuse = useMemo(() => createFuse(items), [items]);
  const results = query
    ? fuse.search(query).map((r) => r.item)
    : items.slice(0, 8);

  const grouped = useMemo(() => {
    return {
      projects: results.filter((r) => r.group === "projects").slice(0, 5),
      pages: results.filter((r) => r.group === "pages").slice(0, 6),
      technologies: results
        .filter((r) => r.group === "technologies")
        .slice(0, 5),
    };
  }, [results]);

  const goHome = useCallback(() => router.push("/"), [router]);
  const goProjects = useCallback(() => router.push("/projects"), [router]);
  const goAbout = useCallback(() => router.push("/about"), [router]);

  useKeyboardShortcuts({
    onOpenPalette: () => setOpen((prev) => !prev),
    onGoHome: goHome,
    onGoProjects: goProjects,
    onGoAbout: goAbout,
    onShowShortcuts: () => setShortcutsOpen(true),
  });

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setQuery("");
  }

  useEffect(() => {
    const listener = () => setOpen(true);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, listener);
    return () =>
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, listener);
  }, []);

  function navigate(href: string) {
    if (query.trim()) trackEvent({ type: "search_query", label: query.trim() });
    const withoutLocale = href.replace(new RegExp(`^/${locale}`), "") || "/";
    router.push(withoutLocale);
    setOpen(false);
  }

  return (
    <>
      <CommandDialog
        open={open}
        onOpenChange={handleOpenChange}
        title={t("common.openCommandPalette")}
      >
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder={t("common.searchPlaceholder")}
        />
        <CommandList>
          <CommandEmpty>{t("common.noResults")}</CommandEmpty>

          {grouped.pages.length > 0 && (
            <CommandGroup heading={t("common.pagesGroup")}>
              {grouped.pages.map((item) => {
                const Icon = GROUP_ICONS.pages;
                return (
                  <CommandItem
                    key={item.id}
                    onSelect={() => navigate(item.href)}
                  >
                    <Icon className="h-4 w-4" />
                    {t(`nav.${item.title}` as Parameters<typeof t>[0])}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          {grouped.projects.length > 0 && (
            <CommandGroup heading={t("nav.projects")}>
              {grouped.projects.map((item) => {
                const Icon = GROUP_ICONS.projects;
                return (
                  <CommandItem
                    key={item.id}
                    onSelect={() => navigate(item.href)}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          {grouped.technologies.length > 0 && (
            <CommandGroup heading={t("nav.techStack")}>
              {grouped.technologies.map((item) => {
                const Icon = GROUP_ICONS.technologies;
                return (
                  <CommandItem
                    key={item.id}
                    onSelect={() => navigate(item.href)}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          <CommandGroup heading={t("common.commandsGroup")}>
            <CommandItem
              onSelect={() => {
                setTheme("light");
                setOpen(false);
              }}
            >
              <Sun className="h-4 w-4" /> Switch to light theme
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setTheme("dark");
                setOpen(false);
              }}
            >
              <Moon className="h-4 w-4" /> Switch to dark theme
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setTheme("high-contrast");
                setOpen(false);
              }}
            >
              <Contrast className="h-4 w-4" /> Switch to high-contrast theme
            </CommandItem>
            <CommandItem
              onSelect={() => {
                navigator.clipboard.writeText(email);
                setOpen(false);
              }}
            >
              <Mail className="h-4 w-4" /> {t("common.copyEmail")}
            </CommandItem>
            <CommandItem onSelect={() => navigate("/resume")}>
              <Download className="h-4 w-4" /> {t("common.downloadResume")}
            </CommandItem>
            <CommandItem
              onSelect={() => {
                window.print();
                setOpen(false);
              }}
            >
              <Printer className="h-4 w-4" /> {t("common.printResume")}
            </CommandItem>
            <CommandItem onSelect={() => navigate("/contact")}>
              <MessageSquare className="h-4 w-4" /> {t("nav.contact")}
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                router.replace(
                  // @ts-expect-error - dynamic pathname is valid at runtime
                  { pathname, params },
                  { locale: nextLocale },
                );
              }}
            >
              <Languages className="h-4 w-4" /> {t("common.toggleLocale")} (
              {nextLocale.toUpperCase()})
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading={t("common.externalGroup")}>
            <CommandItem onSelect={() => window.open(socials.github, "_blank")}>
              <ExternalLink className="h-4 w-4" /> GitHub
            </CommandItem>
            <CommandItem
              onSelect={() => window.open(socials.linkedin, "_blank")}
            >
              <ExternalLink className="h-4 w-4" /> LinkedIn
            </CommandItem>
            <CommandItem
              onSelect={() => window.open(socials.whatsapp, "_blank")}
            >
              <Terminal className="h-4 w-4" /> WhatsApp
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <ShortcutsDialog
        open={shortcutsOpen}
        onOpenChange={setShortcutsOpen}
        title={t("shortcuts.title")}
        shortcuts={[
          { keys: "Ctrl / \u2318 + K", label: t("shortcuts.openPalette") },
          { keys: "G then H", label: t("shortcuts.goHome") },
          { keys: "G then P", label: t("shortcuts.goProjects") },
          { keys: "G then A", label: t("shortcuts.goAbout") },
          { keys: "?", label: t("shortcuts.showShortcuts") },
        ]}
      />
    </>
  );
}
