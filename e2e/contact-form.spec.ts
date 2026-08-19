import { test, expect } from "@playwright/test";

test("submitting the contact form shows a success message", async ({
  page,
}) => {
  await page.goto("/en/contact");
  const form = page.locator("form");

  await form.getByLabel("Name").fill("Test User");
  await form.getByLabel("Email").fill("test.user@example.com");
  await form.getByLabel("Subject").fill("Playwright E2E test");
  await form
    .getByLabel("Message")
    .fill("This is an automated end-to-end test submission.");

  await form.getByRole("button", { name: /send message/i }).click();
  await expect(page.getByText(/message sent/i)).toBeVisible({
    timeout: 10_000,
  });
});
