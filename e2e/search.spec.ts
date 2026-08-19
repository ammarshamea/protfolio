import { test, expect } from "@playwright/test";

test.describe("Command palette", () => {
  test("opens via the header button, filters results, and navigates", async ({
    page,
  }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: "Open command menu" }).click();

    const input = page.getByPlaceholder(
      "Search projects, pages, technologies...",
    );
    await expect(input).toBeVisible();

    await input.fill("about");
    await page.getByRole("option", { name: /about/i }).first().click();
    await expect(page).toHaveURL(/\/en\/about$/);
  });

  test("opens with the Cmd/Ctrl+K shortcut", async ({ page }) => {
    await page.goto("/en");
    await page.keyboard.press("Control+k");
    await expect(
      page.getByPlaceholder("Search projects, pages, technologies..."),
    ).toBeVisible();
  });
});
