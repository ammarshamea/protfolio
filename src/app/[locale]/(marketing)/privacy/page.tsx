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
    title: "Privacy Policy",
    description: "What data this site collects and how it's used.",
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
  const site = getSiteContent(locale);

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Last updated July 6, 2026"
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: "Privacy Policy" },
        ]}
      />
      <Section>
        <div className="mx-auto max-w-2xl space-y-4 text-sm leading-relaxed text-[var(--muted-foreground)]">
          <p>
            This site is a personal portfolio for {site.name}. It collects very
            little data, and this page explains exactly what and why.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-[var(--foreground)]">
            Contact form
          </h2>
          <p>
            If you use the contact form, the name, email address, and message
            you submit are sent directly to my email inbox so I can reply. This
            data is not stored in a database on this site, not sold, and not
            shared with third parties beyond the email delivery provider used to
            send the message.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-[var(--foreground)]">
            Cookies and local storage
          </h2>
          <p>
            This site stores your theme (dark, light, or high contrast) and
            accent color choice in your browser&apos;s local storage so your
            preference persists between visits. No tracking or advertising
            cookies are used.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-[var(--foreground)]">
            Hosting and analytics
          </h2>
          <p>
            This site is hosted on Vercel, which may process standard server
            logs (such as IP address and request metadata) as part of serving
            the site. Any analytics added in the future will be
            privacy-respecting and will not track you across other websites.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-[var(--foreground)]">
            Contact
          </h2>
          <p>
            Questions about this policy can be sent to{" "}
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
