import fs from "node:fs";
import path from "node:path";

export const CONTENT_DIR = path.join(process.cwd(), "content");

export function readJsonFile<T>(relativePath: string): T | null {
  const fullPath = path.join(CONTENT_DIR, relativePath);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf-8");
  return JSON.parse(raw) as T;
}

export function readJsonDir<T>(
  relativeDir: string,
): { file: string; data: T }[] {
  const fullDir = path.join(CONTENT_DIR, relativeDir);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith(".json"))
    .map((file) => ({
      file,
      data: JSON.parse(fs.readFileSync(path.join(fullDir, file), "utf-8")) as T,
    }));
}

/** Reads a locale-suffixed JSON file (e.g. site.en.json), falling back to the default locale. */
export function readLocaleJson<T>(
  baseName: string,
  locale: string,
  defaultLocale = "en",
): T | null {
  return (
    readJsonFile<T>(`${baseName}.${locale}.json`) ??
    readJsonFile<T>(`${baseName}.${defaultLocale}.json`)
  );
}

export function fileMTime(relativePath: string): Date | null {
  const fullPath = path.join(CONTENT_DIR, relativePath);
  if (!fs.existsSync(fullPath)) return null;
  return fs.statSync(fullPath).mtime;
}
