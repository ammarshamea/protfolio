"use client";

import { FileDown } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Project } from "@/lib/schemas/project";
import type { TechDomainSummary } from "@/lib/content/tech-stack";

interface FastReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  tagline: string;
  summary: string;
  domains: TechDomainSummary[];
  projects: Project[];
  whatsappHref: string;
}

/**
 * Accessible "quick report" dialog built entirely from real content (bio,
 * real tech-stack counts, real featured projects with a real role field) —
 * the honest alternative to a padded, unreadable résumé download.
 * Radix Dialog gives us Escape-to-close, a focus trap, and focus restoration
 * on the trigger for free.
 */
export function FastReportDialog({
  open,
  onOpenChange,
  name,
  tagline,
  summary,
  domains,
  projects,
  whatsappHref,
}: FastReportDialogProps) {
  const t = useTranslations("fastCv");
  const tc = useTranslations("pages.categories");
  const td = useTranslations("pages.projects.detail");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent solid className="max-w-2xl">
        <DialogTitle>
          {name} — {t("title")}
        </DialogTitle>
        <DialogDescription>{tagline}</DialogDescription>

        <div className="mt-2 max-h-[60vh] space-y-6 overflow-y-auto pe-1">
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
              {t("summaryLabel")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
              {summary}
            </p>
          </section>

          {domains.length > 0 ? (
            <section>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                {t("stackLabel")}
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {domains.map((domain) => (
                  <div
                    key={domain.category}
                    className="rounded-[var(--radius)] border border-[var(--surface-border)] bg-[var(--surface)] px-3 py-2 text-center"
                  >
                    <p className="text-lg font-semibold tabular-nums">
                      {domain.count}
                    </p>
                    <p className="text-[11px] text-[var(--muted-foreground)]">
                      {tc(domain.category)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {projects.length > 0 ? (
            <section>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                {t("projectsLabel")}
              </h3>
              <ul className="mt-3 space-y-3">
                {projects.map((project) => (
                  <li key={project.slug}>
                    <Link
                      href={`/projects/${project.slug}`}
                      onClick={() => onOpenChange(false)}
                      className="block rounded-[var(--radius)] border border-[var(--surface-border)] bg-[var(--surface)] p-3 transition-colors hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <p className="font-medium">{project.title}</p>
                        <span className="shrink-0 text-xs text-[var(--muted-foreground)]">
                          {td("role")} · {project.role}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                        {project.tagline}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-[var(--surface-border)] pt-5">
          <Button asChild>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
              {t("chatWhatsapp")}
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/resume" onClick={() => onOpenChange(false)}>
              <FileDown className="h-4 w-4" aria-hidden="true" />
              {t("viewFullResume")}
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
