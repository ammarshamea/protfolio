"use client";

import { useTranslations } from "next-intl";
import { Compass } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function LocaleNotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
        <Compass className="h-7 w-7" />
      </div>
      <p className="font-[family-name:var(--font-display)] text-7xl font-bold text-[var(--foreground)]">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold font-[family-name:var(--font-display)] sm:text-3xl">
        {t("title")}
      </h1>
      <p className="mt-3 text-[var(--muted-foreground)]">{t("description")}</p>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">
        {t("shortcutHint")}
      </p>

      <Button size="lg" className="mt-8" asChild>
        <Link href="/">{t("cta")}</Link>
      </Button>
    </div>
  );
}
