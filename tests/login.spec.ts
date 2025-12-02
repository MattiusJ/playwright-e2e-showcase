import { test, expect } from '@playwright/test';
import env from '../config/settings';

test.describe('Login functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(env.baseUrl);
    });

    const errorLocator = '[data-test="error"]';
    const errorButtonLocator = '[data-test="error-button"]';
    const errorInvaliText = 'Epic sadface: Username and password do not match any user in this service';
    const errorLockedUserText = 'Epic sadface: Sorry, this user has been locked out.';

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

        await expect(page.locator(errorLocator)).toHaveText(errorInvaliText);

    });

    test('Locked out user login', async ({ page }) => {
        await expect(page).toHaveURL(env.baseUrl)
        await page.fill('[data-test="username"]', 'locked_out_user');
        await page.fill('[data-test="password"]', env.password);
        await page.click('[data-test="login-button"]');

        await expect(page.locator(errorLocator)).toBeVisible();

        await expect(page.locator(errorLocator)).toHaveText(errorLockedUserText);

    });

    test('Successful login after wrong password', async ({ page }) => {
        await expect(page).toHaveURL(env.baseUrl)
        await page.fill('[data-test="username"]', env.username);
        await page.fill('[data-test="password"]', 'wrong_password');
        await page.click('[data-test="login-button"]');

        await expect(page.locator(errorLocator)).toBeVisible();

        await expect(page.locator(errorLocator)).toHaveText(errorInvaliText);
        await page.click(errorButtonLocator);

        await page.fill('[data-test="username"]', env.username);
        await page.fill('[data-test="password"]', env.password);
        await page.click('[data-test="login-button"]');

        await expect(page).toHaveURL(`${env.baseUrl}/inventory.html`);
    });



});