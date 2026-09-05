import type { Metadata, Viewport } from "next";
import { Inter, Sora, Noto_Sans_Arabic } from "next/font/google";
import { PwaProvider } from "@/components/providers/pwa-provider";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AccentProvider } from "@/components/providers/accent-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Footer } from "@/components/layout/footer";
import { RecruiterModeBar } from "@/components/layout/recruiter-mode-bar";
import { SiteDock } from "@/components/layout/site-dock";
import { CommandPalette } from "@/components/search/command-palette";
import { JsonLd } from "@/components/shared/json-ld";
import { AnalyticsTracker } from "@/components/shared/analytics-tracker";
import { AnalyticsProviders } from "@/components/shared/analytics-providers";
import { buildSearchIndex } from "@/lib/search-index";
import { getSiteContent } from "@/lib/content/site";
import { getAllTechnologies } from "@/lib/content/tech-stack";
import { getServices } from "@/lib/content/misc";
import { personJsonLd, websiteJsonLd, SITE_URL } from "@/lib/seo";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07140f" },
    { media: "(prefers-color-scheme: light)", color: "#f7faf8" },
  ],
  colorScheme: "dark light",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const site = getSiteContent(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${site.name} — ${site.titles[0]}`,
      template: `%s — ${site.name}`,
    },
    description: site.bio.short,
    keywords: [
      ...site.titles,
      "Flutter developer",
      "Full stack developer",
      "Damascus",
      "Syria",
    ],
    authors: [{ name: site.name, url: SITE_URL }],
    creator: site.name,
    manifest: "/manifest.webmanifest",
    other: {
      "msapplication-config": "/browserconfig.xml",
    },
    openGraph: {
      type: "website",
      locale,
      siteName: site.name,
      title: `${site.name} — ${site.titles[0]}`,
      description: site.bio.short,
      images: [
        {
          url:
            process.env.NEXT_PUBLIC_STATIC_EXPORT === "true"
              ? "/images/ammar-portrait.png"
              : `/og?title=${encodeURIComponent(`${site.name} — ${site.titles[0]}`)}`,
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale });
  const site = getSiteContent(locale);
  const searchItems = buildSearchIndex(locale);
  const technologies = getAllTechnologies(locale);
  const services = getServices(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable} ${notoSansArabic.variable}`}
      data-accent="emerald"
      data-scroll-behavior="smooth"
    >
      <body className="antialiased" suppressHydrationWarning>
        <PwaProvider>
          <AnalyticsTracker />
          <a href="#main-content" className="skip-link">
            {t("common.skipToContent")}
          </a>
          <NextIntlClientProvider locale={locale}>
            <ThemeProvider
              attribute="data-theme"
              defaultTheme="light"
              themes={["light", "dark", "high-contrast"]}
              enableSystem={false}
              disableTransitionOnChange
            >
              <AccentProvider>
                <TooltipProvider delayDuration={200}>
                  <RecruiterModeBar />
                  <SiteDock locale={locale} />
                  <main id="main-content">{children}</main>
                  <Footer locale={locale} />
                  <CommandPalette
                    items={searchItems}
                    socials={site.socials}
                    email={site.contact.email}
                  />
                </TooltipProvider>
              </AccentProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
          <JsonLd data={personJsonLd(site, { technologies, services })} />
          <JsonLd data={websiteJsonLd()} />
          <AnalyticsProviders />
        </PwaProvider>
      </body>
    </html>
  );
}
