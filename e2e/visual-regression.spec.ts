import { test, expect } from "@playwright/test";

/**
 * Screenshots a representative page from every top-level route in both
 * locales. Run `npx playwright test visual-regression --update-snapshots`
 * after an intentional visual change to refresh the baselines.
 */
const ROUTES = [
  "",
  "about",
  "projects",
  "projects/clyx-agency",
  "services",
  "experience",
  "skills",
  "tech-stack",
  "resume",
  "timeline",
  "blog",
  "open-source",
  "uses",
  "now",
  "roadmap",
  "reading",
  "toolbox",
  "playground",
  "lab",
  "favorites",
  "stats",
  "changelog",
  "speaking",
  "press",
  "sitemap-page",
  "contact",
  "api-docs",
  "terms",
  "privacy",
];

for (const locale of ["en", "ar"] as const) {
  for (const route of ROUTES) {
    test(`visual: /${locale}/${route}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`/${locale}/${route}`);
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(
        `${locale}-${route || "home"}.png`.replace(/\//g, "-"),
        {
          fullPage: true,
          timeout: 15_000,
        },
      );
    });
  }
}
