import { test, expect } from '@playwright/test';

test.describe('Home', () => {
  test('Check for successful request toc data', async ({ page }) => {
    await page.goto('http://localhost:5173/table-of-contents/');

    const response = await page.waitForResponse(
      'http://localhost:5173/table-of-contents/toc-data.json',
    );

    expect(response.status()).toEqual(200);
  });
});
