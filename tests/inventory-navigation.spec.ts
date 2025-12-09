/*
Just simple tests for showcasing. More complex tests can easily be added if needed, but now we want to keep things simple.
*/

import { test, expect, type Page } from '@playwright/test';
import { inventory } from '../pages/inventory.page';


test.describe('Products inventory page tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(inventory.inventoryPageUrl);
    });

    test('Inventory items are shown', async ({ page }) => {
        await expect(page).toHaveURL(inventory.inventoryPageUrl);

        await expect(page.getByText('Products')).toBeVisible();

        const inventoryItems = page.locator(inventory.locator.inventoryItems);
        await expect(inventoryItems).toHaveCount(6);
    });

    test('Inventory item description is shown', async ({ page }) => {
        const inventoryItems = page.locator(inventory.locator.inventoryItems);
        await expect(inventoryItems.first()).toContainText(inventory.items.item1Desc);
    });

    test('Inventory item prices is shown', async ({ page }) => {
        const inventoryItems = page.locator(inventory.locator.inventoryItems);
        await expect(inventoryItems.first()).toContainText(inventory.items.item1Price);
    });

    test('Inventory item title is shown', async ({ page }) => {
        const inventoryItems = page.locator(inventory.locator.inventoryItems);
        await expect(inventoryItems.first()).toContainText(inventory.items.item1Title);
    });

    test('Inventory images are shown', async ({ page }) => {
        const inventoryItems = page.locator(inventory.locator.inventoryItems);
        await expect(inventoryItems.first().locator('img')).toBeVisible();
        await expect(inventoryItems.first().locator('img')).toHaveCount(1);
    });

    test('Add to cart button is shown', async ({ page }) => {
        await expect(page.getByText('Products')).toBeVisible();
        const inventoryItems = page.locator(inventory.locator.inventoryItems);
        await expect(inventoryItems.first()).toContainText("Add to cart");
    });

    // Here we can start adding more tests to verify the sorting is done correctly and that items shown are in correct order.
    // Now we just keep it simple.
    test('Filter button is shown', async ({ page }) => {
        const sortBtn = page.getByRole('combobox');

        await sortBtn.selectOption('hilo');
        await expect(page.locator('[data-test="active-option"]')).toHaveText('Price (high to low)');

        // verify correct item order etc...
    });
});