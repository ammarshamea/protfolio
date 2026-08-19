import { GlassCard } from "@/components/shared/glass-card";
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
    <StaggerContainer className="grid gap-6 sm:grid-cols-2">
      {values.map((value) => (
        <StaggerItem key={value.title}>
          <GlassCard className="h-full">
            <h3 className="font-semibold">{value.title}</h3>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              {value.description}
            </p>
          </GlassCard>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
