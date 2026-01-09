const { test, expect } = require('@playwright/test');
const { title } = require('node:process');

//test.only --> it will just run only one testcase remaining it will not execute.
test('Only Page Playwright test', async ({ page }) => {
    //chrome -plugins/ cookies
    // const context = await browser.newContext();
    // const page = (await context).newPage();
    await page.goto("https://google.com");
    // get title - assertion
    console.log(await page.title());
    //check if expected title is getting or not.
    await expect(page).toHaveTitle("Google");

})


test('@Web Browser Context Playwright test', async ({ browser }) => {
    //chrome -plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.google.com");

})

test('Page Playwright test', async ({ browser }) => {
    //chrome -plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    //page.route('**/*.{jpg,png,jpeg}', route => route.abort());
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("[type='Password']").fill("learning");
    await page.locator("#signInBtn").click();
    //wait until this locator shown up page.
    // webdriver wait we use in selenium.
    //console.log(await page.locator("[style*='block']").textContent());
    // now we are verfying the text which is present in error message as per our expection by using assertions.
    // await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    // type - fill
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    // Getting text of first item displayed on home page.
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    // to grab all the titles in one variable.
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

})

test('@Web UI Controls', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const Password = page.locator("[type='Password']")
    const signIn = page.locator('#signInBtn');
    const documentLink = page.locator("[href*='documents-request']");

    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator('#okayBtn').click(); //This is web base popup.this is not java based popup.
    // Now we have to verify that the 'User' checkbox is properly selected or not. Using assertions here:
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();

    //And now if you want to uncheck the checkbox. Playwright have 'uncheck()' method.
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");

    // await page.pause(); //Used to inspect the test case flow.
})

test('Child window handling', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');

    const documentLink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'), //listen for any new page pending, rejected, and fulfilled.
            documentLink.click(),
        ]
    ) // new page is opened.
    const text = await newPage.locator(".red").textContent();
    console.log(text);
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    await page.locator(userName).fill(domain);
    await page.pause();
    console.log(await page.locator(userName).inputValue());

})

test('test', async ({ page }) => {
    await page.goto('https://www.google.com/?zx=1766837776556&no_sw_cr=1');
    await page.getByRole('combobox', { name: 'Search' }).click();
    await page.getByRole('combobox', { name: 'Search' }).fill('automation Testing trending tools?');

})

