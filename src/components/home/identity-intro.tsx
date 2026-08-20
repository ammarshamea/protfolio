import { Link } from "@/i18n/navigation";
import { SectionLabel } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";

export function IdentityIntro({
  label,
  statement,
  description,
  readMoreLabel,
}: {
  label: string;
  statement: string;
  description: string;
  readMoreLabel: string;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
      <div className="lg:col-span-4">
        <FadeIn>
          <SectionLabel index={1} label={label} />
        </FadeIn>
      </div>
      <div className="min-w-0 lg:col-span-8">
        <FadeIn>
          <p className="font-[family-name:var(--font-display)] text-[length:var(--text-h1)] font-semibold tracking-tight">
            {statement}
          </p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <p className="mt-5 max-w-[42rem] text-[length:var(--text-body-lg)] leading-relaxed text-[var(--muted-foreground)]">
            {description}
          </p>
          <Button variant="secondary" className="mt-6" asChild>
            <Link href="/about">{readMoreLabel}</Link>
          </Button>
        </FadeIn>
      </div>
    </div>
  );
}
