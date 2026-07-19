class LoginPage {

    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator("input#userEmail");
        this.passwordInput = page.locator("input#userPassword");
        this.loginButton = page.locator("input#login");
    }

    async goTo() {
        return await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(userName, password) {
        await this.usernameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState("networkidle");
    }

}
module.exports = { LoginPage };