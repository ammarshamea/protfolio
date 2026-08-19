import { getTranslations } from "next-intl/server";
import { ar, enUS } from "date-fns/locale";
import { FaGithub, FaStar } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/ui/badge";
import type { GithubProfile } from "@/lib/github";

/** Renders curated GitHub signal only — pinned repos, tech identity, recent activity. No commit/issue/PR counts. */
export async function GithubActivity({
  profile,
  locale,
}: {
  profile: GithubProfile;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: "pages.openSource" });
  const { pinnedRepos, recentActivity, followers } = profile;
  const dateLocale = locale === "ar" ? ar : enUS;

  if (pinnedRepos.length === 0 && recentActivity.length === 0) return null;

  return (
    <div className="space-y-8">
      {followers > 0 && (
        <p className="text-sm text-[var(--muted-foreground)]">
          {followers === 1
            ? t("followers", { count: followers })
            : t("followersPlural", { count: followers })}
        </p>
      )}

      {pinnedRepos.length > 0 && (
        <div>
          <h2 className="font-semibold">{t("featuredRepos")}</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {pinnedRepos.map((repo) => (
              <GlassCard key={repo.name} padding="sm">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 font-medium hover:text-[var(--accent-text)]"
                >
                  <FaGithub aria-hidden="true" className="h-4 w-4 shrink-0" />
                  {repo.name}
                </a>
                {repo.description && (
                  <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                    {repo.description}
                  </p>
                )}
                {(repo.languages.length > 0 || repo.stars > 0) && (
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {repo.languages.map((lang) => (
                      <Badge key={lang} variant="outline">
                        {lang}
                      </Badge>
                    ))}
                    {repo.stars > 0 && (
                      <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                        <FaStar aria-hidden="true" className="h-3 w-3" />
                        {repo.stars}
                      </span>
                    )}
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {recentActivity.length > 0 && (
        <div>
          <h2 className="font-semibold">{t("recentActivity")}</h2>
          <ul className="mt-3 space-y-2 text-sm text-[var(--muted-foreground)]">
            {recentActivity.map((item, index) => (
              <li key={`${item.repo}-${index}`}>
                {item.label}{" "}
                <span className="text-[var(--foreground)]">{item.repo}</span> —{" "}
                {formatDistanceToNow(new Date(item.createdAt), {
                  addSuffix: true,
                  locale: dateLocale,
                })}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
