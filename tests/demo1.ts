import { expect, type Locator, type Page } from '@playwright/test';

let message1:string = "Hello";
message1 = "bye";
console.log(message1);
let age1: number = 21;
console.log(age1);
let isActive: boolean = true;
console.log(isActive);
let numbers1 : number[] = [1,2,3];
console.log(numbers1);
let data: any = "This could be anything";
console.log(data);
data = 42;
console.log(data);

function add(a: number,b: number): number{
    return a+b;
}

add(3,4);
console.log(add(3,4 ));

let user: {name: string, age: number, location: string} = {name: " Bob", age: 34, location: "Delhi"};
user.location = "hydrabad";

//const { test, expect} = require('@playwright/test');
class CartPage {
    page: Page;
    cartProducts: Locator;
    productsText: Locator;
    cart: Locator;
    orders: Locator;
    checkout: Locator;

    constructor(page:any) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkout = page.locator("text=Checkout");

    }

    async VerifyProductIsDisplayed(productName:any) {

        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();

    }

    async Checkout() {
        await this.checkout.click();
    }

    getProductLocator(productName:any) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }

}
module.exports = { CartPage };