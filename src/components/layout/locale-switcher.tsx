"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LocaleSwitcher({ label }: { label: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const nextLocale = locale === "en" ? "ar" : "en";

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={`${label}: ${nextLocale.toUpperCase()}`}
      className="h-9 px-2.5 sm:px-4"
      onClick={() =>
        router.replace(
          // @ts-expect-error - dynamic pathname is valid at runtime
          { pathname, params },
          { locale: nextLocale },
        )
      }
    >
      {nextLocale.toUpperCase()}
    </Button>
  );
}
