/**
 * Editorial branded covers + gallery cards for projects that do not have
 * real running-app screenshots (Flutter / Android / native / API / labs).
 *
 * Honesty: these are branded plates (name, tagline, stack, logo) — never
 * fake phone UI. Real live-site captures from the previous pass are skipped.
 *
 * Usage: node scripts/generate-branded-project-covers.mjs
 *        node scripts/generate-branded-project-covers.mjs --only=qareeb,circle
 */
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { pathToFileURL } from "node:url";
import { projectRoot } from "./lib/env-file.mjs";

const root = projectRoot();
const contentDir = join(root, "content/projects");
const coverDir = join(root, "public/projects/covers");
const galleryRoot = join(root, "public/projects/gallery");
const logoDir = join(root, "public/projects/logos");
const fontDir = join(root, "src/fonts");
const workDir = join(root, "scripts/.cache/branded-covers");

const WIDTH = 1920;
const HEIGHT = 1080;

/** Projects that already have real live-site / local-demo screenshots. */
const SKIP_REAL_SCREENSHOTS = new Set([
  "clyx-agency",
  "clyx-order",
  "foodynez",
  "nawa-holding",
  "nawa-real-estate",
  "nivxtime",
  "pureger",
  "bmm",
  "censuspro",
  "web-motion-lab",
]);

const LOGO_FILES = {
  qareeb: "qareeb_logo.svg",
  "qareeb-packages": "qareeb_logo.svg",
  circle: "circle_logo.svg",
  sanasaa: "sanaseaa_logo.svg",
};

const CATEGORY_LABEL = {
  mobile: "Mobile",
  web: "Web",
  automation: "Automation",
  agency: "Agency",
  package: "Open source",
  saas: "SaaS",
};

const onlyArg = process.argv.find((arg) => arg.startsWith("--only="));
const onlySlugs = onlyArg
  ? new Set(
      onlyArg
        .slice("--only=".length)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    )
  : null;

function chromeBin() {
  for (const candidate of [
    process.env.CHROME_PATH,
    "/opt/google/chrome/chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/local/bin/google-chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ]) {
    if (candidate && existsSync(candidate)) return candidate;
  }
  throw new Error("Chrome/Chromium not found");
}

function fontFace(family, file, style = "normal") {
  const bytes = readFileSync(join(fontDir, file));
  return `@font-face{font-family:'${family}';src:url(data:font/woff2;base64,${bytes.toString("base64")}) format('woff2');font-weight:100 900;font-style:${style};font-display:swap;}`;
}

const FONT_CSS = [
  fontFace("Fraunces", "fraunces-latin-wght-normal.woff2"),
  fontFace("Fraunces", "fraunces-latin-wght-italic.woff2", "italic"),
  fontFace("Geist", "geist-latin-wght-normal.woff2"),
].join("");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function titleSize(title) {
  const len = title.length;
  if (len <= 8) return 118;
  if (len <= 14) return 96;
  if (len <= 22) return 78;
  return 62;
}

function monogram(title) {
  const cleaned = title.replace(/[^A-Za-z0-9]/g, "");
  return (cleaned[0] || "?").toUpperCase();
}

function logoDataUri(slug) {
  const file = LOGO_FILES[slug];
  if (!file) return null;
  const path = join(logoDir, file);
  if (!existsSync(path)) return null;
  const svg = readFileSync(path);
  return `data:image/svg+xml;base64,${svg.toString("base64")}`;
}

function logoClass(slug) {
  if (slug === "sanasaa") return "logo logo-wide";
  if (slug === "qareeb" || slug === "qareeb-packages") return "logo logo-tall";
  return "logo";
}

function chipHtml(stack) {
  return stack
    .slice(0, 5)
    .map((item) => `<span class="chip">${escapeHtml(item)}</span>`)
    .join("");
}

function featureHtml(features) {
  const items = features.slice(0, 3);
  if (items.length === 0) {
    return `<li>Shipped work, documented honestly</li>`;
  }
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function sharedCss() {
  return `${FONT_CSS}
:root{
  --ink:#12100E;
  --cream:#FFEEC8;
  --gold:#C4A36A;
  --gold-soft:#E4C98A;
  --muted:#C9B89A;
  --line:#2E2923;
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${WIDTH}px;height:${HEIGHT}px;overflow:hidden;background:var(--ink);color:var(--cream)}
body{
  font-family:Geist,ui-sans-serif,system-ui,sans-serif;
  background:
    radial-gradient(1200px 700px at 18% 18%, rgba(196,163,106,.16), transparent 58%),
    radial-gradient(900px 600px at 88% 82%, rgba(196,163,106,.08), transparent 52%),
    linear-gradient(180deg,#161310 0%,#12100E 48%,#0E0C0A 100%);
}
.frame{
  position:absolute;inset:36px;
  border:1px solid rgba(196,163,106,.38);
}
.frame:after{
  content:"";
  position:absolute;inset:10px;
  border:1px solid rgba(196,163,106,.16);
}
.safe{
  position:absolute;
  inset:128px 240px 128px 240px;
  display:flex;
  flex-direction:column;
  justify-content:center;
}
.ghost{
  position:absolute;
  right:70px;bottom:40px;
  font-family:Fraunces,Georgia,serif;
  font-weight:600;
  font-size:420px;
  line-height:.78;
  letter-spacing:-.06em;
  color:rgba(255,238,200,.035);
  pointer-events:none;
  user-select:none;
}
.rule{
  position:absolute;
  left:92px;top:150px;bottom:150px;
  width:1px;
  background:linear-gradient(180deg,transparent,rgba(196,163,106,.7),transparent);
}
.eyebrow{
  font-family:Fraunces,Georgia,serif;
  font-style:italic;
  font-size:22px;
  letter-spacing:.18em;
  text-transform:uppercase;
  color:var(--gold-soft);
  margin-bottom:22px;
}
.logo-row{display:flex;align-items:center;gap:22px;margin-bottom:22px}
.logo{
  width:92px;height:92px;
  object-fit:contain;
  background:rgba(255,238,200,.04);
  border:1px solid rgba(196,163,106,.35);
  padding:12px;
}
.logo-wide{width:280px;height:92px;padding:10px 16px}
.logo-tall{width:82px;height:96px}
.mono{
  width:92px;height:92px;
  display:grid;place-items:center;
  border:1px solid rgba(196,163,106,.45);
  color:var(--gold);
  font-family:Fraunces,Georgia,serif;
  font-size:54px;
  font-weight:600;
  line-height:1;
}
h1{
  font-family:Fraunces,Georgia,serif;
  font-weight:600;
  letter-spacing:-.035em;
  line-height:.92;
  color:var(--cream);
  max-width:1100px;
}
.tag{
  margin-top:26px;
  max-width:920px;
  font-size:28px;
  line-height:1.35;
  color:var(--muted);
  display:-webkit-box;
  -webkit-line-clamp:3;
  -webkit-box-orient:vertical;
  overflow:hidden;
}
.chips{display:flex;flex-wrap:wrap;gap:12px;margin-top:36px;max-width:980px}
.chip{
  border:1px solid rgba(196,163,106,.42);
  color:var(--cream);
  font-size:18px;
  letter-spacing:.08em;
  text-transform:uppercase;
  padding:10px 16px;
}
.chips-lg .chip{font-size:26px;padding:16px 22px;letter-spacing:.1em}
.foot{
  position:absolute;
  left:240px;right:240px;bottom:58px;
  display:flex;justify-content:space-between;
  font-size:16px;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:rgba(201,184,154,.72);
}
.kicker{color:var(--gold)}
ul{list-style:none;margin-top:36px;max-width:980px}
li{
  position:relative;
  padding:16px 0 16px 28px;
  border-top:1px solid rgba(196,163,106,.2);
  font-size:28px;
  line-height:1.3;
  color:var(--cream);
}
li:last-child{border-bottom:1px solid rgba(196,163,106,.2)}
li:before{
  content:"";
  position:absolute;left:0;top:28px;
  width:12px;height:1px;
  background:var(--gold);
}
.meta{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:28px 48px;
  margin-top:40px;
  max-width:980px;
}
.meta dt{
  font-size:14px;
  letter-spacing:.18em;
  text-transform:uppercase;
  color:var(--gold);
  margin-bottom:8px;
}
.meta dd{
  font-family:Fraunces,Georgia,serif;
  font-size:34px;
  color:var(--cream);
}
`;
}

function documentHtml(inner) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${sharedCss()}</style></head><body>${inner}</body></html>`;
}

function markHtml(project, variant) {
  const title = escapeHtml(project.title);
  const letter = escapeHtml(monogram(project.title));
  const category = CATEGORY_LABEL[project.category] ?? project.category;
  const listing =
    project.listing === "open-source" ? "Open source" : "Case study";
  const logo = logoDataUri(project.slug);
  const mark = logo
    ? `<img class="${logoClass(project.slug)}" src="${logo}" alt="">`
    : `<div class="mono">${letter}</div>`;
  const size = titleSize(project.title);
  const eyebrow = `${escapeHtml(category)}  ·  ${escapeHtml(project.year ?? "")}`;

  let body;
  if (variant === "cover") {
    body = `
      <div class="logo-row">${mark}</div>
      <p class="eyebrow">${eyebrow}</p>
      <h1 style="font-size:${size}px">${title}</h1>
      <p class="tag">${escapeHtml(project.tagline)}</p>
      <div class="chips">${chipHtml(project.stack ?? [])}</div>`;
  } else if (variant === "brief") {
    body = `
      <p class="eyebrow">Scope</p>
      <h1 style="font-size:${Math.min(size, 78)}px">${title}</h1>
      <ul>${featureHtml(project.features ?? [])}</ul>`;
  } else if (variant === "stack") {
    body = `
      <p class="eyebrow">Stack</p>
      <h1 style="font-size:${Math.min(size, 78)}px">${title}</h1>
      <p class="tag">${escapeHtml(project.tagline)}</p>
      <div class="chips chips-lg">${chipHtml(project.stack ?? [])}</div>`;
  } else {
    body = `
      <p class="eyebrow">Details</p>
      <h1 style="font-size:${Math.min(size, 78)}px">${title}</h1>
      <dl class="meta">
        <div><dt>Role</dt><dd>${escapeHtml(project.role ?? "—")}</dd></div>
        <div><dt>Year</dt><dd>${escapeHtml(project.year ?? "—")}</dd></div>
        <div><dt>Duration</dt><dd>${escapeHtml(project.duration ?? "—")}</dd></div>
        <div><dt>Kind</dt><dd>${escapeHtml(category)}</dd></div>
      </dl>`;
  }

  return documentHtml(`
    <div class="frame"></div>
    <div class="ghost">${letter}</div>
    <div class="rule"></div>
    <div class="safe">${body}</div>
    <div class="foot">
      <span class="kicker">${escapeHtml(listing)}</span>
      <span>Ammar Shamea</span>
    </div>
  `);
}

function captureHtml(html, destPng) {
  mkdirSync(workDir, { recursive: true });
  const htmlPath = join(workDir, `${basename(destPng, ".png")}.html`);
  writeFileSync(htmlPath, html);
  const profile = join(workDir, "chrome-profile");
  mkdirSync(profile, { recursive: true });
  execFileSync(
    chromeBin(),
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-extensions",
      "--no-first-run",
      "--no-default-browser-check",
      `--user-data-dir=${profile}`,
      "--force-device-scale-factor=1",
      `--window-size=${WIDTH},${HEIGHT}`,
      `--default-background-color=12100E`,
      `--screenshot=${destPng}`,
      pathToFileURL(htmlPath).href,
    ],
    { stdio: "pipe", timeout: 30_000 },
  );
}

function pngToWebp(pngPath, webpPath) {
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      pngPath,
      "-vf",
      `scale=${WIDTH}:${HEIGHT}:force_original_aspect_ratio=decrease,pad=${WIDTH}:${HEIGHT}:(ow-iw)/2:(oh-ih)/2`,
      "-frames:v",
      "1",
      "-c:v",
      "libwebp",
      "-quality",
      "86",
      webpPath,
    ],
    { stdio: "pipe" },
  );
}

function loadProjects() {
  return readdirSync(contentDir)
    .filter((file) => file.endsWith(".json") && !file.includes(".ar."))
    .map((file) => JSON.parse(readFileSync(join(contentDir, file), "utf8")))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

function patchProjectJson(slug, coverImage, gallery) {
  for (const file of [`${slug}.json`, `${slug}.ar.json`]) {
    const path = join(contentDir, file);
    if (!existsSync(path)) continue;
    const data = JSON.parse(readFileSync(path, "utf8"));
    data.coverImage = coverImage;
    data.screenshotPending = false;
    data.gallery = gallery;
    writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
  }
}

function removeOldPng(slug) {
  const png = join(coverDir, `${slug}.png`);
  if (existsSync(png)) unlinkSync(png);
}

mkdirSync(coverDir, { recursive: true });
mkdirSync(workDir, { recursive: true });

const projects = loadProjects().filter((project) => {
  if (!project.slug) return false;
  if (SKIP_REAL_SCREENSHOTS.has(project.slug)) return false;
  if (onlySlugs && !onlySlugs.has(project.slug)) return false;
  return true;
});

const tmpPng = join(tmpdir(), "branded-cover.png");
const generated = [];

for (const project of projects) {
  const slug = project.slug;
  const galleryDir = join(galleryRoot, slug);
  mkdirSync(galleryDir, { recursive: true });

  const variants = [
    ["cover", join(coverDir, `${slug}.webp`)],
    ["brief", join(galleryDir, "01-brief.webp")],
    ["stack", join(galleryDir, "02-stack.webp")],
    ["scope", join(galleryDir, "03-scope.webp")],
  ];

  for (const [variant, dest] of variants) {
    console.log(`${slug} · ${variant}`);
    captureHtml(markHtml(project, variant), tmpPng);
    pngToWebp(tmpPng, dest);
  }

  removeOldPng(slug);
  const coverImage = `/projects/covers/${slug}.webp`;
  const gallery = [
    coverImage,
    `/projects/gallery/${slug}/01-brief.webp`,
    `/projects/gallery/${slug}/02-stack.webp`,
    `/projects/gallery/${slug}/03-scope.webp`,
  ];
  patchProjectJson(slug, coverImage, gallery);
  generated.push({ slug, files: [coverImage, ...gallery.slice(1)] });
}

if (existsSync(tmpPng)) unlinkSync(tmpPng);
rmSync(workDir, { recursive: true, force: true });

console.log(`\nGenerated branded plates for ${generated.length} projects.`);
for (const row of generated) {
  console.log(`- ${row.slug}`);
}
