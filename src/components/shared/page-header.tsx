"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { ScriptHeading } from "@/components/home/shell/script-heading";
import { cn } from "@/lib/utils";

interface Crumb {
  label: string;
  href?: string;
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  className?: string;
}) {
  const locale = useLocale();

  return (
    <header
      id="page"
      className={cn(
        "border-b border-[var(--surface-border)] pb-12 pt-16 sm:pb-14 sm:pt-20",
        className,
      )}
    >
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-[var(--muted-foreground)]"
          >
            {breadcrumbs.map((crumb, index) => (
              <span
                key={`${crumb.label}-${index}`}
                className="flex items-center gap-1.5"
              >
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-[var(--accent)]"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[var(--foreground)]">
                    {crumb.label}
                  </span>
                )}
                {index < breadcrumbs.length - 1 ? (
                  <ChevronRight
                    className="h-3.5 w-3.5 rtl:rotate-180"
                    aria-hidden="true"
                  />
                ) : null}
              </span>
            ))}
          </nav>
        ) : null}
        {eyebrow ? (
          <ScriptHeading
            eyebrow={eyebrow}
            name={title}
            locale={locale}
            size="page"
          />
        ) : (
          <h1 className="max-w-4xl text-balance font-[family-name:var(--font-display)] text-[length:var(--text-display)] font-semibold leading-[1.02] tracking-tight">
            {title}
          </h1>
        )}
        {subtitle ? (
          <p className="mt-5 max-w-2xl text-[length:var(--text-body-lg)] text-[var(--muted-foreground)]">
            {subtitle}
          </p>
        ) : null}
      </div>
    </header>
  );
}
