import { test, expect } from '@playwright/test';

test('Backlog page loads session logs from database', async ({ page }) => {
  await page.goto('/backlog');

  const rows = page.locator('tbody tr');

  await expect(rows.first()).toBeVisible();
});
