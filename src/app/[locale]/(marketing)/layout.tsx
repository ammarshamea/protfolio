import { getTranslations } from "next-intl/server";
import { InnerPageCta } from "@/components/layout/inner-page-cta";
import { getSiteContent } from "@/lib/content/site";

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const site = getSiteContent(locale);
  const whatsappHref = `${site.socials.whatsapp}?text=${encodeURIComponent(t("hero.whatsappMessage"))}`;

  return (
    <>
      {children}
      <InnerPageCta
        whatsappHref={whatsappHref}
        headline={t("home.contactHeadline")}
      />
    </>
  );
}
