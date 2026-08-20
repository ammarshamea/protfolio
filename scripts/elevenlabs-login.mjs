import { createInterface } from "node:readline";
import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { DEFAULT_VOICE, loadEnvFiles, projectRoot, resolveApiKey } from "./elevenlabs-tts.mjs";

const CLI_DIR = join(homedir(), ".elevenlabs");
const CLI_KEY_FILE = join(CLI_DIR, "api_key");
const ENV_LOCAL = join(projectRoot(), ".env.local");
const SIGN_IN_URL = "https://elevenlabs.io/app/sign-in";
const KEYS_URL = "https://elevenlabs.io/app/settings/api-keys";

function parseArgs(argv) {
  const args = { key: "", status: false, logout: false, help: false, open: false };
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (token === "--key" || token === "-k") args.key = argv[++i] ?? "";
    else if (token === "--status" || token === "--whoami") args.status = true;
    else if (token === "--logout") args.logout = true;
    else if (token === "--open" || token === "--browser") args.open = true;
    else if (token === "--help" || token === "-h") args.help = true;
  }
  return args;
}

function chromePath() {
  const candidates = [
    join(process.env.LOCALAPPDATA || "", "Google", "Chrome", "Application", "chrome.exe"),
    join(process.env.PROGRAMFILES || "", "Google", "Chrome", "Application", "chrome.exe"),
    join(process.env["ProgramFiles(x86)"] || "", "Google", "Chrome", "Application", "chrome.exe"),
  ];
  return candidates.find((file) => existsSync(file));
}

function openChrome(url) {
  const chrome = chromePath();
  if (chrome) {
    const child = spawn(chrome, [url], { detached: true, stdio: "ignore" });
    child.unref();
    return true;
  }
  if (process.platform === "win32") {
    spawn("cmd", ["/c", "start", "", url], { detached: true, stdio: "ignore" }).unref();
    return true;
  }
  spawn("xdg-open", [url], { detached: true, stdio: "ignore" }).unref();
  return true;
}

export function maskKey(key) {
  if (!key || key.length < 12) return "(missing)";
  return `${key.slice(0, 8)}...${key.slice(-4)}`;
}

function upsertEnvLocal(apiKey) {
  let content = existsSync(ENV_LOCAL) ? readFileSync(ENV_LOCAL, "utf8") : "";
  if (/^ELEVENLABS_API_KEY=/m.test(content)) {
    content = content.replace(/^ELEVENLABS_API_KEY=.*$/m, `ELEVENLABS_API_KEY=${apiKey}`);
  } else {
    content = `${content.trimEnd()}${content.trim() ? "\n" : ""}ELEVENLABS_API_KEY=${apiKey}\n`;
  }
  if (!/^ELEVENLABS_VOICE_ID=/m.test(content)) {
    content = `${content.trimEnd()}\nELEVENLABS_VOICE_ID=${DEFAULT_VOICE}\n`;
  }
  writeFileSync(ENV_LOCAL, content, "utf8");
}

function removeEnvLocalKey() {
  if (!existsSync(ENV_LOCAL)) return;
  const next = readFileSync(ENV_LOCAL, "utf8")
    .split(/\r?\n/)
    .filter((line) => !line.startsWith("ELEVENLABS_API_KEY="))
    .join("\n");
  writeFileSync(ENV_LOCAL, next, "utf8");
}

function writeCliKey(apiKey) {
  mkdirSync(CLI_DIR, { recursive: true });
  writeFileSync(CLI_KEY_FILE, apiKey, { encoding: "utf8" });
}

function persistWindowsUserEnv(apiKey) {
  if (process.platform !== "win32") return;
  const value = apiKey == null ? "$null" : JSON.stringify(apiKey);
  spawnSync(
    "powershell.exe",
    [
      "-NoProfile",
      "-Command",
      `[Environment]::SetEnvironmentVariable('ELEVENLABS_API_KEY', ${value}, 'User')`,
    ],
    { stdio: "ignore" },
  );
}

async function verifyKey(apiKey) {
  const client = new ElevenLabsClient({ apiKey });
  return client.user.get();
}

async function promptForKey() {
  if (!process.stdin.isTTY) {
    throw new Error(
      `No API key provided.\nCreate one at ${KEYS_URL}\nThen run:\n  npm run elevenlabs:login -- --key sk_your_key`,
    );
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise((resolve) => {
    rl.question(`Paste your ElevenLabs API key (${KEYS_URL}): `, resolve);
  });
  rl.close();
  return answer.trim();
}

export async function login(rawKey) {
  const apiKey = rawKey.trim();
  if (!apiKey) throw new Error("API key is empty.");

  process.stdout.write("Verifying API key with ElevenLabs...\n");
  const user = await verifyKey(apiKey);
  const name = user.firstName || user.userId || "account";
  const tier = user.subscription?.tier || "unknown";

  writeCliKey(apiKey);
  upsertEnvLocal(apiKey);
  persistWindowsUserEnv(apiKey);
  process.env.ELEVENLABS_API_KEY = apiKey;

  console.log(`Connected as ${name} (${tier}).`);
  console.log(`CLI key file: ${CLI_KEY_FILE}`);
  console.log("Project file: .env.local");
  if (process.platform === "win32") {
    console.log("Windows user env: ELEVENLABS_API_KEY (open a new terminal to use it globally)");
  }
  console.log("\nNext: npm run generate:intro");
}

function logout() {
  if (existsSync(CLI_KEY_FILE)) unlinkSync(CLI_KEY_FILE);
  removeEnvLocalKey();
  persistWindowsUserEnv(null);
  delete process.env.ELEVENLABS_API_KEY;
  console.log("Disconnected ElevenLabs from this machine.");
}

function status() {
  loadEnvFiles();
  const key = resolveApiKey();
  console.log(`Key: ${maskKey(key)}`);
  console.log(`CLI file: ${existsSync(CLI_KEY_FILE) ? "yes" : "no"} (${CLI_KEY_FILE})`);
  console.log(`.env.local: ${existsSync(ENV_LOCAL) ? "yes" : "no"}`);
}

const isMain =
  process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    console.log(`Connect this machine to ElevenLabs CLI

  npm run elevenlabs:auth
  npm run elevenlabs:login -- --key sk_your_key
  npm run elevenlabs:whoami
  npm run elevenlabs:logout

This opens Chrome to sign in, then paste an unrestricted API key from:
  ${KEYS_URL}
`);
    process.exit(0);
  }

  try {
    if (args.logout) logout();
    else if (args.status) status();
    else {
      const existing = args.key || resolveApiKey();
      if (args.open || !existing) {
        console.log("Opening Chrome for ElevenLabs sign-in...");
        openChrome(SIGN_IN_URL);
        openChrome(KEYS_URL);
        console.log("Sign in, then create an unrestricted API key and paste it here.");
      }
      const key = existing || (await promptForKey());
      await login(key);
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
