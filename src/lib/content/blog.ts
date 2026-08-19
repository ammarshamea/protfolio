import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { blogFrontmatterSchema, type BlogPost } from "@/lib/schemas/blog";
import { CONTENT_DIR } from "./fs-utils";

const BLOG_DIR = path.join(CONTENT_DIR, "blog");

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = blogFrontmatterSchema.parse(data);
      return {
        ...frontmatter,
        slug: file.replace(/\.mdx$/, ""),
        content,
        readingTime: Math.ceil(readingTime(content).minutes),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): BlogPost | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}
