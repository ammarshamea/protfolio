import type { ServiceItem } from "@/lib/schemas/misc";

export function Capabilities({ services }: { services: ServiceItem[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service, index) => (
        <article
          key={service.slug}
          className="flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--surface-border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--accent)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">
            {service.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
            {service.description}
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            {service.deliverables.slice(0, 4).map((item) => (
              <li key={item} className="flex gap-2">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
