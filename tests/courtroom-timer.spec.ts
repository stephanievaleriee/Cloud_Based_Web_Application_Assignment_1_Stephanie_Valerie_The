import { test, expect } from '@playwright/test';

test('Court Room page loads and updates dynamically (timer running)', async ({ page }) => {
  await page.goto('/courtRoom'); 

  await expect(page).toHaveURL(/courtRoom/);

  const firstSnapshot = await page.content();

  await page.waitForTimeout(2500);

  const secondSnapshot = await page.content();

  expect(firstSnapshot).not.toBe(secondSnapshot);
});
