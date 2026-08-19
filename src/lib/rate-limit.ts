const WINDOW_MS = 60_000;
const DEFAULT_MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

/** In-memory, best-effort rate limiting — fine for a single-instance deployment. */
export function isRateLimited(
  key: string,
  maxRequests = DEFAULT_MAX_REQUESTS,
): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > maxRequests;
}
