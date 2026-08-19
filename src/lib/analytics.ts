import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Minimal first-party analytics: in-memory event log (survives the life of the
 * server process) with best-effort JSON file persistence for local dev, so the
 * /dashboard keeps its history across `next dev` restarts. Swap the two
 * `persist`/`hydrate` functions for a Vercel KV client if that's provisioned later.
 */
export type AnalyticsEventType =
  | "page_view"
  | "project_view"
  | "resume_download"
  | "cta_click"
  | "search_query";

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  path?: string;
  label?: string;
  locale?: string;
  userAgent?: string;
  timestamp: number;
}

const MAX_EVENTS = 5000;
const DATA_FILE = path.join(process.cwd(), ".data", "analytics.json");

const globalStore = globalThis as unknown as {
  __analyticsEvents?: AnalyticsEvent[];
};

function getStore(): AnalyticsEvent[] {
  if (!globalStore.__analyticsEvents) {
    globalStore.__analyticsEvents = [];
  }
  return globalStore.__analyticsEvents;
}

let hydrated = false;

async function hydrate() {
  if (hydrated || process.env.NODE_ENV === "production") return;
  hydrated = true;
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const events = JSON.parse(raw) as AnalyticsEvent[];
    globalStore.__analyticsEvents = events.slice(-MAX_EVENTS);
  } catch {
    // No persisted file yet — start fresh.
  }
}

async function persist() {
  if (process.env.NODE_ENV === "production") return;
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(getStore()));
  } catch {
    // Best effort only — local dev convenience, never block the request.
  }
}

export async function recordEvent(event: Omit<AnalyticsEvent, "timestamp">) {
  await hydrate();
  const store = getStore();
  store.push({ ...event, timestamp: Date.now() });
  if (store.length > MAX_EVENTS) store.splice(0, store.length - MAX_EVENTS);
  void persist();
}

function parseUserAgent(ua?: string): { device: string; browser: string } {
  if (!ua) return { device: "Unknown", browser: "Unknown" };
  const device = /Mobi|Android/i.test(ua)
    ? "Mobile"
    : /iPad|Tablet/i.test(ua)
      ? "Tablet"
      : "Desktop";
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /Chrome\//.test(ua) && !/Chromium/.test(ua)
      ? "Chrome"
      : /Firefox\//.test(ua)
        ? "Firefox"
        : /Safari\//.test(ua) && !/Chrome/.test(ua)
          ? "Safari"
          : "Other";
  return { device, browser };
}

function countBy<T>(
  items: T[],
  key: (item: T) => string | undefined,
): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    const k = key(item);
    if (!k) continue;
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export interface AnalyticsSummary {
  totalEvents: number;
  topPages: { name: string; count: number }[];
  topProjects: { name: string; count: number }[];
  resumeDownloads: number;
  ctaClicks: { name: string; count: number }[];
  topSearchQueries: { name: string; count: number }[];
  deviceBreakdown: { name: string; count: number }[];
  browserBreakdown: { name: string; count: number }[];
  dailyPageViews: { date: string; count: number }[];
  recentEvents: AnalyticsEvent[];
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  await hydrate();
  const events = getStore();
  const pageViews = events.filter((e) => e.type === "page_view");
  const parsed = pageViews.map((e) => parseUserAgent(e.userAgent));

  const dailyCounts = new Map<string, number>();
  for (const event of pageViews) {
    const date = new Date(event.timestamp).toISOString().slice(0, 10);
    dailyCounts.set(date, (dailyCounts.get(date) ?? 0) + 1);
  }
  const dailyPageViews = Array.from(dailyCounts.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-14);

  return {
    totalEvents: events.length,
    topPages: countBy(pageViews, (e) => e.path).slice(0, 10),
    topProjects: countBy(
      events.filter((e) => e.type === "project_view"),
      (e) => e.label,
    ).slice(0, 10),
    resumeDownloads: events.filter((e) => e.type === "resume_download").length,
    ctaClicks: countBy(
      events.filter((e) => e.type === "cta_click"),
      (e) => e.label,
    ).slice(0, 10),
    topSearchQueries: countBy(
      events.filter((e) => e.type === "search_query"),
      (e) => e.label,
    ).slice(0, 10),
    deviceBreakdown: countBy(parsed, (p) => p.device),
    browserBreakdown: countBy(parsed, (p) => p.browser),
    dailyPageViews,
    recentEvents: events.slice(-20).reverse(),
  };
}
