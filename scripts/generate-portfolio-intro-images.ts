/**
 * Reusable regeneration pipeline for the cinematic intro's key-art.
 *
 * The 8 images currently in `public/generated/portfolio-intro/` were produced directly
 * (agent-assisted) to unblock the first cut of the intro. This script exists so the set
 * can be regenerated later against a real image API once OPENAI_API_KEY is configured —
 * it intentionally skips any scene whose file already exists unless --force is passed.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SCENES } from "../src/remotion/PortfolioIntro/config/sceneData";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "generated", "portfolio-intro");

const ART_DIRECTION =
  "Cinematic editorial photography, premium visual design, dark atmospheric environment " +
  "(near-black #0c0c0d with cold indigo-blue #4f46e5 accent light only, no warm/gold/amber " +
  "tones), high contrast lighting, deep blacks, soft volumetric lighting, elegant reflections, " +
  "minimal composition, 35mm film grain, high-end commercial photography, dramatic perspective, " +
  "controlled highlights, professional cold color grading. Single unmodified photographic frame " +
  "— not a collage, not a poster, not a UI mockup. Absolutely no text, no words, no logos, no " +
  "people, no hands. Enough foreground/background separation to support a Ken Burns camera move.";

const SCENE_PROMPTS: Record<string, string> = {
  opening:
    "A vast dark architectural void with a single dramatic beam of cold blue-white light cutting through drifting haze, a dark column silhouette in the foreground.",
  identity:
    "Overlapping translucent dark smoked-glass planes floating in a black void, backlit with cold indigo-blue light refracting through their edges.",
  ideas:
    "Fine luminous indigo-blue light particles and embers spiraling together in a pitch-black void, as if an idea is condensing into form.",
  designCode:
    "A thin glowing cold blue-indigo wireframe grid plane receding into a pitch-black horizon inside a dark void.",
  build:
    "A monumental abstract lattice of dark geometric beams and trusses assembled in mid-air, seams glowing cold indigo-blue, shot from a dramatic low angle.",
  focus:
    "An extreme macro photograph of a dark matte-black metal geometric edge with one thin electric-blue highlight tracing its curve, shallow depth of field.",
  impact:
    "A glowing cold indigo-blue wireframe polyhedron hovering above a polished dark reflective floor, symmetrical, mirrored perfectly below it.",
  ending:
    "A vast dark atmospheric void facing a single soft rectangular glow of cool blue-white light in the distance, two dark architectural silhouettes framing the view.",
};

function parseArgs(argv: string[]) {
  return { force: argv.includes("--force") };
}

async function generateWithOpenAI(prompt: string, outPath: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing. Add it to .env.local to enable regeneration.");
  }

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt: `${prompt} ${ART_DIRECTION}`,
      size: "1536x1024",
      n: 1,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`OpenAI Images ${response.status}: ${detail.slice(0, 400)}`);
  }

  const json = (await response.json()) as { data: { b64_json: string }[] };
  const b64 = json.data[0]?.b64_json;
  if (!b64) throw new Error("OpenAI Images response had no image data.");

  writeFileSync(outPath, Buffer.from(b64, "base64"));
}

async function main() {
  const { force } = parseArgs(process.argv.slice(2));
  mkdirSync(outDir, { recursive: true });

  for (const scene of SCENES) {
    const fileName = scene.image.split("/").pop();
    if (!fileName) continue;
    const outPath = join(outDir, fileName);

    if (!force && existsSync(outPath)) {
      console.log(`Skipping "${scene.id}" (already exists)`);
      continue;
    }

    const prompt = SCENE_PROMPTS[scene.id];
    if (!prompt) {
      console.warn(`No prompt defined for scene "${scene.id}", skipping.`);
      continue;
    }

    console.log(`Generating "${scene.id}"...`);
    await generateWithOpenAI(prompt, outPath);
    console.log(`Wrote ${outPath}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
