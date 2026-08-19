import { promises as fs } from "node:fs";
import path from "node:path";
import packageJson from "../../package.json";
import { routing } from "@/i18n/routing";

const CONTENT_DIR = path.join(process.cwd(), "content");
const BLOG_DIR = path.join(CONTENT_DIR, "blog");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");

async function countFiles(
  dir: string,
  extension: string,
  excludeArabic = false,
) {
  try {
    const files = await fs.readdir(dir);
    return files.filter(
      (file) =>
        file.endsWith(extension) &&
        (!excludeArabic || !file.endsWith(`.ar${extension}`)),
    ).length;
  } catch {
    return 0;
  }
}

async function getLastEditedAt(dir: string): Promise<Date | null> {
  try {
    const files = await fs.readdir(dir);
    const stats = await Promise.all(
      files.map((file) =>
        fs.stat(path.join(dir, file)).then((stat) => stat.mtime),
      ),
    );
    if (stats.length === 0) return null;
    return stats.sort((a, b) => b.getTime() - a.getTime())[0];
  } catch {
    return null;
  }
}

export async function getAdminStats() {
  const [projectCount, blogPostCount, lastProjectEdit, lastBlogEdit] =
    await Promise.all([
      countFiles(PROJECTS_DIR, ".json", true),
      countFiles(BLOG_DIR, ".mdx"),
      getLastEditedAt(PROJECTS_DIR),
      getLastEditedAt(BLOG_DIR),
    ]);

  const lastContentEdit =
    [lastProjectEdit, lastBlogEdit]
      .filter((date): date is Date => date !== null)
      .sort((a, b) => b.getTime() - a.getTime())[0] ?? null;

  return {
    projectCount,
    blogPostCount,
    lastContentEdit,
    localeCount: routing.locales.length,
    locales: routing.locales,
    packageVersion: packageJson.version,
    nodeEnv: process.env.NODE_ENV,
  };
}
