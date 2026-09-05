import { renameSync, existsSync } from "node:fs";
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
  "src/proxy.ts",
];

for (const relative of targets) {
  const from = join(park, relative.replaceAll("/", "__"));
  const to = join(root, relative);
  if (existsSync(from) && !existsSync(to)) {
    renameSync(from, to);
    console.log(`restored ${relative}`);
  }
}
