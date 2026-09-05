/**
 * Custom loader for static GitHub Pages (no image optimizer).
 * Prefixes `basePath` and includes `w` so next/image treats the loader
 * as implemented (unoptimized:true would skip this and 404 under /protfolio).
 */
export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
}) {
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:")
  ) {
    return src;
  }
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = src.startsWith("/") ? src : `/${src}`;
  const prefixed =
    !base || normalized === base || normalized.startsWith(`${base}/`)
      ? normalized
      : `${base}${normalized}`;
  return `${prefixed}${prefixed.includes("?") ? "&" : "?"}w=${width}`;
}
