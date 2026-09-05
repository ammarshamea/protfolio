/**
 * Custom loader so `next/image` keeps working on a static GitHub Pages
 * export (no optimization server) and still prefixes `basePath`.
 */
export default function imageLoader({ src }: { src: string }) {
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:")
  ) {
    return src;
  }
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = src.startsWith("/") ? src : `/${src}`;
  if (!base) return normalized;
  if (normalized === base || normalized.startsWith(`${base}/`)) {
    return normalized;
  }
  return `${base}${normalized}`;
}
