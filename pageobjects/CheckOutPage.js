class CheckOutPage {
    constructor(page) {
        this.page = page;
        this.cardInputs = page.locator("div.title + input");
        this.expirySelects = page.locator("select.input.ddl");
        this.nameInput = page.locator("div.title + input[class='input txt']").nth(1);
        this.couponInput = page.locator("input[name='coupon']");
        this.applyCouponButton = page.locator("button:has-text('Apply Coupon')");
        this.couponMessage = page.locator("p.ng-star-inserted");
        this.countryInput = page.locator("[placeholder*='Country']");
        this.countryResults = page.locator(".ta-results");
        this.userNameLabel = page.locator("div.user__name label");
        this.submitButton = page.locator("a.action__submit");
    }

    async fillCardDetails(cardNumber, monthLabel, yearLabel, cvv, name) {
        await this.cardInputs.nth(0).fill(cardNumber);
        await this.expirySelects.nth(0).selectOption({ label: monthLabel });
        await this.expirySelects.nth(1).selectOption({ label: yearLabel });
        await this.cardInputs.nth(1).fill(cvv);
        await this.nameInput.fill(name);
    }

    async applyCoupon(code) {
        await this.couponInput.fill(code);
        await this.applyCouponButton.click();
        await this.couponMessage.waitFor();
    }

    async selectCountry(deliveryAddress) {
        await this.countryInput.pressSequentially("Ind", { delay: 150 });
        await this.countryResults.waitFor();
        const optionCount = await this.countryResults.locator("button").count();
        for (let i = 0; i < optionCount; ++i) {
            const text = await this.countryResults.locator("button").nth(i).textContent();
            if (text.trim() === deliveryAddress) {
                await this.countryResults.locator("button").nth(i).click();
                break;
            }
        }
    }

    async clickSubmit() {
        await this.submitButton.click();
        await this.page.waitForLoadState("networkidle");
    }
}

module.exports = { CheckOutPage };
