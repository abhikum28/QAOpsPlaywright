const {test} = require("@playwright/test");

test("Popup validations", async ({ page }) => {
  // Test code goes here
  await page.goto("https://rahulshettyacademy.com/automationpractice/");
  // await page.goto("http://google.com");
  // await page.goBack();
  // await page.goForward();
  
  page.on('dialog', dialog => dialog.accept());
  await page.locator("#confirmbtn").click();

  await page.locator("#mousehover").hover();
  await page.pause();
  const framePage = page.frameLocator("#courses-iframe");
  await framePage.locator("li a[href*='lifetime-access']:visible").click();

  // switch back to the default main page context
  await page.mainFrame();

  await page.locator("#hide-textbox").click();

});