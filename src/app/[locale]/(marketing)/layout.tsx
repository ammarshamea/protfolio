import { getLocale, getTranslations } from "next-intl/server";
import { InnerPageCta } from "@/components/layout/inner-page-cta";
import { getSiteContent } from "@/lib/content/site";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
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
