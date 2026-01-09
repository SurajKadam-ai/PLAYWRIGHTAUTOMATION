const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            username: "surajkadam@gmail.com",
            password: "Practice@123",
            productName: "ZARA COAT 3"
        }
    }
)