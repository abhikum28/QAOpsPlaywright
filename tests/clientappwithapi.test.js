const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');
const { loginPayload } = require('../utils/loginData');

const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };

let response;
let apiUtils;
test.beforeAll(async () => {
    console.log("Before all tests");

    // Login API call to get the token
    const apiContext = await request.newContext();
    apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    
  });


// test.beforeEach(async () => {
//     console.log("Before each test");
// });

// verify order created is showing in orders page
test('Practice API scenario', async ({ page }) => {
  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client/");
  const userName = "abhikum28@hotmail.com";
  const productToOrder = "ZARA COAT 3";
  const products = page.locator(".card-body");
  const deliveryAddress = "Cuba";

  await page.locator("button[routerlink*=myorders]").click();
  await page.waitForLoadState("networkidle");
  // await page.pause();
  const orders = page.locator(".table tbody tr");
  await orders.first().waitFor();

  const orderCount = await orders.count();
  for(let i=0; i<orderCount; ++i) {
    const actualOrderId = await orders.nth(i).locator("th").textContent();
    if(actualOrderId === response.orderId) {
      await orders.nth(i).locator("button:has-text('View')").click();
      const orderIdSummaryPage = page.locator("div.col-text");
      await orderIdSummaryPage.waitFor();
      expect(orderIdSummaryPage).toHaveText(response.orderId);
      break;
    }
  }

});

test.afterAll(async () => {
  console.log("After all tests");
  if (apiUtils && response?.orderId) {
    await apiUtils.deleteOrder(response);
  }
});