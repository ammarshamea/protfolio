import { Link } from "@/i18n/navigation";

export function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 text-[15px] font-medium tracking-tight text-[var(--foreground)]"
    >
      <span
        aria-hidden="true"
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] font-[family-name:var(--font-display)] text-[11px] font-semibold text-[var(--accent-foreground)]"
      >
        AS
      </span>
      <span className="font-[family-name:var(--font-display)] max-sm:sr-only">
        Ammar Shamea
      </span>
    </Link>
  );
}
