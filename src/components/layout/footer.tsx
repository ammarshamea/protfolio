import { ArrowUp } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { Logo } from "./logo";
import { SocialLinks } from "@/components/shared/social-links";
import { getSiteContent } from "@/lib/content/site";

export async function Footer() {
  const t = await getTranslations();
  const locale = await getLocale();
  const site = getSiteContent(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--surface-border)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-[90rem] flex-col gap-8 px-6 py-12 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-[var(--muted-foreground)]">
              {t("footer.tagline")}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <SocialLinks socials={site.socials} variant="footer" />
            <a
              href="#top"
              className="flex items-center gap-2 rounded-full border border-[var(--surface-border)] px-4 py-2.5 text-sm font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t("footer.backToTop")}
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
        <p className="border-t border-[var(--surface-border)] pt-6 text-sm text-[var(--muted-foreground)]">
          &copy; {year} {site.name}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
