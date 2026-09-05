import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { getSiteContent } from "@/lib/content/site";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.terms" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/terms",
    locale,
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const tt = await getTranslations({ locale, namespace: "pages.terms" });
  const site = getSiteContent(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={tt("eyebrow")}
        title={tt("title")}
        subtitle={tt("updated")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("footer.terms") },
        ]}
      />
      <Section>
        <div className="mx-auto max-w-2xl space-y-4 text-sm leading-relaxed text-[var(--muted-foreground)]">
          <p>{tt("intro", { name: site.name })}</p>
          <h2 className="mt-8 text-lg font-semibold text-[var(--foreground)]">
            {tt("contentTitle")}
          </h2>
          <p>{tt("contentBody")}</p>
          <h2 className="mt-8 text-lg font-semibold text-[var(--foreground)]">
            {tt("warrantyTitle")}
          </h2>
          <p>{tt("warrantyBody")}</p>
          <h2 className="mt-8 text-lg font-semibold text-[var(--foreground)]">
            {tt("ipTitle")}
          </h2>
          <p>{tt("ipBody")}</p>
          <h2 className="mt-8 text-lg font-semibold text-[var(--foreground)]">
            {tt("freelanceTitle")}
          </h2>
          <p>{tt("freelanceBody")}</p>
          <h2 className="mt-8 text-lg font-semibold text-[var(--foreground)]">
            {tt("contactTitle")}
          </h2>
          <p>
            {tt("contactBody")}{" "}
            <a
              href={site.socials.email}
              className="text-[var(--accent-text)] hover:underline"
            >
              {site.contact.email}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
