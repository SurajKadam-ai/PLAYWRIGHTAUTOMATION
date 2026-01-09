const { test, expect } = require('@playwright/test');


test('Security test request intercept', async ({ page }) => {
    const userName = page.locator('#userEmail');
    const userPassword = page.locator('#userPassword');
    const email = "surajkadam@gmail.com";
    const login = page.locator('#login');
    const products = page.locator(".card-body");
    const productName = 'ZARA COAT 3';
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await userName.fill(email);
    await userPassword.fill("Practice@123");
    await login.click();
    // console.log(await page.title());
    // await expect(page).toHaveTitle("Let's Shop");
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    //login and reach orders page.
    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6953e5f3c941646b7a3414a2' })
    )
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
    await page.pause();

})