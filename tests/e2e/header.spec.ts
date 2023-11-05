import { test, expect } from '@playwright/test';

test.describe('Header', () => {
  test('Is visible', async ({ page }) => {
    await page.goto('http://localhost:5173/table-of-contents/');

    const header = page.locator('data-test-id=page-header');

    await expect(header).toBeVisible();
  });

  test('Has correct title', async ({ page }) => {
    await page.goto('http://localhost:5173/table-of-contents/');

    const header = page.locator('data-test-id=page-header');

    await expect(header).toHaveText('Product name');
  });

  test('Visually looks correct', async ({ page }) => {
    await page.goto('http://localhost:5173/table-of-contents/');

    const header = page.locator('data-test-id=page-header');

    await expect(header).toHaveScreenshot();
  });
});
