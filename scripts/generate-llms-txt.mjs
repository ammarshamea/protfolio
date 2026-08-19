#!/usr/bin/env node
/**
 * Regenerates public/llms.txt from the content collections so AI crawlers and
 * LLM-based tools get an accurate, structured summary of the site. Runs
 * automatically before every build (see package.json "prebuild").
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");

function readJson(relativePath) {
  const fullPath = path.join(CONTENT_DIR, relativePath);
  if (!fs.existsSync(fullPath)) return null;
  return JSON.parse(fs.readFileSync(fullPath, "utf-8"));
}

function readJsonDir(relativeDir) {
  const fullDir = path.join(CONTENT_DIR, relativeDir);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith(".json") && !f.includes(".ar."))
    .map((file) => JSON.parse(fs.readFileSync(path.join(fullDir, file), "utf-8")));
}

const site = readJson("site.en.json");
const projects = readJsonDir("projects").sort(
  (a, b) => Number(b.year) - Number(a.year),
);
const techStack = readJsonDir("tech-stack")
  .sort((a, b) => b.proficiency - a.proficiency)
  .map((t) => t.name);

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ammarshamea.dev";

const liveProjects = projects.filter((p) => p.liveUrl);

const lines = [
  `# ${site.name} — ${site.titles[0]}`,
  `> ${site.tagline}`,
  "",
  "## About",
  site.bio.short,
  "",
  "## Expertise",
  techStack.slice(0, 8).join(", "),
  "",
  "## Projects",
  ...liveProjects.map((p) => `- ${p.title}: ${p.liveUrl}`),
  "",
  "## Case Studies",
  ...projects.map((p) => `- ${p.title}: ${siteUrl}/en/projects/${p.slug}`),
  "",
  "## Contact",
  `Email: ${site.contact.email}`,
  `GitHub: ${site.socials.github}`,
  `LinkedIn: ${site.socials.linkedin}`,
  `Location: ${site.contact.location}`,
  "",
  "## Site",
  `Full site: ${siteUrl}`,
  `Sitemap: ${siteUrl}/sitemap.xml`,
  "",
];

fs.writeFileSync(path.join(ROOT, "public", "llms.txt"), lines.join("\n"));
console.log("Generated public/llms.txt");
