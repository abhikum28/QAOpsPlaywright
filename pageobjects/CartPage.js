class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator("div li");
        this.checkoutButton = page.locator("button:has-text('Checkout')");
    }

    async waitForFirstItem() {
        await this.cartItems.first().waitFor();
    }

    async isProductVisible(productName) {
        await this.waitForFirstItem();
        return await this.page.locator(`h3:has-text("${productName}")`).isVisible();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }
}

module.exports = { CartPage };
