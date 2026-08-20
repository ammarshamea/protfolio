#!/usr/bin/env node
/**
 * Create / wire the Sentry project for this Next.js portfolio via sentry-cli.
 *
 *   npm run sentry:setup -- --token sntrys_xxxx
 *   npm run sentry:setup -- --status
 *
 * Org members currently cannot create projects in nivx from the MCP session
 * (HTTP 403). An org-admin token is required for `projects create`.
 */
import { spawnSync } from "node:child_process";
import { loadEnvFiles, upsertEnv } from "./lib/env-file.mjs";

const DEFAULT_ORG = "nivx";
const DEFAULT_PROJECT = "protofolio-nextjs-ql";
const DEFAULT_TEAM = "nivx";
const DEFAULT_PLATFORM = "javascript-nextjs";

function parseArgs(argv) {
  const args = {
    token: "",
    org: "",
    project: "",
    team: "",
    status: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (token === "--token" || token === "-t") args.token = argv[++i] ?? "";
    else if (token === "--org") args.org = argv[++i] ?? "";
    else if (token === "--project") args.project = argv[++i] ?? "";
    else if (token === "--team") args.team = argv[++i] ?? "";
    else if (token === "--status") args.status = true;
    else if (token === "--help" || token === "-h") args.help = true;
  }
  return args;
}

function mask(value) {
  if (!value) return "(missing)";
  if (value.length < 12) return "(set)";
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

function sentryCli(args, token) {
  return spawnSync(
    "npx",
    ["--yes", "@sentry/cli@2", ...args],
    {
      encoding: "utf8",
      timeout: 60000,
      env: {
        ...process.env,
        SENTRY_AUTH_TOKEN: token || process.env.SENTRY_AUTH_TOKEN || "",
      },
    },
  );
}

function printHelp() {
  console.log(`Sentry setup

Usage:
  npm run sentry:setup -- --token sntrys_orgauth_xxxx
  npm run sentry:setup -- --status

Creates ${DEFAULT_ORG}/${DEFAULT_PROJECT} (javascript-nextjs) and writes
SENTRY_ORG, SENTRY_PROJECT, SENTRY_AUTH_TOKEN, SENTRY_DSN, NEXT_PUBLIC_SENTRY_DSN
into .env.

Create an org auth token with project:read project:write org:read at:
https://nivx.sentry.io/settings/auth-tokens/
`);
}

async function fetchDefaultDsn(org, project, token) {
  const response = await fetch(
    `https://de.sentry.io/api/0/projects/${org}/${project}/keys/`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  if (!response.ok) {
    throw new Error(`Keys API ${response.status}: ${await response.text()}`);
  }
  const keys = await response.json();
  const first = Array.isArray(keys) ? keys[0] : null;
  return first?.dsn?.public ?? first?.dsn?.secret ?? "";
}

async function main() {
  loadEnvFiles();
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const org = args.org || process.env.SENTRY_ORG || DEFAULT_ORG;
  const project = args.project || process.env.SENTRY_PROJECT || DEFAULT_PROJECT;
  const team = args.team || DEFAULT_TEAM;
  const token = args.token || process.env.SENTRY_AUTH_TOKEN || "";

  upsertEnv({
    SENTRY_ORG: org,
    SENTRY_PROJECT: project,
  });

  if (args.token) {
    upsertEnv({ SENTRY_AUTH_TOKEN: args.token });
    process.env.SENTRY_AUTH_TOKEN = args.token;
  }

  if (args.status || !token) {
    console.log(`SENTRY_ORG=${org}`);
    console.log(`SENTRY_PROJECT=${project}`);
    console.log(`SENTRY_AUTH_TOKEN=${mask(token)}`);
    console.log(`SENTRY_DSN=${mask(process.env.SENTRY_DSN)}`);
    if (!token) {
      console.log("\nNo auth token yet. Create an org token, then run:");
      console.log("  npm run sentry:setup -- --token sntrys_xxxx");
      return;
    }
  }

  const info = sentryCli(["info"], token);
  process.stdout.write(info.stdout || "");
  process.stderr.write(info.stderr || "");
  if (info.status !== 0) {
    console.error("sentry-cli info failed — token is invalid or expired.");
    process.exit(info.status ?? 1);
  }

  const created = sentryCli(
    [
      "projects",
      "create",
      project,
      "-o",
      org,
      "--team",
      team,
      "--platform",
      DEFAULT_PLATFORM,
    ],
    token,
  );
  process.stdout.write(created.stdout || "");
  process.stderr.write(created.stderr || "");

  const alreadyExists =
    created.status !== 0 &&
    /already exists|duplicate/i.test(`${created.stdout}\n${created.stderr}`);
  if (created.status !== 0 && !alreadyExists) {
    console.error(
      "Could not create the Sentry project. If this is HTTP 403, an org admin must allow project creation for your role.",
    );
    process.exit(created.status ?? 1);
  }

  const dsn = await fetchDefaultDsn(org, project, token);
  if (!dsn) {
    console.error("Project exists but no DSN was returned.");
    process.exit(1);
  }

  upsertEnv({
    SENTRY_DSN: dsn,
    NEXT_PUBLIC_SENTRY_DSN: dsn,
  });
  console.log(`Wired DSN for ${org}/${project}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
