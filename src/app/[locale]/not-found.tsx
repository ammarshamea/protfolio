import { getTranslations, getLocale } from "next-intl/server";
import { Compass } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/shared/glass-card";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { BrandedImageFallback } from "@/components/shared/branded-image-fallback";
import { getAllProjects } from "@/lib/content/projects";

export default async function LocaleNotFound() {
  const t = await getTranslations("notFound");
  const locale = await getLocale();
  const projects = getAllProjects(locale);
  // A different suggestion per request is intentional here — this route is never statically cached.
  // eslint-disable-next-line react-hooks/purity
  const suggestion = projects[Math.floor(Math.random() * projects.length)];

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-6 py-32 text-center">
      <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
        <Compass className="h-7 w-7" />
      </div>
      <p className="font-[family-name:var(--font-display)] text-7xl font-bold text-gradient">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold font-[family-name:var(--font-display)] sm:text-3xl">
        {t("title")}
      </h1>
      <p className="mt-3 text-[var(--muted-foreground)]">{t("description")}</p>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">
        {t("shortcutHint")}
      </p>

      <MagneticButton className="mt-8">
        <Button size="lg" asChild>
          <Link href="/">{t("cta")}</Link>
        </Button>
      </MagneticButton>

      {suggestion ? (
        <GlassCard
          padding="sm"
          className="mt-16 w-full max-w-sm text-left rtl:text-right"
        >
          <Link href={`/projects/${suggestion.slug}`} className="block">
            <BrandedImageFallback
              title={suggestion.title}
              stack={suggestion.stack}
              className="aspect-[16/9]"
            />
            <p className="mt-4 text-sm font-medium">{suggestion.title}</p>
            <p className="text-xs text-[var(--muted-foreground)]">
              {suggestion.tagline}
            </p>
          </Link>
        </GlassCard>
      ) : null}
    </div>
  );
}
