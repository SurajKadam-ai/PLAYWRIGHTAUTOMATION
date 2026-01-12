// const { expect } = require('@playwright/test');
// const { customtest } = require('../utils/test-base');
// const { POManager } = require('../pageobjects/POManager');
import {expect, type Page} from '@playwright/test';
import { POManager } from '../pageobjects_ts/POManager';
import {customtest} from '../utils_ts/test-base';
//json -> string -> JavaScript Object. [If you try to do like this - it will be the best way]
// const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));

customtest.only('Client App login', async ({ page, testDataForOrder }) => {
    const poManager = new POManager(page);
    // js file- Login js, DashboardPage
    const loginPage = poManager.getLoginPage();
    await loginPage.goTO();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();


    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    let orderId: any;
    orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
})
