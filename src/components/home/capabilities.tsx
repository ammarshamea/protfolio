import type { ServiceItem } from "@/lib/schemas/misc";

export function Capabilities({ services }: { services: ServiceItem[] }) {
  return (
    <div className="grid gap-0 border-t border-[var(--surface-border)] md:grid-cols-2 xl:grid-cols-3">
      {services.map((service, index) => (
        <article
          key={service.slug}
          className="flex h-full flex-col border-b border-[var(--surface-border)] px-0 py-8 md:border-e md:px-8 md:first:ps-0 xl:[&:nth-child(3n)]:border-e-0"
        >
          <span className="font-[family-name:var(--font-display)] text-[11px] font-medium italic text-[var(--accent-text)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--cream,#ffeec8)]">
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
                  className="mt-2 h-px w-4 shrink-0 bg-[var(--accent)]"
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
