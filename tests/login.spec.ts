import { test, expect } from '@playwright/test';
import env from '../config/settings';
import { chromium } from '@playwright/test';

test.describe('Login functionality tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(env.baseUrl);
    });

    const errorLocator = '[data-test="error"]';
    const errorButtonLocator = '[data-test="error-button"]';
    const invalidLoginErrorMessage = 'Epic sadface: Username and password do not match any user in this service';
    const noAccessErrorMessage = `Epic sadface: You can only access '/inventory.html' when you are logged in.`;
    const lockedUserErrorMessage = 'Epic sadface: Sorry, this user has been locked out.';
    const usernameRequiredErrorMessage = 'Epic sadface: Username is required';
    const passwordRequiredErrorMessage = 'Epic sadface: Password is required';

    test('Successful login', async ({ page }) => {
        await expect(page).toHaveURL(env.baseUrl)
        await page.fill('[data-test="username"]', env.username);
        await page.fill('[data-test="password"]', env.password);
        await page.click('[data-test="login-button"]');
        await expect(page).toHaveURL(`${env.baseUrl}/inventory.html`);
    });

    test('Invalid login', async ({ page }) => {
        await expect(page).toHaveURL(env.baseUrl)
        await page.fill('[data-test="username"]', 'absolutely');
        await page.fill('[data-test="password"]', 'definite');
        await page.click('[data-test="login-button"]');

        await expect(page.locator(errorLocator)).toBeVisible();

        await expect(page.locator(errorLocator)).toHaveText(invalidLoginErrorMessage);

    });

    test('Invalid login - no username', async ({ page }) => {
        await expect(page).toHaveURL(env.baseUrl)
        await page.fill('[data-test="username"]', '');
        await page.fill('[data-test="password"]', env.password);
        await page.click('[data-test="login-button"]');

        await expect(page.locator(errorLocator)).toBeVisible();

        await expect(page.locator(errorLocator)).toHaveText(usernameRequiredErrorMessage);
    });

    test('Invalid login - no password', async ({ page }) => {
        await expect(page).toHaveURL(env.baseUrl)
        await page.fill('[data-test="username"]', env.username);
        await page.fill('[data-test="password"]', '');
        await page.click('[data-test="login-button"]');

        await expect(page.locator(errorLocator)).toBeVisible();

        await expect(page.locator(errorLocator)).toHaveText(passwordRequiredErrorMessage);
    });

    test('Locked out user login', async ({ page }) => {
        await expect(page).toHaveURL(env.baseUrl)
        await page.fill('[data-test="username"]', 'locked_out_user');
        await page.fill('[data-test="password"]', env.password);
        await page.click('[data-test="login-button"]');

        await expect(page.locator(errorLocator)).toBeVisible();

        await expect(page.locator(errorLocator)).toHaveText(lockedUserErrorMessage);

    });

    test('Successful login after wrong password', async ({ page }) => {
        await expect(page).toHaveURL(env.baseUrl)
        await page.fill('[data-test="username"]', env.username);
        await page.fill('[data-test="password"]', 'wrong_password');
        await page.click('[data-test="login-button"]');

        await expect(page.locator(errorLocator)).toBeVisible();

        await expect(page.locator(errorLocator)).toHaveText(invalidLoginErrorMessage);
        await page.click(errorButtonLocator);

        await page.fill('[data-test="username"]', env.username);
        await page.fill('[data-test="password"]', env.password);
        await page.click('[data-test="login-button"]');

        await expect(page).toHaveURL(`${env.baseUrl}/inventory.html`);
    });

    test('Inventory page cannot be accessed without login', async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext({
            storageState: { cookies: [], origins: [] },  // explicitly empty
        });
        const page = await context.newPage();

        await page.goto(`${env.baseUrl}/inventory.html`);
        await expect(page).toHaveURL(env.baseUrl);
        await expect(page.locator(errorLocator)).toBeVisible();
        await expect(page.locator(errorLocator)).toHaveText(noAccessErrorMessage);
        await page.click(errorButtonLocator);
    });
});