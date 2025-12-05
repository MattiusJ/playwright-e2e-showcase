import { test as setup, expect } from '@playwright/test';
import { authFile } from '../playwright.config';
import env from '../config/settings';

setup('Do login and save state ', async ({ page }) => {
  await page.goto(env.baseUrl);
  await page.fill('[data-test="username"]', env.username);
  await page.fill('[data-test="password"]', env.password);
  await page.click('[data-test="login-button"]');
  await expect(page).toHaveURL(`${env.baseUrl}/inventory.html`);

  await page.context().storageState({ path: authFile });
});