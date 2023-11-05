import { test, expect } from '@playwright/test';

test.describe('Table of contents', () => {
  test.describe('Search', () => {
    test('Ensure all toc-menu-item elements contain search term after type', async ({
      page,
    }) => {
      const searchTerm = 'java';

      await page.goto('http://localhost:5173/table-of-contents/');
      await page.fill('data-test-id=toc-search-input', searchTerm);
      await page.waitForTimeout(1000);

      const menuItems = await page
        .locator('data-test-id=toc-menu-item')
        .elementHandles();

      for (const item of menuItems) {
        const text = await item.textContent();

        if (text) {
          expect(text.toLowerCase()).toContain(searchTerm);
        }
      }
    });

    test('Count menu items before and after search', async ({ page }) => {
      await page.goto('http://localhost:5173/table-of-contents/');
      await page.locator('data-test-id=toc-menu').isVisible();
      await page.waitForTimeout(1000);

      const initialMenuItemsCount = await page.$$eval(
        'data-test-id=toc-menu-item',
        (items) => items.length,
      );

      const searchTerm = 'java';

      await page.fill('data-test-id=toc-search-input', searchTerm);
      await page.waitForTimeout(1000);

      await page.fill('data-test-id=toc-search-input', '');
      await page.waitForTimeout(1000);

      const afterClearMenuItemsCount = await page.$$eval(
        'data-test-id=toc-menu-item',
        (items) => items.length,
      );

      expect(initialMenuItemsCount).toEqual(afterClearMenuItemsCount);
    });
  });

  test.describe('Menu item', () => {
    test('Toggle menu item', async ({ page }) => {
      await page.goto('http://localhost:5173/table-of-contents/');
      await page.waitForTimeout(1000);

      const menuItemsInit = await page
        .locator('data-test-id=toc-menu-item')
        .elementHandles();

      const menuItemWithToggle = await page.$(
        '[data-test-id=toc-menu-item]:has(svg[data-test-id="toc-menu-item-icon"])',
      );

      if (menuItemWithToggle) {
        await menuItemWithToggle.click();
        await page.waitForTimeout(1000);

        const menuItemsAfterExpand = await page
          .locator('data-test-id=toc-menu-item')
          .elementHandles();

        expect(menuItemsAfterExpand.length).toBeGreaterThan(
          menuItemsInit.length,
        );

        await menuItemWithToggle.click();
        await page.waitForTimeout(1000);

        const menuItemsAfterShrink = await page
          .locator('data-test-id=toc-menu-item')
          .elementHandles();

        expect(menuItemsAfterShrink.length).toEqual(menuItemsInit.length);
      }
    });

    test('Set active menu item', async ({ page }) => {
      await page.goto('http://localhost:5173/table-of-contents/');
      await page.locator('data-test-id=toc-menu').isVisible();

      const itemLocator = page.locator('data-test-id=toc-menu-item').first();

      await expect(itemLocator).not.toHaveClass(/active/);
      await itemLocator.click();
      await expect(itemLocator).toHaveClass(/active/);
    });
  });

  test('Menu items. Check for successful request toc data', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173/table-of-contents/');

    const response = await page.waitForResponse(
      'http://localhost:5173/table-of-contents/toc-data.json',
    );

    expect(response.status()).toEqual(200);
  });
});
