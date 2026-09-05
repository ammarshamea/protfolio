import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";
import { SocialLinks } from "@/components/shared/social-links";
import { getSiteContent } from "@/lib/content/site";
import { footerNavGroups } from "@/lib/navigation";

export async function Footer() {
  const t = await getTranslations();
  const locale = await getLocale();
  const site = getSiteContent(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--surface-border)] bg-[var(--surface)] pb-[calc(var(--dock-space)+1.75rem)]">
      <div className="mx-auto flex max-w-[90rem] flex-col gap-10 px-6 py-12 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row">
          <div className="max-w-sm">
            <Logo portrait={site.portrait} name={site.name} />
            <p className="mt-3 text-sm text-[var(--muted-foreground)]">
              {t("footer.tagline")}
            </p>
            <SocialLinks
              socials={site.socials}
              variant="footer"
              className="mt-5"
            />
          </div>
          <div className="grid w-full gap-8 sm:grid-cols-2 lg:w-auto lg:grid-cols-4 lg:gap-10">
            {footerNavGroups.map((group) => (
              <div key={group.titleKey}>
                <p className="mb-3 text-[11px] font-semibold uppercase text-[var(--accent)]">
                  {t(`nav.${group.titleKey}` as Parameters<typeof t>[0])}
                </p>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
                      >
                        {t(`nav.${item.key}` as Parameters<typeof t>[0])}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-[var(--surface-border)] pt-6 text-sm text-[var(--muted-foreground)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. {t("footer.rights")}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-[var(--foreground)]">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="hover:text-[var(--foreground)]">
              {t("footer.terms")}
            </Link>
            <Link
              href="/sitemap-page"
              className="hover:text-[var(--foreground)]"
            >
              {t("footer.sitemap")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
