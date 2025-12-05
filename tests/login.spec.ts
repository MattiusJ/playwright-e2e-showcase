import { test, expect } from '@playwright/test';
import env from '../config/settings';
import { chromium } from '@playwright/test';
import { LoginPage as login } from '../pages/login.page';

test.describe('Login functionality tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(env.baseUrl);
    });

    test('Successful login', async ({ page }) => {
        await expect(page).toHaveURL(env.baseUrl)
        await page.fill(login.username, env.username);
        await page.fill(login.password, env.password);
        await page.click(login.loginButton);
        await expect(page).toHaveURL(`${env.baseUrl}/inventory.html`);
    });

    test('Invalid login', async ({ page }) => {
        await expect(page).toHaveURL(env.baseUrl)
        await page.fill(login.username, 'absolutely');
        await page.fill(login.password, 'definite');
        await page.click(login.loginButton);

        await expect(page.locator(login.errorMessage)).toBeVisible();

        await expect(page.locator(login.errorMessage)).toHaveText(login.invalidLoginErrorMessage);

    });

    test('Invalid login - no username', async ({ page }) => {
        await expect(page).toHaveURL(env.baseUrl)
        await page.fill(login.username, '');
        await page.fill(login.password, env.password);
        await page.click(login.loginButton);

        await expect(page.locator(login.errorMessage)).toBeVisible();

        await expect(page.locator(login.errorMessage)).toHaveText(login.usernameRequiredErrorMessage);
    });

    test('Invalid login - no password', async ({ page }) => {
        await expect(page).toHaveURL(env.baseUrl)
        await page.fill(login.username, env.username);
        await page.fill(login.password, '');
        await page.click(login.loginButton);

        await expect(page.locator(login.errorMessage)).toBeVisible();

        await expect(page.locator(login.errorMessage)).toHaveText(login.passwordRequiredErrorMessage);
    });

    test('Locked out user login', async ({ page }) => {
        await expect(page).toHaveURL(env.baseUrl)
        await page.fill(login.username, 'locked_out_user');
        await page.fill(login.password, env.password);
        await page.click(login.loginButton);

        await expect(page.locator(login.errorMessage)).toBeVisible();

        await expect(page.locator(login.errorMessage)).toHaveText(login.lockedUserErrorMessage);

    });

    test('Successful login after wrong password', async ({ page }) => {
        await expect(page).toHaveURL(env.baseUrl)
        await page.fill(login.username, env.username);
        await page.fill(login.password, 'wrong_password');
        await page.click(login.loginButton);

        await expect(page.locator(login.errorMessage)).toBeVisible();

        await expect(page.locator(login.errorMessage)).toHaveText(login.invalidLoginErrorMessage);
        await page.click(login.errorButton);

        await page.fill(login.username, env.username);
        await page.fill(login.password, env.password);
        await page.click(login.loginButton);

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
        await expect(page.locator(login.errorMessage)).toBeVisible();
        await expect(page.locator(login.errorMessage)).toHaveText(login.noAccessErrorMessage);
        await page.click(login.errorButton);
    });
});