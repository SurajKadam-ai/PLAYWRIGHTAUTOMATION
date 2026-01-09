const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

const LoginPayLoad = { userEmail: "surajkadam@gmail.com", userPassword: "Practice@123" }
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "68a961459320a140fe1ca57a" }] }
// let token; 
// let orderId; ==> Instead of this two we have created let response JavaScript Object which stores both values.
let response;
const fakePayLoadOrder = { data: [], message: "No Orders" };

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, LoginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
})

test.beforeEach(() => {


})
// test1, test2, and test3 -->> so that this beforeEach() test will execute before test1, test2, test3


test('Place the Order', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrder);
            route.fulfill(
                {
                    response,
                    body
                }
            )
            //intersepting response - API response ->{Playwright fakeresponse}-> browser -> render data on front end

        }
    )
    // await page.pause();

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    // await page.pause();
    console.log(await page.locator(".mt-4").textContent());

})