const { test, expect } = require('@playwright/test');


test.only('Client App login', async ({ page }) => {
    //const userName = page.locator('#userEmail');
    //const userPassword = page.locator('#userPassword');
    const email = "surajkadam@gmail.com";
    // const login = page.locator('#login');
    const products = page.locator(".card-body");
    const productName = 'ZARA COAT 3';
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Practice@123");
    await page.getByRole("button", { name: 'login' }).click();
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator(".card-body").filter({ hasText: "ZARA COAT 3" })
        .getByRole("button", { name: "Add To Cart" }).click();
    await page.getByRole('listitem').getByRole('button', { name: "Cart" }).click();

    await page.locator("div li").last().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByRole('button', { name: "Checkout" }).click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole('button', { name: "India" }).nth(1).click();

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    //add the remaining field edit to before clicking on 'Place Order' button.
    await page.getByText("PLACE ORDER").click();
    await page.getByText("Thankyou for the order.").isVisible();
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

})