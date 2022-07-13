import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('div div div a img')).toHaveAttribute("alt",'CovidSafe.fyi');
})