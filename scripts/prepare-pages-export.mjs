/**
 * Static GitHub Pages cannot ship Route Handlers or the OG image runtime.
 * Move those trees aside for the export build only.
 */
import { renameSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const park = join(root, "scripts/.cache/pages-export-park");
const targets = [
  "src/app/api",
  "src/app/og",
  "src/app/feed",
  "src/app/feed.xml",
  "src/app/serwist",
  "src/app/(private)",
];

mkdirSync(park, { recursive: true });

for (const relative of targets) {
  const from = join(root, relative);
  const to = join(park, relative.replaceAll("/", "__"));
  if (existsSync(from) && !existsSync(to)) {
    renameSync(from, to);
    console.log(`parked ${relative}`);
  }
}
