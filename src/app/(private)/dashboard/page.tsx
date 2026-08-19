import type { Metadata } from "next";
import {
  Eye,
  FolderOpen,
  Download,
  MousePointerClick,
  Search,
} from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/ui/badge";
import { DashboardLogin } from "@/components/dashboard/dashboard-login";
import {
  PageViewsChart,
  TopItemsChart,
} from "@/components/dashboard/analytics-charts";
import { isDashboardAuthenticated } from "../actions";
import { getAnalyticsSummary } from "@/lib/analytics";

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <GlassCard hover={false} padding="sm" className="flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/15">
        <Icon className="h-5 w-5 text-[var(--accent)]" />
      </div>
      <div>
        <p className="text-2xl font-semibold font-[family-name:var(--font-display)]">
          {value}
        </p>
        <p className="text-xs text-[var(--muted-foreground)]">{label}</p>
      </div>
    </GlassCard>
  );
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const authed = await isDashboardAuthenticated();

  if (!authed) return <DashboardLogin error={Boolean(error)} />;

  const summary = await getAnalyticsSummary();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold font-[family-name:var(--font-display)]">
          Site analytics
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          First-party, self-hosted event tracking — no third-party trackers, no
          visitor PII.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Eye} label="Total events" value={summary.totalEvents} />
        <StatCard
          icon={FolderOpen}
          label="Project views"
          value={summary.topProjects.reduce((sum, p) => sum + p.count, 0)}
        />
        <StatCard
          icon={Download}
          label="Resume downloads"
          value={summary.resumeDownloads}
        />
        <StatCard
          icon={MousePointerClick}
          label="CTA clicks"
          value={summary.ctaClicks.reduce((sum, c) => sum + c.count, 0)}
        />
      </div>

      <GlassCard hover={false} padding="lg">
        <h2 className="mb-4 font-semibold">Page views — last 14 days</h2>
        {summary.dailyPageViews.length > 0 ? (
          <PageViewsChart data={summary.dailyPageViews} />
        ) : (
          <p className="text-sm text-[var(--muted-foreground)]">
            No page views recorded yet.
          </p>
        )}
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard hover={false} padding="lg">
          <h2 className="mb-4 font-semibold">Most visited pages</h2>
          {summary.topPages.length > 0 ? (
            <TopItemsChart data={summary.topPages} />
          ) : (
            <p className="text-sm text-[var(--muted-foreground)]">
              No data yet.
            </p>
          )}
        </GlassCard>

        <GlassCard hover={false} padding="lg">
          <h2 className="mb-4 font-semibold">Most viewed projects</h2>
          {summary.topProjects.length > 0 ? (
            <TopItemsChart data={summary.topProjects} />
          ) : (
            <p className="text-sm text-[var(--muted-foreground)]">
              No data yet.
            </p>
          )}
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard hover={false} padding="lg">
          <h2 className="mb-4 flex items-center gap-2 font-semibold">
            <MousePointerClick className="h-4 w-4 text-[var(--accent)]" /> CTA
            clicks
          </h2>
          <ul className="space-y-2 text-sm">
            {summary.ctaClicks.length > 0 ? (
              summary.ctaClicks.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <span className="text-[var(--muted-foreground)]">
                    {item.name}
                  </span>
                  <Badge>{item.count}</Badge>
                </li>
              ))
            ) : (
              <p className="text-[var(--muted-foreground)]">No data yet.</p>
            )}
          </ul>
        </GlassCard>

        <GlassCard hover={false} padding="lg">
          <h2 className="mb-4 flex items-center gap-2 font-semibold">
            <Search className="h-4 w-4 text-[var(--accent)]" /> Search queries
          </h2>
          <ul className="space-y-2 text-sm">
            {summary.topSearchQueries.length > 0 ? (
              summary.topSearchQueries.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <span className="text-[var(--muted-foreground)]">
                    {item.name}
                  </span>
                  <Badge>{item.count}</Badge>
                </li>
              ))
            ) : (
              <p className="text-[var(--muted-foreground)]">No data yet.</p>
            )}
          </ul>
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard hover={false} padding="lg">
          <h2 className="mb-4 font-semibold">Devices</h2>
          <div className="flex flex-wrap gap-2">
            {summary.deviceBreakdown.map((item) => (
              <Badge key={item.name} variant="accent">
                {item.name} · {item.count}
              </Badge>
            ))}
          </div>
        </GlassCard>

        <GlassCard hover={false} padding="lg">
          <h2 className="mb-4 font-semibold">Browsers</h2>
          <div className="flex flex-wrap gap-2">
            {summary.browserBreakdown.map((item) => (
              <Badge key={item.name} variant="accent">
                {item.name} · {item.count}
              </Badge>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
