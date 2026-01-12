class APIUtils {

    constructor(apiContext, LoginPayLoad) {
        this.apiContext = apiContext;
        this.LoginPayLoad = LoginPayLoad;
    }

    async getToken() {

        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            { data: this.LoginPayLoad });
        // Now to verify the response using assertions.
        //   expect(loginResponse.ok()).toBeTruthy(); -->> this is not required because we're not doing actual test.
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayLoad) {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'authorization': response.token,
                'content-type': 'application/json',
            }
        })
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);

        if (!orderResponse.ok()) {
            throw new Error(`Order creation failed: ${orderResponseJson.message}`);
        }
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        return response;

    }
}

module.exports = { APIUtils };