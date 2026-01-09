class LoginPage {

    constructor(page) {
        this.page = page;
        this.signInbutton = page.locator('#login');
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
    }

    async goTO() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(username, password) {

        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log(await this.page.title());
        //  await expect(this.page).toHaveTitle("Let's Shop");
        await this.page.locator(".card-body b").first().waitFor();

        // await this.page.waitForLoadState('networkidle');
    }

}
module.exports = { LoginPage };