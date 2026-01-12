// const { test, expect } = require('@playwright/test');
// const { POManager } = require('../pageobjects/POManager');
import {test, expect, type Page, type Locator} from '@playwright/test';
import {POManager} from '../pageobjects_ts/POManager';
//json -> string -> JavaScript Object. [If you try to do like this - it will be the best way]
const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));

// const { LoginPage } = require('../pageobjects/LoginPage');
// const { DashboardPage } = require('../pageobjects/DashboardPage');

for (const data of dataset) {
    test(`@Web Client App login for ${data.productName}`, async ({ page }) => {
        const poManager = new POManager(page);
        // js file- Login js, DashboardPage
        const loginPage = poManager.getLoginPage();
        await loginPage.goTO();
        await loginPage.validLogin(data.username, data.password);
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();


        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();

        const ordersReviewPage = poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");
        const orderId :any = await ordersReviewPage.SubmitAndGetOrderId();
        await page.pause();
        console.log(orderId);
        await dashboardPage.navigateToOrders();
        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();


        // await page.locator("div li").last().waitFor();
        // const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
        // expect(bool).toBeTruthy();
        // await page.locator("text=Checkout").click();
        // await page.locator("[placeholder*=Country]").pressSequentially("ind");
        // const dropdown = page.locator(".ta-results");
        // await dropdown.waitFor();
        // const optionsCount = await dropdown.locator("button").count();
        // for (let i = 1; i < optionsCount; ++i) {
        //     const text = await dropdown.locator("button").nth(i).textContent();
        //     if (text === " India") {
        //         await dropdown.locator("button").nth(i).click();
        //         break;
        //     }
        // }
        // expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
        // //add the remaining field edit to before clicking on 'Place Order' button.
        // await page.locator(".action__submit").click();
        // await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        // const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        // console.log(orderId);

        // await page.locator("button[routerlink*='myorders']").click();
        // await page.locator('tbody').waitFor();
        // const rows = await page.locator("tbody tr");
        // for (let i = 0; i < await rows.count(); ++i) {
        //     const rowOrderId = await rows.nth(i).locator("th").textContent();
        //     if (orderId.includes(rowOrderId)) {
        //         await rows.nth(i).locator("button").first().click();
        //         break;
        //     }

        // }
        // // then we need to check on view page with lot of assertions to value the details.
        // const orderIdDetails = await page.locator(".col-text").textContent();
        // expect(orderId.includes(orderIdDetails)).toBeTruthy();

    })
}