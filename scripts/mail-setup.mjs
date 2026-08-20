#!/usr/bin/env node
/**
 * Configure contact email delivery via Resend.
 *
 *   npm run mail:setup -- --key re_xxxx
 *   npm run mail:setup -- --status
 *   npm run mail:setup -- --test
 *
 * Messages from /contact are sent to CONTACT_TO_EMAIL (ammarshamea03@gmail.com).
 */
import { spawnSync } from "node:child_process";
import { loadEnvFiles, upsertEnv } from "./lib/env-file.mjs";

const CONTACT_TO = "ammarshamea03@gmail.com";

function parseArgs(argv) {
  const args = { key: "", status: false, test: false, help: false };
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (token === "--key" || token === "-k") args.key = argv[++i] ?? "";
    else if (token === "--status") args.status = true;
    else if (token === "--test") args.test = true;
    else if (token === "--help" || token === "-h") args.help = true;
  }
  return args;
}

function mask(value) {
  if (!value) return "(missing)";
  if (value.length < 12) return "(set)";
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

function printHelp() {
  console.log(`Mail setup (Resend)

Usage:
  npm run mail:setup -- --key re_your_api_key
  npm run mail:setup -- --status
  npm run mail:setup -- --test

Create a key at https://resend.com/api-keys then pass it with --key.
The contact form always delivers to ${CONTACT_TO}.
`);
}

async function sendTest(apiKey) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: CONTACT_TO,
      subject: "[Portfolio] Mail setup test",
      text: "Contact mail is wired. Form submissions will arrive at this inbox.",
    }),
  });
  const body = await response.text();
  if (!response.ok) {
    throw new Error(`Resend ${response.status}: ${body}`);
  }
  return body;
}

async function main() {
  loadEnvFiles();
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    return;
  }

  upsertEnv({ CONTACT_TO_EMAIL: CONTACT_TO });

  if (args.key) {
    upsertEnv({ RESEND_API_KEY: args.key });
    process.env.RESEND_API_KEY = args.key;
    console.log(`Saved RESEND_API_KEY ${mask(args.key)}`);
  }

  const apiKey = process.env.RESEND_API_KEY ?? "";

  if (args.status || (!args.key && !args.test)) {
    console.log(`CONTACT_TO_EMAIL=${CONTACT_TO}`);
    console.log(`RESEND_API_KEY=${mask(apiKey)}`);
    if (!apiKey) {
      console.log("\nNo API key yet. Create one at https://resend.com/api-keys");
      console.log("then run: npm run mail:setup -- --key re_xxxx --test");
      const probe = spawnSync("npx", ["--yes", "resend", "--help"], {
        encoding: "utf8",
        timeout: 20000,
      });
      if (probe.status === 0) {
        console.log("\nResend CLI is available via npx resend.");
      }
    }
  }

  if (args.test) {
    if (!apiKey) {
      console.error("Cannot send a test email without RESEND_API_KEY.");
      process.exit(1);
    }
    const result = await sendTest(apiKey);
    console.log("Test email sent to", CONTACT_TO);
    console.log(result);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
