const { test, expect } = require('@playwright/test');

test.describe.configure({ mode: 'serial' });
test("@Web Popup Validations", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    // await page.pause();
    // dialog handling:
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    //mouse hover
    await page.locator("#mousehover").hover();

    //iframe handling
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator('.text h2').textContent();
    console.log(textCheck);
    // await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.goForward();

})

test("Screenshots & Visual Comparision", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-tex").screenshot({ path: 'PartialScreenshot.png' });
    await page.locator("#hide-textbox").click();
    await page.screenshot({ path: 'screenshot.png' })

})

//screenshot - store -> screenshot ->
test('Visual', async ({ page }) => {
    page.goto("https://google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');

})