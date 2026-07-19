// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  projects: [
    {
      name : 'firefox',
      use: {
        browserName : 'firefox',
        headless : true,
        screenshot : 'only-on-failure',
        trace : 'retain-on-failure',
      }
    },
    {
      name : 'chromium',
      use: {
        browserName : 'chromium',
        headless : false,
        screenshot : 'only-on-failure',
        trace : 'retain-on-failure',
      },
    }
  ]
});
