import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GlassCard } from "@/components/shared/glass-card";
import { FadeIn } from "@/components/motion/fade-in";
import { getNow } from "@/lib/content/misc";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: "Now",
    description:
      "What I'm currently focused on — shipping, learning, and building.",
    path: "/now",
    locale,
  });
}

export default async function NowPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const now = getNow(locale);
  const updated = new Date(now.updatedAt).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <PageHeader
        eyebrow={t("nav.now")}
        title={now.heroStatus}
        subtitle={`Last updated ${updated}`}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.now") },
        ]}
      />
      <Section>
        <h2 className="sr-only">Current focus</h2>
        <div className="mx-auto max-w-2xl space-y-4">
          {now.items.map((item, index) => (
            <FadeIn key={item.label} delay={index * 0.05}>
              <GlassCard hover={false}>
                <h3 className="font-semibold">{item.label}</h3>
                {item.detail ? (
                  <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                    {item.detail}
                  </p>
                ) : null}
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
