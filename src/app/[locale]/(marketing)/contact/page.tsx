import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Clock, Globe2, Languages, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GlassCard } from "@/components/shared/glass-card";
import { ContactForm } from "@/components/contact/contact-form";
import { CopyButton } from "@/components/shared/copy-button";
import { SocialLinks } from "@/components/shared/social-links";
import { TrackedLink } from "@/components/shared/tracked-link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/shared/json-ld";
import { getSiteContent } from "@/lib/content/site";
import { generatePageMetadata, faqJsonLd } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/contact",
    locale,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const tc = await getTranslations({ locale, namespace: "pages.contact" });
  const site = getSiteContent(locale);
  const whatsappHref = `${site.socials.whatsapp}?text=${encodeURIComponent(t("hero.whatsappMessage"))}`;

  return (
    <>
      <PageHeader
        eyebrow={t("nav.contact")}
        title={tc("title")}
        subtitle={tc("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.contact") },
        ]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-5">
          <GlassCard hover={false} padding="lg" className="lg:col-span-3">
            <ContactForm />
          </GlassCard>

          <div className="space-y-6 lg:col-span-2">
            <GlassCard hover={false}>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                  <span>{site.contact.responseTime}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe2 className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                  <span>{site.contact.timezone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Languages className="h-4 w-4 shrink-0 translate-y-0.5 text-[var(--accent)]" />
                  <span>
                    {site.contact.languages
                      .map((l) => `${l.name} — ${l.level}`)
                      .join(" · ")}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 border-t border-[var(--surface-border)] pt-6">
                <Button asChild>
                  <TrackedLink
                    label="whatsapp"
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    {tc("whatsappCta")}
                  </TrackedLink>
                </Button>
                <CopyButton
                  value={site.contact.email}
                  label={t("common.copyEmail")}
                  copiedLabel={t("common.emailCopied")}
                />
              </div>

              <SocialLinks socials={site.socials} className="mt-6" />
            </GlassCard>

            <GlassCard hover={false} className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
              <p className="text-sm text-[var(--muted-foreground)]">
                {tc("whatsappHint")}
              </p>
            </GlassCard>
          </div>
        </div>
      </Section>

      <Section className="border-t border-[var(--surface-border)]">
        <h2 className="mb-8 font-[family-name:var(--font-display)] text-2xl font-semibold">
          {tc("faqTitle")}
        </h2>
        <Accordion type="single" collapsible className="mx-auto max-w-3xl">
          {site.contact.faq.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <JsonLd data={faqJsonLd(site.contact.faq)} />
    </>
  );
}
