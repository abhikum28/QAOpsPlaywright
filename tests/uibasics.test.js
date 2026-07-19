const { test, expect } = require('@playwright/test');

test('Browser context Playwright test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const username = page.locator("input#username");
  const password = page.locator("input[id='password']");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  //await expect(page).toHaveTitle("Rahul Shetty Academy | QA Automation, Playwright, AI Testing & Online Training");
  await username.fill("maryjane");
  await password.fill("password45");
  //await page.waitForTimeout(5000);
  await signIn.click();
  //console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
  await username.fill("");
  await username.fill("rahulshettyacademy");
  await password.fill("");
  await password.fill("Learning@830$3mK2");
  await page.locator("input[id='terms']").check();
  await signIn.click();
  // console.log(await cardTitles.first().textContent());
  // console.log(await cardTitles.nth(0).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test('Browser Page Playwright test', async ({ page }) => {
  await page.goto("https://google.com");
  await expect(page).toHaveTitle("Google");
});

test('Select dropdown and radio button', async ({ page }) => {
  
  const radioBtns = page.locator("span.radiotextsty");
  const selectDropDown = page.locator("select[data-style='btn-info']");
  const termsCheckBox = page.locator("#terms");
  const blinkText = page.locator("[href*='documents-request']");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await expect(blinkText).toHaveAttribute("class", "blinkingText");

  await radioBtns.nth(1).click();
  await page.locator(".btn.btn-success").click();
  await expect(radioBtns.nth(1)).toBeChecked();

  await termsCheckBox.click();
  await expect(termsCheckBox).toBeChecked();
  await termsCheckBox.uncheck();
  //expect(await termsCheckBox.isChecked()).toBeFalsy();
  await expect(termsCheckBox).not.toBeChecked();

  await selectDropDown.selectOption("consult");
  await expect(selectDropDown).toHaveValue("consult");

});