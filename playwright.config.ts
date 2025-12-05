import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();
import path from 'path';

export const authFile = path.join(__dirname, 'playwright/.auth/user.json');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    // {
    //   name: 'authenticated',
    //   testMatch: /.*\.loggedin\.spec\.ts/,
    //   dependencies: ['setup'],
    //   use: {
    //     storageState: authFile,
    //   },
    // },
    // {
    //   name: 'login tests',
    //   testMatch: ['login.spec.ts'],
    //   // testIgnore: ['**s/*login.spec.ts', '**/*.setup.ts'],
    // },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: authFile,
      },
    },

    {
      name: 'firefox',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Firefox'],
        storageState: authFile,
      },
    },

    {
      name: 'webkit',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Safari'],
        storageState: authFile,
      },
    },
    {
      name: 'login-tests',
      testMatch: 'login.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
        trace: 'on-first-retry',
        storageState: '',
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
