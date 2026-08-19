import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FolderOpen, FileText, Clock, Package } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { GlassCard } from "@/components/shared/glass-card";
import { getAdminStats } from "@/lib/admin-stats";
import { getGithubCacheStatus } from "@/lib/github";

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function Widget({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <GlassCard hover={false} padding="sm" className="flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/15">
        <Icon className="h-5 w-5 text-[var(--accent)]" />
      </div>
      <div>
        <p className="font-semibold">{value}</p>
        <p className="text-xs text-[var(--muted-foreground)]">{label}</p>
      </div>
    </GlassCard>
  );
}

export default async function AdminLocalPage({
  searchParams,
}: {
  searchParams: Promise<{ admin?: string; secret?: string }>;
}) {
  const { admin, secret } = await searchParams;
  const secretEnv = process.env.DASHBOARD_SECRET;
  const allowed =
    process.env.NODE_ENV === "development" ||
    (admin === "local" && secretEnv && secret === secretEnv);

  if (!allowed) notFound();

  const [stats, githubCache] = await Promise.all([
    getAdminStats(),
    Promise.resolve(getGithubCacheStatus()),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold font-[family-name:var(--font-display)]">
          Local dev panel
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Content and build stats — visible in development, or in production via{" "}
          <code>?admin=local&amp;secret=…</code>.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Widget
          icon={FolderOpen}
          label="Projects in content/projects"
          value={String(stats.projectCount)}
        />
        <Widget
          icon={FileText}
          label="Blog posts in content/blog"
          value={String(stats.blogPostCount)}
        />
        <Widget
          icon={Clock}
          label="Last content edit"
          value={
            stats.lastContentEdit
              ? stats.lastContentEdit.toLocaleString()
              : "Unknown"
          }
        />
        <Widget
          icon={FaGithub}
          label="GitHub cache last fetched"
          value={
            githubCache.lastFetchedAt
              ? new Date(githubCache.lastFetchedAt).toLocaleString()
              : "Not fetched yet"
          }
        />
        <Widget
          icon={Package}
          label="Package version"
          value={`v${stats.packageVersion}`}
        />
        <Widget
          icon={Package}
          label="Locales"
          value={`${stats.localeCount} (${stats.locales.join(", ")})`}
        />
      </div>
    </div>
  );
}
