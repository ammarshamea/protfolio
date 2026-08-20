import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

export const DEFAULT_VOICE = "pNInz6obpgDQGcFmaJgB";
const DEFAULT_MODEL = "eleven_multilingual_v2";
const CLI_KEY_FILE = join(homedir(), ".elevenlabs", "api_key");

export function projectRoot() {
  return join(dirname(fileURLToPath(import.meta.url)), "..");
}

export function loadEnvFiles() {
  const root = projectRoot();
  for (const name of [".env.local", ".env"]) {
    const file = join(root, name);
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
      if (key && process.env[key] === undefined) process.env[key] = value;
    }
  }
}

export function resolveApiKey() {
  loadEnvFiles();
  const fromEnv = process.env.ELEVENLABS_API_KEY?.trim();
  if (fromEnv) return fromEnv;
  if (existsSync(CLI_KEY_FILE)) {
    const fromCli = readFileSync(CLI_KEY_FILE, "utf8").trim();
    if (fromCli) return fromCli;
  }
  return "";
}

function parseArgs(argv) {
  const args = { text: "", out: "", voice: DEFAULT_VOICE, model: DEFAULT_MODEL, language: "" };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (token === "--text" || token === "-t") args.text = argv[++i] ?? "";
    else if (token === "--out" || token === "-o") args.out = argv[++i] ?? "";
    else if (token === "--voice" || token === "-v") args.voice = argv[++i] ?? DEFAULT_VOICE;
    else if (token === "--model" || token === "-m") args.model = argv[++i] ?? DEFAULT_MODEL;
    else if (token === "--language" || token === "-l") args.language = argv[++i] ?? "";
    else if (token === "--help" || token === "-h") args.help = true;
    else if (!token.startsWith("-")) rest.push(token);
  }
  if (!args.text && rest[0]) args.text = rest[0];
  if (!args.out && rest[1]) args.out = rest[1];
  return args;
}

export async function synthesizeSpeech({
  text,
  out,
  voice = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE,
  model = DEFAULT_MODEL,
  language = "",
}) {
  const apiKey = resolveApiKey();
  if (!apiKey) {
    throw new Error(
      "ElevenLabs is not connected. Run: npm run elevenlabs:login -- --key sk_your_key",
    );
  }
  if (!text) throw new Error("Missing --text");
  if (!out) throw new Error("Missing --out");

  const client = new ElevenLabsClient({ apiKey });
  const audioStream = await client.textToSpeech.convert(voice, {
    text,
    modelId: model,
    outputFormat: "mp3_44100_128",
    ...(language ? { languageCode: language } : {}),
  });

  const chunks = [];
  for await (const chunk of audioStream) {
    chunks.push(chunk);
  }

  mkdirSync(dirname(resolve(out)), { recursive: true });
  writeFileSync(out, Buffer.concat(chunks));
  return out;
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.text || !args.out) {
    console.log(`ElevenLabs TTS CLI

Usage:
  npm run elevenlabs:tts -- --text "Hello" --out public/videos/voice.mp3
  npm run elevenlabs:tts -- -t "مرحبا" -o voice.mp3 --language ar

Options:
  -t, --text       Script to speak
  -o, --out        Output mp3 path
  -v, --voice      Voice ID (default: Adam)
  -m, --model      Model ID (default: eleven_multilingual_v2)
  -l, --language   Optional ISO language code (ar, en)
`);
    process.exit(args.help ? 0 : 1);
  }

  synthesizeSpeech(args)
    .then((file) => {
      console.log(`Wrote ${file}`);
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}
