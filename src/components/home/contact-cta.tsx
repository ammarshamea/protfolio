import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/shared/section";
import { SocialLinks } from "@/components/shared/social-links";

interface SiteSocials {
  github: string;
  codeberg: string;
  linkedin: string;
  whatsapp: string;
  email: string;
}

export function ContactCta({
  eyebrow,
  headline,
  primaryLabel,
  location,
  availability,
  email,
  socials,
}: {
  eyebrow: string;
  headline: string;
  primaryLabel: string;
  location: string;
  availability: string;
  email: string;
  socials: SiteSocials;
}) {
  return (
    <div className="border-t border-[var(--surface-border)] pt-2">
      <SectionLabel index={6} label={eyebrow} className="mb-5" />
      <h2 className="max-w-2xl font-[family-name:var(--font-display)] text-[length:var(--text-h1)] font-semibold leading-[0.95] tracking-tight text-[var(--cream,#ffeec8)]">
        {headline}
      </h2>

      <div className="mt-10 flex flex-col gap-8 border-t border-[var(--surface-border)] pt-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1.5 text-sm text-[var(--muted-foreground)]">
          <span>{location}</span>
          <span>{availability}</span>
          <a
            href={`mailto:${email}`}
            className="font-medium text-[var(--accent-text)] hover:underline"
          >
            {email}
          </a>
        </div>

        <div className="flex flex-col items-start gap-5 sm:items-end">
          <Button size="lg" asChild>
            <Link href="/contact">{primaryLabel}</Link>
          </Button>
          <SocialLinks socials={socials} variant="footer" />
        </div>
      </div>
    </div>
  );
}
