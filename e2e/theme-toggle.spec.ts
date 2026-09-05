import { test, expect } from "@playwright/test";

test("theme toggle cycles through light, dark, and high-contrast", async ({
  page,
}) => {
  await page.goto("/en");
  const toggle = page.getByRole("button", { name: "Toggle theme" });
  const html = page.locator("html");

  await expect(html).toHaveAttribute("data-theme", "light");

  await toggle.click();
  await expect(html).toHaveAttribute("data-theme", "dark");

  await toggle.click();
  await expect(html).toHaveAttribute("data-theme", "high-contrast");

  await toggle.click();
  await expect(html).toHaveAttribute("data-theme", "light");
});
