import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/auth/logout');

  // Expect h3 to contain a substring.
  expect(await page.locator('h1').innerText()).toContain('Login');
});
