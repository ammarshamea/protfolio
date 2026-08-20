/**
 * FFmpeg finalize pass for the cinematic Remotion intro.
 *
 * Remotion only produces a visual ("silent") render per locale — this script:
 *   1. Muxes the per-scene ElevenLabs voice-over clips in at their real timeline offsets
 *   2. Layers two subtle, procedurally-synthesized whoosh accents on the two highest-energy cuts
 *   3. Optionally ducks an ambient/music bed (public/audio/intro/ambient.mp3) under the voice, if present
 *   4. Applies a light unifying color pass
 *   5. Exports public/videos/intro-{locale}.mp4, .webm, and a poster .jpg
 *
 * Every audio layer is optional and skipped gracefully when its source is missing, so this
 * script can run at any stage of the pipeline (e.g. before ElevenLabs is connected) and simply
 * produce a clean silent cut.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SCENES } from "../src/remotion/PortfolioIntro/config/sceneData";
import { TRANSITION_FRAMES, FPS } from "../src/remotion/PortfolioIntro/config/introConfig";

type Locale = "en" | "ar";
type TimingTable = Record<Locale, Record<string, number>>;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const renderDir = join(root, "scripts", ".cache", "remotion");
const voiceDir = join(root, "public", "generated", "portfolio-intro");
const outDir = join(root, "public", "videos");
const ambientPath = join(root, "public", "audio", "intro", "ambient.mp3");
const timingPath = join(voiceDir, "voice-timing.json");

const LOCALES: Locale[] = ["en", "ar"];
const DEFAULT_SCENE_SECONDS = 1.6;

mkdirSync(outDir, { recursive: true });

function loadTiming(): TimingTable {
  if (!existsSync(timingPath)) return { en: {}, ar: {} };
  try {
    return JSON.parse(readFileSync(timingPath, "utf8"));
  } catch {
    return { en: {}, ar: {} };
  }
}

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

function sceneStartSeconds(timing: TimingTable, locale: Locale): Record<string, number> {
  const starts: Record<string, number> = {};
  let t = 0;
  for (const scene of SCENES) {
    starts[scene.id] = t;
    t += timing[locale]?.[scene.id] ?? DEFAULT_SCENE_SECONDS;
  }
  return starts;
}

/** Filtered-noise + pitch-sweep whoosh, built from scratch — no stock SFX, kept subtle and high-passed. */
function buildWhooshChain(label: string, atSeconds: number, dur = 0.7) {
  const startFreq = 900;
  const endFreq = 150;
  const delayMs = Math.max(0, Math.round((atSeconds - dur * 0.35) * 1000));
  const noiseLabel = `${label}n`;
  const sweepLabel = `${label}s`;
  const filter = [
    `anoisesrc=color=pink:duration=${dur}:sample_rate=48000,highpass=f=500,lowpass=f=5000[${noiseLabel}]`,
    `aevalsrc='sin(2*PI*(${startFreq}-(${startFreq}-${endFreq})*t/${dur})*t)':d=${dur}:s=48000,highpass=f=300,lowpass=f=4000[${sweepLabel}]`,
    `[${noiseLabel}][${sweepLabel}]amix=inputs=2:normalize=0,afade=t=in:d=0.04,afade=t=out:st=${(dur - 0.35).toFixed(3)}:d=0.35,volume=0.22,aformat=sample_rates=48000:channel_layouts=stereo,adelay=${delayMs}:all=1[${label}]`,
  ].join(";");
  return filter;
}

async function finalizeLocale(timing: TimingTable, locale: Locale) {
  const silentPath = join(renderDir, `intro-${locale}-silent.mp4`);
  if (!existsSync(silentPath)) {
    console.warn(`Skipping "${locale}": no silent render at ${silentPath}. Run the Remotion render step first.`);
    return;
  }

  const totalDuration = ffprobeDuration(silentPath);
  const starts = sceneStartSeconds(timing, locale);
  const hasAmbient = existsSync(ambientPath);

  const inputArgs: string[] = ["-i", silentPath];
  const filterParts: string[] = [];
  const voiceLabels: string[] = [];
  let inputIndex = 1;

  for (const scene of SCENES) {
    const voicePath = join(voiceDir, `voice-${locale}-${scene.id}.mp3`);
    if (!existsSync(voicePath)) continue;
    inputArgs.push("-i", voicePath);
    const label = `v${inputIndex}`;
    const delayMs = Math.max(0, Math.round(starts[scene.id] * 1000));
    // Voice-changer pass: rubberband pitch-shifts down (duration-preserving, so voice-timing.json
    // stays accurate) for a deeper, more "narrator" character than the raw ElevenLabs take, plus a
    // touch of warmth/de-harshening EQ and light compression for consistency across clips.
    filterParts.push(
      `[${inputIndex}:a]aformat=sample_rates=48000:channel_layouts=stereo,` +
        `rubberband=pitch=0.92,` +
        `equalizer=f=220:width_type=o:width=1:g=3,` +
        `equalizer=f=3500:width_type=o:width=1:g=-2,` +
        `acompressor=threshold=0.1:ratio=3:attack=15:release=250:makeup=1.4,` +
        `adelay=${delayMs}:all=1[${label}]`,
    );
    voiceLabels.push(label);
    inputIndex += 1;
  }

  let ambientInputIndex = -1;
  if (hasAmbient) {
    inputArgs.push("-stream_loop", "-1", "-i", ambientPath);
    ambientInputIndex = inputIndex;
    inputIndex += 1;
  }

  // Voice bus — the narration is the primary track everything else sits underneath.
  const voiceMixLabel = "voicemix";
  if (voiceLabels.length > 0) {
    filterParts.push(`${voiceLabels.map((l) => `[${l}]`).join("")}amix=inputs=${voiceLabels.length}:normalize=0[${voiceMixLabel}]`);
  } else {
    filterParts.push(`anullsrc=channel_layout=stereo:sample_rate=48000[${voiceMixLabel}]`);
  }

  const finalMixInputs: string[] = [];

  if (hasAmbient) {
    filterParts.push(`[${voiceMixLabel}]asplit=2[voicemixA][voicemixB]`);
    finalMixInputs.push("[voicemixA]");
    filterParts.push(
      `[${ambientInputIndex}:a]atrim=end=${totalDuration.toFixed(3)},volume=0.32,aformat=sample_rates=48000:channel_layouts=stereo[ambraw]`,
    );
    filterParts.push(
      `[ambraw][voicemixB]sidechaincompress=threshold=0.04:ratio=10:attack=5:release=400:makeup=1[ambducked]`,
    );
    finalMixInputs.push("[ambducked]");
  } else {
    finalMixInputs.push(`[${voiceMixLabel}]`);
  }

  // Two whoosh accents on the highest-energy cuts only: the cut into "build" (I BUILD DIGITAL
  // EXPERIENCES) and the cut into "climax" (FROM IDEA TO EXPERIENCE, right before the ending).
  // Never more than this, per the spec's "avoid overdone effects" rule — every other cut in the
  // now-20-scene sequence stays purely voice + silence.
  const transitionSeconds = TRANSITION_FRAMES / FPS;
  const buildCutAt = Math.max(0, starts.build - transitionSeconds / 2);
  const climaxCutAt = Math.max(0, starts.climax - transitionSeconds / 2);
  filterParts.push(buildWhooshChain("wh1", buildCutAt));
  filterParts.push(buildWhooshChain("wh2", climaxCutAt));
  finalMixInputs.push("[wh1]", "[wh2]");

  filterParts.push(`${finalMixInputs.join("")}amix=inputs=${finalMixInputs.length}:normalize=0[premix]`);
  filterParts.push(`[premix]alimiter=limit=0.95:attack=5:release=50[mixedAudio]`);

  // Light unifying grade — the source images are already carefully lit/graded per-scene, so this
  // is a small global contrast/saturation trim to read as one continuous shoot, not a fresh LUT.
  filterParts.push(`[0:v]eq=contrast=1.04:saturation=1.05,format=yuv420p[vout]`);

  const filterComplex = filterParts.join(";");
  const mp4Out = join(outDir, `intro-${locale}.mp4`);
  const webmOut = join(outDir, `intro-${locale}.webm`);
  const posterOut = join(outDir, `intro-${locale}-poster.jpg`);

  console.log(`[${locale}] Muxing ${voiceLabels.length} voice clip(s)${hasAmbient ? " + ducked ambient" : ""} + 2 whoosh accents...`);

  execFileSync(
    "ffmpeg",
    [
      "-y",
      ...inputArgs,
      "-filter_complex",
      filterComplex,
      "-map",
      "[vout]",
      "-map",
      "[mixedAudio]",
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      "-crf",
      "18",
      "-pix_fmt",
      "yuv420p",
      "-c:a",
      "aac",
      "-b:a",
      "192k",
      "-movflags",
      "+faststart",
      "-shortest",
      mp4Out,
    ],
    { stdio: "inherit" },
  );
  console.log(`[${locale}] Wrote ${mp4Out}`);

  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      mp4Out,
      "-c:v",
      "libvpx-vp9",
      "-crf",
      "32",
      "-b:v",
      "0",
      "-c:a",
      "libopus",
      "-b:a",
      "160k",
      webmOut,
    ],
    { stdio: "inherit" },
  );
  console.log(`[${locale}] Wrote ${webmOut}`);

  const posterAt = Math.max(0, totalDuration - 1.1);
  execFileSync(
    "ffmpeg",
    ["-y", "-ss", posterAt.toFixed(2), "-i", mp4Out, "-frames:v", "1", "-q:v", "2", posterOut],
    { stdio: "inherit" },
  );
  console.log(`[${locale}] Wrote ${posterOut}`);
}

async function main() {
  const timing = loadTiming();
  for (const locale of LOCALES) {
    await finalizeLocale(timing, locale);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
