const base = require('@playwright/test');
import {test as basetest} from '@playwright/test';
interface testDataForOrder {
    username: string;
    password: string;
    productName: string;
}
export const customtest = basetest.extend<{testDataForOrder:testDataForOrder}>(
    {
        testDataForOrder: {
            username: "surajkadam@gmail.com",
            password: "Practice@123",
            productName: "ZARA COAT 3"
        }
    }
)