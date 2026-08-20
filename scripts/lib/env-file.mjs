import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export function projectRoot() {
  return resolve(dirname(fileURLToPath(import.meta.url)), "../..");
}

export function envPath(file = ".env") {
  return resolve(projectRoot(), file);
}

export function parseEnvValue(raw) {
  const trimmed = raw.trim();
  if (!trimmed || trimmed.startsWith("#")) return "";
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed.replace(/\s+#.*$/, "").trim();
}

export function loadEnvFiles() {
  for (const file of [".env.local", ".env"]) {
    const path = envPath(file);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!match) continue;
      const [, key, raw] = match;
      const value = parseEnvValue(raw);
      if (!value || process.env[key]) continue;
      process.env[key] = value;
    }
  }
}

export function upsertEnv(values, file = ".env") {
  const path = envPath(file);
  let content = existsSync(path) ? readFileSync(path, "utf8") : "";
  if (content && !content.endsWith("\n")) content += "\n";

  for (const [key, value] of Object.entries(values)) {
    const line = `${key}=${value}`;
    const pattern = new RegExp(`^${key}=.*$`, "m");
    if (pattern.test(content)) {
      content = content.replace(pattern, line);
    } else {
      content += `${line}\n`;
    }
  }

  writeFileSync(path, content, "utf8");
  return path;
}
