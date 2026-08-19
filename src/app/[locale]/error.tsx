"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/shared/glass-card";
import { AlertTriangle } from "lucide-react";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg items-center justify-center px-6 py-32">
      <GlassCard hover={false} padding="lg" className="w-full text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--danger)]/10 text-[var(--danger)]">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-semibold font-[family-name:var(--font-display)]">
          {t("title")}
        </h1>
        <p className="mt-3 text-[var(--muted-foreground)]">
          {t("description")}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => reset()}>{t("retry")}</Button>
          <Button variant="secondary" asChild>
            <Link href="/">{t("home")}</Link>
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
