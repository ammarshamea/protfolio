import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { projectRoot } from "./lib/env-file.mjs";

const dir = join(projectRoot(), "content/projects");

for (const file of readdirSync(dir)) {
  if (!file.endsWith(".json")) continue;
  const slug = file.replace(".ar.json", "").replace(".json", "");
  const path = join(dir, file);
  const data = JSON.parse(readFileSync(path, "utf8"));
  const cover = `/projects/covers/${slug}.png`;
  data.coverImage = cover;
  data.screenshotPending = false;
  const gallery = Array.isArray(data.gallery) ? data.gallery : [];
  data.gallery = gallery.includes(cover) ? gallery : [cover, ...gallery];
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
}

console.log("Attached cover images to all project JSON files.");
