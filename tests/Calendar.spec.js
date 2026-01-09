const { test, expect } = require('@playwright/test');

test('Calendar validations', async ({ page }) => {
    const MonthNumber = '6';
    const Date = '15';
    const Year = '2027';
    const expectedList = [MonthNumber, Date, Year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(Year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(MonthNumber) - 1).click();
    await page.locator("//abbr[text()='" + Date + "']").click();

    //Now using assertions to validate the date which we have selected with automation.
    const inputs = page.locator(".react-date-picker__inputGroup input");
    for (let i = 0; i < expectedList.length; i++) {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
    }

})

test.only('Select date from React calendar (forward & backward year handling)', async ({ page }) => {

    const TargetYear = '2002';
    const MonthNumber = 6; // June (1-based)
    const DateValue = '15';

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');

    // Open calendar
    await page.locator('.react-date-picker__inputGroup').click();

    // Go to decade (year-range) view
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();

    // Navigate decades until target year is visible
    while (true) {
        const years = await page
            .locator('.react-calendar__decade-view__years button')
            .allTextContents();

        if (years.includes(TargetYear)) break;

        const firstYear = Number(years[0]);
        const lastYear = Number(years[years.length - 1]);

        if (Number(TargetYear) > lastYear) {
            // Move forward
            await page.locator('.react-calendar__navigation__next-button').click();
        } else {
            // Move backward
            await page.locator('.react-calendar__navigation__prev-button').click();
        }
    }

    // Select year (STRICT MODE SAFE)
    await page
        .locator('.react-calendar__decade-view__years button')
        .filter({ hasText: TargetYear })
        .click();

    // Select month
    await page
        .locator('.react-calendar__year-view__months__month')
        .nth(MonthNumber - 1)
        .click();

    // Select date
    await page.locator("//abbr[text()='" + DateValue + "']").click();

});