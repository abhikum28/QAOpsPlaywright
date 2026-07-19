const { test, expect } = require('@playwright/test');

test('Practice wait scenario', async ({ page }) => {

  //const productNames = page.locator("div.card b");
  const productToOrder = "ZARA COAT 3";
  const products = page.locator(".card-body");
  const userName = "abhikum28@hotmail.com";
  const deliveryAddress = "India";
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("input#userEmail").fill(userName);
  await page.locator("input#userPassword").fill("Le@rning15");
  await page.locator("input#login").click();
  await page.waitForLoadState("networkidle");

  await page.setViewportSize({ width: 1920, height: 1080 });

  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count  = await products.count();
  for(let i=0; i<count; ++i) {
    const text = await products.nth(i).locator("b").textContent();
    if(text === productToOrder) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  //await page.pause();
  await page.locator("button[routerlink*='cart']").click();

  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();

  await page.locator("button:has-text('Checkout')").click();

  await page.locator("div.title + input").nth(0).fill("6573 9931 9292 2293");

  await page.locator("select.input.ddl").nth(0).selectOption({ label: '04' });
  await page.locator("select.input.ddl").nth(1).selectOption({ label: '05' });

  await page.locator("div.title + input").nth(1).fill("657");

  await page.locator("div.title + input[class='input txt']").nth(1).fill("Abhi");

  await page.locator("input[name='coupon']").fill("rahulshettyacademy");

  await page.locator("button:has-text('Apply Coupon')").click();

  await page.locator("p.ng-star-inserted").waitFor();

  //await page.locator("[placeholder*='Country']").pressSequentially("India", "ArrowDown", "Enter");
  await page.locator("[placeholder*='Country']").pressSequentially("Ind", { delay: 150 });
  const dropDownOptions = page.locator(".ta-results");
  await dropDownOptions.waitFor();
  const optionCount = await dropDownOptions.locator("button").count();
  for(let i=0; i<optionCount; ++i) {
    const text = await dropDownOptions.locator("button").nth(i).textContent();
    if(text.trim() === deliveryAddress) {
      await dropDownOptions.locator("button").nth(i).click();
      break;
    }
  }

  await expect(page.locator("div.user__name label")).toHaveText(userName);

  await page.locator("a.action__submit").click();

  await page.waitForLoadState("networkidle");

  await expect(page.locator("h1")).toHaveText("Thankyou for the order.");

  //await page.screenshot({ path: "orderplaced.png", fullPage: true });
  const orderIdDet = await page.locator("label.ng-star-inserted").textContent();

  const orderId = orderIdDet.split("|")[1].trim();

  console.log(orderId);

  await page.locator("button[routerlink*=myorders]").click();
  await page.waitForLoadState("networkidle");
  
  const orders = page.locator(".table tbody tr");
  await orders.first().waitFor();

  const orderCount = await orders.count();
  for(let i=0; i<orderCount; ++i) {
    const actualOrderId = await orders.nth(i).locator("th").textContent();
    if(actualOrderId === orderId) {
      await orders.nth(i).locator("button:has-text('View')").click();
      const orderIdSummaryPage = page.locator("div.col-text");
      await orderIdSummaryPage.waitFor();
      expect(orderIdSummaryPage).toHaveText(orderId);
      break;
    }
  }
  

  // await products.first().waitFor();
  // const productTexts = await products.allTextContents();
  // console.log(productTexts);



});