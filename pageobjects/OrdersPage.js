const { expect } = require('@playwright/test');

class OrdersPage {
    constructor(page) {
        this.page = page;
        this.orders = page.locator('.table tbody tr');
        this.orderIdSummaryPage = page.locator('div.col-text');
    }

    async waitForOrders() {
        await this.orders.first().waitFor();
    }

    async viewOrder(orderId) {
        const orderCount = await this.orders.count();
        for (let i = 0; i < orderCount; ++i) {
            const actualOrderId = await this.orders.nth(i).locator('th').textContent();
            if (actualOrderId === orderId) {
                await this.orders.nth(i).locator("button:has-text('View')").click();
                await this.orderIdSummaryPage.waitFor();
                return;
            }
        }
    }

    async expectOrderIdInSummary(orderId) {
        await this.orderIdSummaryPage.waitFor();
        await expect(this.orderIdSummaryPage).toHaveText(orderId);
    }
}

module.exports = { OrdersPage };