import { Link } from "@/i18n/navigation";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-lg font-semibold tracking-tight"
    >
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] font-[family-name:var(--font-display)] text-sm font-bold text-white"
      >
        AS
      </span>
      <span className="font-[family-name:var(--font-display)] max-sm:sr-only">
        Ammar Shamea
      </span>
    </Link>
  );
}
