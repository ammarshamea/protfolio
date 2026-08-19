"use client";

import { Download, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRecruiterMode } from "@/hooks/use-recruiter-mode";

/** Sticky bar shown at the very top of the viewport while Recruiter Mode is active. */
export function RecruiterModeBar() {
  const t = useTranslations();
  const { enabled, toggle } = useRecruiterMode();

  if (!enabled) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-11 items-center justify-center gap-4 bg-[var(--accent)] px-4 text-sm font-medium text-[var(--accent-foreground)]">
      <span>{t("common.recruiterMode")}</span>
      <Link
        href="/resume"
        className="inline-flex items-center gap-1.5 rounded-full bg-black/10 px-3 py-1 hover:bg-black/20"
      >
        <Download className="h-3.5 w-3.5" aria-hidden="true" />
        {t("common.downloadResume")}
      </Link>
      <button
        onClick={toggle}
        aria-label={t("nav.close")}
        className="ms-2 rounded-full p-1 hover:bg-black/10"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
