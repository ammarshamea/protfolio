import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("home page loads with primary nav", async ({ page }) => {
    await page.goto("/en");
    await expect(
      page.getByRole("navigation", { name: "Primary" }),
    ).toBeVisible();
    await expect(page).toHaveTitle(/.+/);
  });

  test("navigating to Projects via the header updates the URL", async ({
    page,
  }) => {
    await page.goto("/en");
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Projects" })
      .click();
    await expect(page).toHaveURL(/\/en\/projects$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("a project case study opens from the projects grid", async ({
    page,
  }) => {
    await page.goto("/en/projects");
    const firstCard = page
      .locator('#main-content a[href^="/en/projects/"]')
      .first();
    await firstCard.click();
    await expect(page).toHaveURL(/\/en\/projects\/[^/]+$/);
  });

  test("Arabic locale renders right-to-left", async ({ page }) => {
    await page.goto("/ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });

  test("custom 404 page renders for an unknown route", async ({ page }) => {
    const response = await page.goto("/en/this-route-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("link", { name: /go to homepage/i }),
    ).toBeVisible();
  });
});
