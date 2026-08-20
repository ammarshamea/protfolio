import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { synthesizeSpeech } from "./elevenlabs-tts.mjs";
import { SCENES } from "../src/remotion/PortfolioIntro/config/sceneData";

type Locale = "en" | "ar";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "generated", "portfolio-intro");
const timingPath = join(outDir, "voice-timing.json");

const FLOOR_SECONDS = 1.1;
const PADDING_SECONDS = 0.25;
const LOCALES: Locale[] = ["en", "ar"];

mkdirSync(outDir, { recursive: true });

function ffprobeDuration(file: string): number {
  const out = execFileSync("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=noprint_wrappers=1:nokey=1",
    file,
  ])
    .toString()
    .trim();
  return Number.parseFloat(out) || 0;
}

function loadExistingTiming(): Record<Locale, Record<string, number>> {
  if (!existsSync(timingPath)) return { en: {}, ar: {} };
  try {
    return JSON.parse(readFileSync(timingPath, "utf8"));
  } catch {
    return { en: {}, ar: {} };
  }
}

async function main() {
  const force = process.argv.includes("--force");
  const timing = loadExistingTiming();
  let voicedCount = 0;

  for (const locale of LOCALES) {
    timing[locale] ??= {};
    for (const scene of SCENES) {
      const outPath = join(outDir, `voice-${locale}-${scene.id}.mp3`);

      if (force || !existsSync(outPath)) {
        try {
          console.log(`[${locale}] Generating voice for "${scene.id}"...`);
          await synthesizeSpeech({
            text: scene.voiceLine[locale],
            out: outPath,
            language: locale,
          });
        } catch (error) {
          console.warn(`[${locale}] "${scene.id}" voice skipped: ${(error as Error).message}`);
          continue;
        }
      } else {
        console.log(`[${locale}] Skipping "${scene.id}" (already exists)`);
      }

      if (existsSync(outPath)) {
        const measured = ffprobeDuration(outPath);
        if (measured > 0) {
          timing[locale][scene.id] = Number((Math.max(FLOOR_SECONDS, measured + PADDING_SECONDS)).toFixed(2));
          voicedCount += 1;
        }
      }
    }
  }

  writeFileSync(timingPath, JSON.stringify(timing, null, 2), "utf8");
  console.log(`Wrote ${timingPath}`);

  if (voicedCount === 0) {
    console.warn(
      "No voice clips were generated. Connect ElevenLabs first: npm run elevenlabs:login -- --key sk_your_key",
    );
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
