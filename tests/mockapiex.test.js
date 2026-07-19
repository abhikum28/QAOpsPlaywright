const {test, expect} = require('@playwright/test');
const mockResponse = require('../utils/MockResponse.json');

test('MOck API test', async ({ page }) => {
    // Mock the api call before navigating
    await page.route('*/**/api/v1/fruits', async route => {
        await route.fulfill({ json: mockResponse });
    });

    // Go to the page
    await page.goto('https://demo.playwright.dev/api-mocking');

    // Assert that the mocked values
    await expect(page.getByText('playwright by testers talk')).toBeVisible();
    await expect(page.getByText('cypress by testers talk')).toBeVisible();
    await expect(page.getByText('api testing by testers talk')).toBeVisible();
    await expect(page.getByText('postman by testers talk')).toBeVisible();
    await expect(page.getByText('rest assured by testers talk')).toBeVisible();
    await page.pause();
});