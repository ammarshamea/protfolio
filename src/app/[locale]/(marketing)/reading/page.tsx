import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/ui/badge";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-children";
import { getReading } from "@/lib/content/misc";
import { generatePageMetadata } from "@/lib/seo";
import type { ReadingItem } from "@/lib/schemas/misc";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.reading" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/reading",
    locale,
  });
}

const STATUS_VARIANT: Record<
  ReadingItem["status"],
  "success" | "accent" | "default"
> = {
  completed: "success",
  reading: "accent",
  queued: "default",
};

export default async function ReadingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const tr = await getTranslations({ locale, namespace: "pages.reading" });
  const books = getReading(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={`${t("nav.reading")} · ${books.length}`}
        title={tr("title")}
        subtitle={tr("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.reading") },
        ]}
      />
      <Section>
        <h2 className="sr-only">{tr("srTitle")}</h2>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2">
          {books.map((book) => (
            <StaggerItem key={book.title}>
              <GlassCard className="h-full">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{book.title}</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {book.author}
                    </p>
                  </div>
                  <Badge
                    variant={STATUS_VARIANT[book.status]}
                    className="shrink-0"
                  >
                    {tr(`status.${book.status}`)}
                  </Badge>
                </div>
                {book.note ? (
                  <p className="mt-3 text-sm text-[var(--muted-foreground)]">
                    {book.note}
                  </p>
                ) : null}
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>
    </>
  );
}
