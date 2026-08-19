import { test, expect } from "@playwright/test";

test("resume page offers a vCard download", async ({ page }) => {
  await page.goto("/en/resume");

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: /save contact/i }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toMatch(/\.vcf$/);
});
