class DashBoardPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productText = page.locator(".card-body b");
        this.cartButton = page.locator("button[routerlink*='cart']");
    }
    
    async addProductToCart(productToOrder) {
        await this.productText.first().waitFor();
        const titles = await this.productText.allTextContents();
        console.log(titles);
        const count  = await this.products.count();
        for(let i=0; i<count; ++i) {
            const text = await this.products.nth(i).locator("b").textContent();
            if(text === productToOrder) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async goToCart() {
        await this.cartButton.click();
    }
}
module.exports = { DashBoardPage };