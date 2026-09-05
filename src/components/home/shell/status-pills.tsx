import { Clock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { AvailabilityBadge } from "@/components/shared/availability-badge";

/**
 * Availability + timezone + the single primary CTA, glanceable in one row —
 * a real `<a>` to WhatsApp, never a fake rating or decorative stat.
 */
export function StatusPills({
  availabilityLabel,
  timezone,
  whatsappHref,
  whatsappLabel,
}: {
  availabilityLabel: string;
  timezone: string;
  whatsappHref: string;
  whatsappLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <AvailabilityBadge label={availabilityLabel} />
      <span className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-3.5 py-1.5 text-sm text-[var(--muted-foreground)]">
        <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {timezone}
      </span>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-1.5 text-sm font-medium text-[var(--accent-foreground)] transition-[filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
      >
        <FaWhatsapp className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {whatsappLabel}
      </a>
    </div>
  );
}
