const {LoginPage} = require("./LoginPage");
const {DashBoardPage} = require("./DashboardPage");
const {CartPage} = require("./CartPage");
const {CheckOutPage} = require("./CheckOutPage");
const {OrderConfirmationPage} = require("./OrderConfirmationPage");
const {OrdersPage} = require("./OrdersPage");

class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashBoardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckOutPage(this.page);
        this.orderConfirmationPage = new OrderConfirmationPage(this.page);
        this.ordersPage = new OrdersPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getOrderConfirmationPage() {
        return this.orderConfirmationPage;
    }

    getOrdersPage() {
        return this.ordersPage;
    }
}

module.exports = { POManager };