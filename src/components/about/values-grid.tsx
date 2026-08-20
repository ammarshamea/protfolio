import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-children";

export function ValuesGrid({
  values,
}: {
  values: { title: string; description: string }[];
}) {
  return (
    <StaggerContainer className="grid gap-4 sm:grid-cols-2">
      {values.map((value, index) => (
        <StaggerItem
          key={value.title}
          className="rounded-[var(--radius-lg)] border border-[var(--surface-border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 font-semibold">{value.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
            {value.description}
          </p>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
