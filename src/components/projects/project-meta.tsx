import { cn } from "@/lib/utils";

interface MetaField {
  label: string;
  value: string;
}

export function ProjectMeta({
  fields,
  className,
}: {
  fields: MetaField[];
  className?: string;
}) {
  return (
    <dl className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", className)}>
      {fields.map((field) => (
        <div
          key={field.label}
          className="min-w-0 rounded-[var(--radius-lg)] border border-[var(--surface-border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-card)]"
        >
          <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--accent)]">
            {field.label}
          </dt>
          <dd className="mt-2 text-sm font-medium leading-snug">{field.value}</dd>
        </div>
      ))}
    </dl>
  );
}
