const { expect } = require('@playwright/test');

class OrderConfirmationPage {
    constructor(page) {
        this.page = page;
        this.thankYouHeading = page.locator("h1");
        this.orderIdLabel = page.locator("label.ng-star-inserted");
        this.myOrdersButton = page.locator("button[routerlink*=myorders]");
    }

    async waitForConfirmation() {
        await this.page.waitForLoadState("networkidle");
        await this.thankYouHeading.waitFor();
        await expect(this.thankYouHeading).toHaveText("Thankyou for the order.");
    }

    async getOrderId() {
        const orderIdDet = await this.orderIdLabel.textContent();
        return orderIdDet.split("|")[1].trim();
    }

    async goToMyOrders() {
        await this.myOrdersButton.click();
        await this.page.waitForLoadState("networkidle");
    }
}

module.exports = { OrderConfirmationPage };
