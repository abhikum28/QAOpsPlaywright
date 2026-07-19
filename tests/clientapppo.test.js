const { test, expect } = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');
//JSON -> string -> object
const testData = JSON.parse(JSON.stringify(require('../utils/clientapppoTestData.json')));

for(const data of testData) {
  test(`Validate Order Product : ${data.productName}`, async ({ page }) => {
    //const productNames = page.locator("div.card b");
    const productToOrder = data.productName;
    const userName = data.userName;
    const password = data.password;
    const deliveryAddress = data.deliveryAddress;
    const products = page.locator(".card-body");

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashBoardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const checkOutPage = poManager.getCheckoutPage();
    const orderConfirmationPage = poManager.getOrderConfirmationPage();
    const ordersPage = poManager.getOrdersPage();

    await loginPage.goTo();
    await loginPage.validLogin(userName, password);

    await dashBoardPage.addProductToCart(productToOrder);
    await dashBoardPage.goToCart();
    
    const isProductAdded = await cartPage.isProductVisible(productToOrder);
    expect(isProductAdded).toBeTruthy();

    await cartPage.clickCheckout();
    
    await checkOutPage.fillCardDetails("6573 9931 9292 2293", '04', '05', '657', 'Abhi');
    await checkOutPage.applyCoupon("rahulshettyacademy");
    await checkOutPage.selectCountry(deliveryAddress);
    await expect(checkOutPage.userNameLabel).toHaveText(userName);
    await checkOutPage.clickSubmit();

    await orderConfirmationPage.waitForConfirmation();
    const orderId = await orderConfirmationPage.getOrderId();
    console.log(orderId);
    await orderConfirmationPage.goToMyOrders();
    
    await ordersPage.waitForOrders();
    await ordersPage.viewOrder(orderId);
    await ordersPage.expectOrderIdInSummary(orderId);
  });
}