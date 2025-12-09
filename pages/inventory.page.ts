import { expect, Page } from '@playwright/test';
import env from '../config/settings';

export const inventory = {
    inventoryPageUrl: `${env.baseUrl}/inventory.html`,

    // Item texts
    items: {
        item1Title: 'Sauce Labs Backpack',
        item1Desc: `carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.`,
        item1Loc: 'asdf',
        item1Price: '$29.99',
        item2Title: 'Sauce Labs Bike Light',
        item2Desc: `A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.`,
        item2Price: '$9.99',
        item2Loc: '',
    },

    locator: {
        inventoryList: '[data-test="inventory-list"]',
        inventoryItems: '[data-test="inventory-item"]',
        inventoryItemName: '[data-test="inventory-item-name"]',
        inventoryItemImg: '[class="inventory_item_img"]',
        addToCartButton: '[data-test^="add-to-cart"]', // <-- ^= means starts with...
        inventoryItemDescription: '[data-test="inventory-item-description"]',
        inventoryItemPrice: '[data-test="inventory-item-price"]',
        shoppingCartLink: '[data-test="shopping-cart-link"]',
        checkoutBtn: '[data-test="checkout"]',

        // Sort functionality
        sortButton: '[data-test="product-sort-container"]',
    },
} as const

// async function addToCartByName(page: Page, prName: string) {
//     await page
//         .getBy()
//         .filter({ has: page.getByRole('heading', { name: prName }) })
//         .getByRole('button', { name: 'Add to cart' })
//         .click();
//     //*[@id="add-to-cart-sauce-labs-backpack"]

// }

export class InventoryPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    item(name: string) {
        return this.page.locator('[data-test="inventory-item"]').filter({
            hasText: name
        });
    }

    async addtoCartByName(name: string) {
        await this.item(name).locator('button:has-text("Add to cart")').click();
    }

    async expectPrice(name: string, price: string) {
        await expect(this.item(name).locator('[data-test="inventory-item-price"]')).toHaveText(price);
    }
}