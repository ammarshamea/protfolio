import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";
import { SocialLinks } from "@/components/shared/social-links";
import { getSiteContent } from "@/lib/content/site";
import { footerNavGroups } from "@/lib/navigation";
import { recruiterModeConfig } from "@/lib/recruiter-mode";

export async function Footer() {
  const t = await getTranslations();
  const locale = await getLocale();
  const site = getSiteContent(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--surface-border)]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-[var(--muted-foreground)]">
              {t("footer.tagline")}
            </p>
            <SocialLinks
              socials={site.socials}
              variant="footer"
              className="mt-6"
            />
          </div>

          {footerNavGroups.map((group) => (
            <div key={group.titleKey}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
                {t(`nav.${group.titleKey}` as Parameters<typeof t>[0])}
              </p>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item.href}
                    data-recruiter-hidden={
                      recruiterModeConfig.hiddenRoutes.includes(item.key) ||
                      undefined
                    }
                  >
                    <Link
                      href={item.href}
                      className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--accent)]"
                    >
                      {t(`nav.${item.key}` as Parameters<typeof t>[0])}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--surface-border)] pt-8 text-sm text-[var(--muted-foreground)] sm:flex-row">
          <p>
            &copy; {year} {site.name}. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/sitemap-page"
              className="transition-colors hover:text-[var(--accent)]"
            >
              {t("footer.sitemap")}
            </Link>
            <Link
              href="/api-docs"
              className="transition-colors hover:text-[var(--accent)]"
            >
              {t("footer.apiDocs")}
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-[var(--accent)]"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-[var(--accent)]"
            >
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
