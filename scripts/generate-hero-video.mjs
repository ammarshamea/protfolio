import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "videos");
mkdirSync(outDir, { recursive: true });

const webm = join(outDir, "hero.webm");
const mp4 = join(outDir, "hero.mp4");
const poster = join(outDir, "hero.jpg");

const lavfi =
  "gradients=s=1280x720:d=6:r=24:type=radial:speed=0.035:nb_colors=3:c0=0x1e1b4b:c1=0x0f172a:c2=0x334155";

function run(args) {
  execFileSync("ffmpeg", args, { stdio: "inherit" });
}

try {
  run([
    "-y",
    "-f",
    "lavfi",
    "-i",
    lavfi,
    "-vf",
    "format=yuv420p",
    "-c:v",
    "libvpx-vp9",
    "-b:v",
    "0",
    "-crf",
    "36",
    "-an",
    "-deadline",
    "good",
    "-cpu-used",
    "4",
    webm,
  ]);
} catch {
  const geq =
    "color=c=0x0f1219:s=1280x720:d=6:r=24,geq=r='16+20*sin(2*PI*X/W+N/48)+12*sin(2*PI*Y/H+N/36)':g='12+8*sin(2*PI*X/W+N/54)':b='36+24*sin(2*PI*Y/H+N/42)+14*cos(2*PI*X/W+N/30)',format=yuv420p";
  run([
    "-y",
    "-f",
    "lavfi",
    "-i",
    geq,
    "-c:v",
    "libvpx-vp9",
    "-b:v",
    "0",
    "-crf",
    "36",
    "-an",
    "-deadline",
    "good",
    "-cpu-used",
    "4",
    webm,
  ]);
}

run([
  "-y",
  "-i",
  webm,
  "-c:v",
  "libx264",
  "-pix_fmt",
  "yuv420p",
  "-crf",
  "28",
  "-preset",
  "fast",
  "-an",
  "-movflags",
  "+faststart",
  mp4,
]);

run(["-y", "-i", webm, "-ss", "1.5", "-frames:v", "1", "-update", "1", "-q:v", "4", poster]);

console.log("Generated public/videos/hero.webm, hero.mp4, and hero.jpg");
