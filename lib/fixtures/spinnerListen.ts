import { test as testsLogs } from "@playwright/test";

export const test = testsLogs.extend<{
    spinnerListen: void,
}>({
    spinnerListen: [async ({ page }, use, testInfo) => {
        const getDate = () => new Date().toISOString();      
        //console.log(`${getDate()}` + " " + testInfo.title + " : " + testInfo.status);

        const selector = '.slds-spinner_container div.slds-spinner span'
        const locatorDialog = page.locator(selector);
        await page.addLocatorHandler(locatorDialog, async () => {
            await console.log('Spinner appears!!!');
            await page.waitForSelector(selector, {state: 'hidden', timeout: 5000 }, );
            await page.waitForLoadState('load');
        }, { noWaitAfter: true, times: 2});

        await use();
    }, { auto: true }],
});
export { expect } from '@playwright/test';
