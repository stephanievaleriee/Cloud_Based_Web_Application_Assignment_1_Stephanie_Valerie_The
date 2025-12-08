import { test, expect } from "@playwright/test";

test("Court Room page loads and updates dynamically (timer running)", async ({ page }) => {
  await page.goto("/courtRoom");

  // ✅ Find the timer display ONLY
  const timer = page.locator(".text-3xl"); // this is your timer text class

  // ✅ Capture initial value
  const firstValue = await timer.textContent();

  // ✅ Click Start
  await page.getByRole("button", { name: /start/i }).click();

  // ✅ Wait 2 seconds
  await page.waitForTimeout(2000);

  // ✅ Capture updated value
  const secondValue = await timer.textContent();

  // ✅ Assert timer changed
  expect(firstValue).not.toBe(secondValue);
});
