const { test, expect } = require('@playwright/test');

test('Finding first product on page', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = await page.locator('#userEmail');
    const userPassword = await page.locator('#userPassword');
    const login = await page.locator('#login');
    const ProductName = await page.locator('.card-body b');
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await userName.fill("surajkadam@gmail.com");
    await userPassword.fill("Practice@123");
    await login.click();
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");

    console.log(await ProductName.first().textContent());
    console.log(await ProductName.nth(2).textContent());
    const allProducts = await ProductName.allTextContents();
    console.log(await allProducts);
})
