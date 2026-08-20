import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const EXTERNAL_PATTERN = /^(https?:|mailto:|tel:)/;

interface ArrowLinkProps {
  href?: string;
  className?: string;
  weight?: "regular" | "medium";
  children: React.ReactNode;
}

/**
 * The recurring "view project / read more" micro-interaction: underline
 * grows from the left, arrow shifts up-right on hover. Renders a locale-aware
 * link when `href` is a local path, a plain anchor for external/mailto/tel
 * links, or a plain <span> (no `href`) for nesting inside another link.
 */
export function ArrowLink({
  href,
  className,
  weight = "medium",
  children,
}: ArrowLinkProps) {
  const classes = cn(
    "group inline-flex items-center gap-2 text-[15px]",
    weight === "medium" ? "font-medium" : "font-normal",
    className,
  );

  const content = (
    <>
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100"
        />
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="h-[15px] w-[15px] shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:rotate-[-90deg] rtl:group-hover:translate-x-0.5 rtl:group-hover:-translate-y-0.5"
      />
    </>
  );

  if (!href) {
    return <span className={classes}>{content}</span>;
  }

  if (EXTERNAL_PATTERN.test(href)) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
