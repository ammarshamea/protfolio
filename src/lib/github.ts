/**
 * Focused GitHub integration. Deliberately excludes commit/issue/PR counts —
 * see the plan's "GitHub API" section for why those are misleading quality
 * signals. Surfaces curated repos, tech identity, and recent activity only.
 */
const GITHUB_USER = "ammarshamea";
const GITHUB_API = "https://api.github.com";
const STATIC_EXPORT =
  process.env.GITHUB_PAGES === "true" ||
  process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export interface GithubRepo {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stars: number;
  languages: string[];
}

export interface GithubActivityItem {
  label: string;
  repo: string;
  createdAt: string;
}

export interface GithubProfile {
  followers: number;
  pinnedRepos: GithubRepo[];
  recentActivity: GithubActivityItem[];
}

const EVENT_LABELS: Record<string, string> = {
  PushEvent: "Pushed to",
  CreateEvent: "Created",
  PullRequestEvent: "Opened a pull request in",
  IssuesEvent: "Opened an issue in",
  WatchEvent: "Starred",
  ForkEvent: "Forked",
  ReleaseEvent: "Released",
  PublicEvent: "Made public",
};

async function githubFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
    ...(STATIC_EXPORT
      ? { cache: "force-cache" as const }
      : { next: { revalidate: 3600 } }),
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json() as Promise<T>;
}

async function fetchLanguages(languagesUrl: string): Promise<string[]> {
  try {
    const data = await githubFetch<Record<string, number>>(languagesUrl);
    return Object.keys(data).slice(0, 4);
  } catch {
    return [];
  }
}

async function fetchTopRepos(): Promise<GithubRepo[]> {
  try {
    const repos = await githubFetch<
      Array<{
        name: string;
        description: string | null;
        html_url: string;
        homepage: string | null;
        stargazers_count: number;
        languages_url: string;
        fork: boolean;
      }>
    >(
      `${GITHUB_API}/users/${GITHUB_USER}/repos?sort=updated&per_page=10&type=owner`,
    );

    const owned = repos.filter((repo) => !repo.fork).slice(0, 6);
    return await Promise.all(
      owned.map(async (repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        homepageUrl: repo.homepage || null,
        stars: repo.stargazers_count,
        languages: await fetchLanguages(repo.languages_url),
      })),
    );
  } catch {
    return [];
  }
}

interface PinnedItemsResponse {
  data?: {
    user?: {
      pinnedItems?: {
        nodes: Array<{
          name: string;
          description: string | null;
          url: string;
          homepageUrl: string | null;
          stargazerCount: number;
          languages: { nodes: Array<{ name: string }> };
        }>;
      };
    };
  };
}

async function fetchPinnedRepos(): Promise<GithubRepo[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return fetchTopRepos();

  try {
    const query = `
      query($login: String!) {
        user(login: $login) {
          pinnedItems(first: 6, types: [REPOSITORY]) {
            nodes {
              ... on Repository {
                name
                description
                url
                homepageUrl
                stargazerCount
                languages(first: 4, orderBy: { field: SIZE, direction: DESC }) {
                  nodes { name }
                }
              }
            }
          }
        }
      }
    `;
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { login: GITHUB_USER } }),
      ...(STATIC_EXPORT
        ? { cache: "force-cache" as const }
        : { next: { revalidate: 3600 } }),
    });
    if (!res.ok) throw new Error(`GitHub GraphQL error: ${res.status}`);
    const json = (await res.json()) as PinnedItemsResponse;
    const nodes = json.data?.user?.pinnedItems?.nodes ?? [];
    if (nodes.length === 0) return fetchTopRepos();

    return nodes.map((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.url,
      homepageUrl: repo.homepageUrl,
      stars: repo.stargazerCount,
      languages: repo.languages.nodes.map((l) => l.name),
    }));
  } catch {
    return fetchTopRepos();
  }
}

async function fetchRecentActivity(): Promise<GithubActivityItem[]> {
  try {
    const events = await githubFetch<
      Array<{ type: string; repo: { name: string }; created_at: string }>
    >(`${GITHUB_API}/users/${GITHUB_USER}/events/public?per_page=10`);

    return events
      .filter((event) => EVENT_LABELS[event.type])
      .slice(0, 6)
      .map((event) => ({
        label: EVENT_LABELS[event.type],
        repo: event.repo.name,
        createdAt: event.created_at,
      }));
  } catch {
    return [];
  }
}

async function fetchFollowers(): Promise<number> {
  try {
    const user = await githubFetch<{ followers: number }>(
      `${GITHUB_API}/users/${GITHUB_USER}`,
    );
    return user.followers;
  } catch {
    return 0;
  }
}

let lastFetchedAt: number | null = null;

/** Timestamp of the most recent getGithubProfile() call — surfaced on /admin/local. */
export function getGithubCacheStatus() {
  return { lastFetchedAt, revalidateSeconds: 3600 };
}

export async function getGithubProfile(): Promise<GithubProfile> {
  const [pinnedRepos, recentActivity, followers] = await Promise.all([
    fetchPinnedRepos(),
    fetchRecentActivity(),
    fetchFollowers(),
  ]);
  lastFetchedAt = Date.now();
  return { pinnedRepos, recentActivity, followers };
}
