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
  return generatePageMetadata({
    title: "Terms of Service",
    description: "Terms for using this site and its content.",
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
  const site = getSiteContent(locale);

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="Last updated July 6, 2026"
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: "Terms of Service" },
        ]}
      />
      <Section>
        <div className="mx-auto max-w-2xl space-y-4 text-sm leading-relaxed text-[var(--muted-foreground)]">
          <p>
            This site is a personal portfolio for {site.name}. By using it, you
            agree to the following terms.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-[var(--foreground)]">
            Content
          </h2>
          <p>
            All project descriptions, case studies, and written content on this
            site reflect my own real work and experience. Project names, client
            names, and outcomes described are accurate to the best of my
            knowledge. Logos, screenshots, and brand references belong to their
            respective owners and are used here only to illustrate work
            delivered.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-[var(--foreground)]">
            No warranty
          </h2>
          <p>
            This site is provided as-is, without warranties of any kind. While I
            aim for accuracy and keep this site well-maintained, I don&apos;t
            guarantee it will be error-free or available at all times.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-[var(--foreground)]">
            Intellectual property
          </h2>
          <p>
            The design, code, and written content of this site are my own work
            and may not be copied or reused without permission, unless
            explicitly published as open source.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-[var(--foreground)]">
            Freelance engagements
          </h2>
          <p>
            Contacting me through this site does not create a client
            relationship or contractual obligation. Any paid work is governed by
            a separate agreement made directly between us before work begins.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-[var(--foreground)]">
            Contact
          </h2>
          <p>
            Questions about these terms can be sent to{" "}
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
