import { test, expect } from '@playwright/test';
import { inventory, InventoryPage } from '../pages/inventory.page';
import { checkout } from '../pages/checkout.page';

test.describe('Products inventory page tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(inventory.inventoryPageUrl);

    });

    test('Complete checkout flow', { tag: ['@e2e', '@smoke'] }, async ({ page }) => {
        //Inventory page
        const invPage = new InventoryPage(page);

        await invPage.addtoCartByName(inventory.items.item1Title);
        await invPage.addtoCartByName(inventory.items.item2Title);
        await page.locator(inventory.locator.shoppingCartLink).click();

        await invPage.expectPrice(inventory.items.item1Title, inventory.items.item1Price);
        await invPage.expectPrice(inventory.items.item2Title, inventory.items.item2Price);

        await page.locator(inventory.locator.checkoutBtn).click();

        //Checkout
        await page.locator(checkout.locator.firstName).click();
        await page.locator(checkout.locator.firstName).fill('Jarmo');
        await page.locator(checkout.locator.lastName).click();
        await page.locator(checkout.locator.lastName).fill('Testiläinen');
        await page.locator(checkout.locator.postalCode).click();
        await page.locator(checkout.locator.postalCode).fill('00580');
        await page.locator(checkout.locator.continueBtn).click();
        await page.locator(checkout.locator.finishBtn).click();

        await expect(page.locator(checkout.locator.completeHeader)).toBeVisible();
        await expect(page.locator(checkout.locator.completeText)).toBeVisible();
        await expect(page.locator(checkout.locator.completeLogo)).toBeVisible();
        await expect(page.locator(checkout.locator.completeHeader)).toHaveText(checkout.completeHeaderText);
        await expect(page.locator(checkout.locator.completeText)).toHaveText(checkout.completeText);

        await expect(page.locator(checkout.locator.backToProductsBtn)).toBeVisible();
    });

    // Separate element verification from smoke tests
    test('Verify checkout elements', async ({ page }) => {
        //Inventory page
        const invPage = new InventoryPage(page);

        await invPage.addtoCartByName(inventory.items.item1Title);
        await invPage.addtoCartByName(inventory.items.item2Title);
        await page.locator(inventory.locator.shoppingCartLink).click();

        await invPage.expectPrice(inventory.items.item1Title, inventory.items.item1Price);
        await invPage.expectPrice(inventory.items.item2Title, inventory.items.item2Price);

        await page.locator(inventory.locator.checkoutBtn).click();

        //Checkout
        await page.locator(checkout.locator.firstName).click();
        await page.locator(checkout.locator.firstName).fill('Jarmo');
        await page.locator(checkout.locator.lastName).click();
        await page.locator(checkout.locator.lastName).fill('Testiläinen');
        await page.locator(checkout.locator.postalCode).click();
        await page.locator(checkout.locator.postalCode).fill('00580');
        await page.locator(checkout.locator.continueBtn).click();

        //Checkout overview
        await expect(page.locator(checkout.locator.title)).toContainText('Checkout: Overview');

        expect(page
            .locator(checkout.locator.cartList)
            .filter({ hasText: `1${inventory.items.item1Title}` })
            .locator(checkout.locator.cartItemQty)
        );

        expect(page
            .locator(checkout.locator.cartList)
            .filter({ hasText: `1${inventory.items.item2Title}` })
            .locator(checkout.locator.cartItemQty)
        );

        await expect(page.locator(checkout.locator.paymentInfoValue)).toContainText(checkout.paymentInfo);

        await expect(page.locator(checkout.locator.shippingInfoValue)).toContainText(checkout.shipping);

        await expect(page.locator(checkout.locator.subtotalLbl)).toContainText(`Item total: $39.98`);
        await expect(page.locator(checkout.locator.taxLbl)).toContainText('Tax: $3.20');
        await expect(page.locator(checkout.locator.totalLbl)).toContainText('Total: $43.18');

        await page.locator(checkout.locator.finishBtn).click();

        //Completed purchase
        await expect(page.locator(checkout.locator.completeHeader)).toBeVisible();
        await expect(page.locator(checkout.locator.completeText)).toBeVisible();
        await expect(page.locator(checkout.locator.completeLogo)).toBeVisible();
        await expect(page.locator(checkout.locator.completeHeader)).toHaveText(checkout.completeHeaderText);
        await expect(page.locator(checkout.locator.completeText)).toHaveText(checkout.completeText);

        await expect(page.locator(checkout.locator.backToProductsBtn)).toBeVisible();
    });

    test('Can remove items from checkout', async ({ page }) => {
        //
    });


    test('Checkout session is restored when browser closes', async ({ page }) => {
        //
    });

    // And so forth...
});