import { test, expect, type Page } from '@playwright/test';
import env from '../config/settings';


const inventoryPageUrl = `${env.baseUrl}/inventory.html`;
const inventoryContainerLocator = '[data-test="inventory-container]';
const inventoryListContainerLocator = '[data-test="inventory-list"]';
const inventoryItemLocator = '[data-test="inventory-item"]';
const inventoryItemImgLocator = '[class="inventory_item_img"]';

test.describe('Products inventory page tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(inventoryPageUrl);
    });

    test('Inventory items are shown', async ({ page }) => {
        await expect(page).toHaveURL(inventoryPageUrl);

        await expect(page.getByText('Products')).toBeVisible();
    });
});