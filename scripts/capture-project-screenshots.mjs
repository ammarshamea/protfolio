import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";
import { projectRoot } from "./lib/env-file.mjs";

const WIDTH = 1440;
const HEIGHT = 900;

const targets = [
  {
    slug: "clyx-agency",
    url: "https://clyx.agency",
    extras: [{ name: "clyx-agency-work", scrollY: 1100 }],
  },
  {
    slug: "clyx-order",
    url: "https://clyxorder.com/",
    extras: [{ name: "clyx-order-more", scrollY: 1100 }],
  },
  {
    slug: "pureger",
    url: "https://clyxorder.com/pureger",
    extras: [{ name: "pureger-more", scrollY: 900 }],
  },
  {
    slug: "foodynez",
    url: "https://foodynez.com/index.html",
    extras: [
      { name: "foodynez-products", url: "https://foodynez.com/products.html" },
    ],
  },
  {
    slug: "nawa-holding",
    url: "https://ammarshamea.github.io/nawa_production/",
    extras: [{ name: "nawa-holding-work", scrollY: 1600 }],
  },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function dismissOverlays(page) {
  const labels = /accept|agree|got it|allow|موافق|قبول|حسنا|إغلاق|close/i;
  const button = page.getByRole("button", { name: labels }).first();
  try {
    if (await button.isVisible({ timeout: 800 })) {
      await button.click({ timeout: 1000 });
    }
  } catch {
    /* no consent dialog */
  }
}

async function capture(page, { url, file, scrollY = 0 }) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
  await page.waitForLoadState("networkidle", { timeout: 20_000 }).catch(() => {});
  await sleep(2500);
  await dismissOverlays(page);
  if (scrollY > 0) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await sleep(900);
  }
  await page.screenshot({
    path: file,
    type: "png",
    animations: "disabled",
  });
}

const out = join(projectRoot(), "public/projects/covers");
await mkdir(out, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 1,
  locale: "en-US",
  reducedMotion: "reduce",
});
const page = await context.newPage();

for (const target of targets) {
  const cover = join(out, `${target.slug}.png`);
  console.log(`Capturing ${target.slug} ← ${target.url}`);
  await capture(page, { url: target.url, file: cover });
  for (const extra of target.extras ?? []) {
    const file = join(out, `${extra.name}.png`);
    console.log(`  extra ${extra.name}`);
    await capture(page, {
      url: extra.url ?? target.url,
      file,
      scrollY: extra.scrollY,
    });
  }
}

await browser.close();
console.log("Project screenshots saved to public/projects/covers");
