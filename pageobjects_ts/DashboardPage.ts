import {type Page, type Locator} from '@playwright/test';
export class DashboardPage {
page: Page;
products: Locator;
productTexts: Locator;
carts: Locator;
orders: Locator;
    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productTexts = page.locator(".card-body b");
        this.carts = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
    }

    async searchProductAddCart(productName:string) {

        const titles = await this.productTexts.allTextContents();
        console.log(titles);
        const counts = await this.products.count();
        // Now iterating the product using for loop.
        for (let i = 0; i < counts; ++i) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                // add to cart
                await this.products.nth(i).locator("text = Add To Cart").click();
                await console.log("Item Successfully added: " + this.products.nth(i));
                break;
            }
        }
    }

    async navigateToOrders() {
        await this.orders.click();
    }

    async navigateToCart() {
        await this.carts.click();
    }
}
// module.exports = { DashboardPage }; Not need in TypeScript. Declare above before class name.
