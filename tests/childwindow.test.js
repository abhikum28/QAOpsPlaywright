const {test, expect} = require('@playwright/test');

test('Child window Playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    const [page2] = await Promise.all([
        context.waitForEvent('page'), // wait for new page to open
        documentLink.click() // trigger opening the new tab
    ]);

    const page2Title = page2.locator("section.page-title h1");
    expect(await page2Title.textContent()).toContain("Documents request");

    const text = await page2.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];

    // await userName.type(domain);

    // console.log(await userName.textContent());

    await page.bringToFront();
    await page.locator("#username").fill(domain);
    console.log('input value:', await page.locator('#username').inputValue());
});