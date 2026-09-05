import type { Metadata } from "next";
import type { SiteContent } from "@/lib/schemas/site";
import type { Project } from "@/lib/schemas/project";
import type { BlogPost } from "@/lib/schemas/blog";
import type { Technology } from "@/lib/schemas/tech";
import type { ServiceItem } from "@/lib/schemas/misc";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ammarshamea.dev";

export function absoluteUrl(path: string) {
  const normalized = (path.startsWith("/") ? path : `/${path}`)
    .replace(/\/+/g, "/")
    .replace(/(.)\/$/, "$1");
  const origin = SITE_URL.replace(/\/$/, "");
  return `${origin}${normalized}`;
}

export function generatePageMetadata({
  title,
  description,
  path,
  locale,
  ogImagePath,
}: {
  title: string;
  description: string;
  path: string;
  locale: string;
  ogImagePath?: string;
}): Metadata {
  const url = absoluteUrl(`/${locale}${path}`);
  const ogImage = ogImagePath
    ? ogImagePath.startsWith("http")
      ? ogImagePath
      : absoluteUrl(ogImagePath)
    : process.env.NEXT_PUBLIC_STATIC_EXPORT === "true"
      ? absoluteUrl("/images/ammar-portrait.png")
      : absoluteUrl(`/og?title=${encodeURIComponent(title)}`);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: absoluteUrl(`/en${path}`),
        ar: absoluteUrl(`/ar${path}`),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Ammar Shamea",
      locale,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function personJsonLd(
  site: SiteContent,
  options?: { technologies?: Technology[]; services?: ServiceItem[] },
) {
  const technologies = options?.technologies ?? [];
  const services = options?.services ?? [];
  const languages = site.contact.languages.map((language) => language.name);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    image: absoluteUrl(site.portrait),
    jobTitle: site.titles[0],
    description: site.bio.short,
    url: SITE_URL,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Damascus",
      addressCountry: "SY",
    },
    // Real profile/contact surfaces only — no invented awards or profile links.
    sameAs: [
      site.socials.github,
      site.socials.codeberg,
      site.socials.linkedin,
      site.socials.whatsapp,
    ],
    // Derived from the same tech-stack content the site renders, plus the
    // person's own titles — never a hand-typed, drift-prone list.
    knowsAbout: [
      ...site.titles,
      ...technologies.map((technology) => technology.name),
    ],
    knowsLanguage: languages,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.contact.email,
      availableLanguage: languages,
    },
    ...(services.length > 0
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Services",
            itemListElement: services.map((service, index) => ({
              "@type": "Offer",
              position: index + 1,
              itemOffered: {
                "@type": "Service",
                name: service.title,
                description: service.description,
              },
            })),
          },
        }
      : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ammar Shamea — Portfolio",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/en/projects?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CLYX",
    url: "https://clyx.agency",
    founder: { "@type": "Person", name: "Ammar Shamea" },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function softwareApplicationJsonLd(project: Project, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.overview,
    applicationCategory:
      project.category === "mobile" ? "MobileApplication" : "WebApplication",
    url: project.liveUrl ?? absoluteUrl(`/${locale}/projects/${project.slug}`),
    author: { "@type": "Person", name: "Ammar Shamea" },
    keywords: project.stack.join(", "),
  };
}

export function blogPostingJsonLd(post: BlogPost, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: "Ammar Shamea" },
    url: absoluteUrl(`/${locale}/blog/${post.slug}`),
  };
}
