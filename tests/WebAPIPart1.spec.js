const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

const LoginPayLoad = { userEmail: "surajkadam@gmail.com", userPassword: "Practice@123" }
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "68a961459320a140fe1ca57a" }] }
// let token; 
// let orderId; ==> Instead of this two we have created let response JavaScript Object which stores both values.
let response;
test.beforeAll('API', async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, LoginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
})

test.beforeEach(() => {

})
// test1, test2, and test3 -->> so that this beforeEach() test will execute before test1, test2, test3

test('@API Place the Order', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator('tbody').waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }

    }
    // then we need to check on view page with lot of assertions to value the details.
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

})