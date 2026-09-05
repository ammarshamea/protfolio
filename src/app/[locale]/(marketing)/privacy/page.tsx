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
  const t = await getTranslations({ locale, namespace: "pages.privacy" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/privacy",
    locale,
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const tp = await getTranslations({ locale, namespace: "pages.privacy" });
  const site = getSiteContent(locale);

  return (
    <>
      <PageHeader
        eyebrow={tp("eyebrow")}
        title={tp("title")}
        subtitle={tp("updated")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("footer.privacy") },
        ]}
      />
      <Section>
        <div className="mx-auto max-w-2xl space-y-4 text-sm leading-relaxed text-[var(--muted-foreground)]">
          <p>{tp("intro", { name: site.name })}</p>
          <h2 className="mt-8 text-lg font-semibold text-[var(--foreground)]">
            {tp("formTitle")}
          </h2>
          <p>{tp("formBody")}</p>
          <h2 className="mt-8 text-lg font-semibold text-[var(--foreground)]">
            {tp("cookiesTitle")}
          </h2>
          <p>{tp("cookiesBody")}</p>
          <h2 className="mt-8 text-lg font-semibold text-[var(--foreground)]">
            {tp("hostingTitle")}
          </h2>
          <p>{tp("hostingBody")}</p>
          <h2 className="mt-8 text-lg font-semibold text-[var(--foreground)]">
            {tp("contactTitle")}
          </h2>
          <p>
            {tp("contactBody")}{" "}
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
