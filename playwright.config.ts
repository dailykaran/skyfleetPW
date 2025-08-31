import { defineConfig, devices, firefox } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Define the directory to store test results
const resultsDir = path.resolve(__dirname, 'PW_Test_Results');
const allurePath = `${resultsDir}/allure_results`.replace(/\\/g, '/');

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 5 * 60 * 1000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: `${resultsDir}/playwright_report/html_report` } ],
    ['allure-playwright', { 
      resultsDir: allurePath,
      detail: true, 
      shortTitle: false }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    viewport: { width: 1366, height: 768 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000, 
    navigationTimeout: 15000, 
  },

  /* Configure projects for major browsers */
  projects: [
    {name: 'setup', testMatch: /.*\.setup\.ts/, teardown: "teardown" },
    {name: 'teardown', testMatch: /.*\.teardown\.ts/},
    {
      name: 'chrome',
      testMatch: ['tests/**/*.spec.ts'],
      use: { ...devices['Desktop Chrome'],
        channel: 'chrome',
        launchOptions: {
          slowMo: 400
        },
        actionTimeout: 15000,
        viewport: { width: 1366, height: 768 }, 
       },
      dependencies: ['setup'],
    },
 

/*     {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
 */
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
