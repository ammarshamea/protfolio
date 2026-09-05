"use client";

import { MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/section";

/**
 * Closing strip on every inner marketing page so the dock is never the only
 * way to convert. Hidden on `/` because the homepage already has its own CTA.
 */
export function InnerPageCta({
  whatsappHref,
  headline,
}: {
  whatsappHref: string;
  headline: string;
}) {
  const pathname = usePathname();
  const t = useTranslations();

  if (pathname === "/") return null;

  return (
    <Section rhythm="compact">
      <div className="rounded-[var(--radius-xl)] border border-[var(--surface-border)] bg-[var(--surface)] px-6 py-8 shadow-[var(--shadow-card)] sm:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-[family-name:var(--font-display)] text-[length:var(--text-h2)] font-semibold tracking-tight">
            {headline}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                {t("hero.whatsappCta")}
              </a>
            </Button>
            {pathname !== "/contact" ? (
              <Button variant="outline" asChild>
                <Link href="/contact">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {t("common.getInTouch")}
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
}
