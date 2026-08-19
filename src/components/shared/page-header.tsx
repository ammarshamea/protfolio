import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
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
  return (
    <header
      className={cn(
        "border-b border-[var(--surface-border)] pb-14 pt-32 sm:pt-40",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-6">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-[var(--muted-foreground)]"
          >
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
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
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--accent-text)]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-4xl font-semibold tracking-tight font-[family-name:var(--font-display)] sm:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
            {subtitle}
          </p>
        ) : null}
      </div>
    </header>
  );
}
