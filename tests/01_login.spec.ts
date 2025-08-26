import {test, expect} from '@playwright/test'

test('login scenario using page object model', async({page, context})=>{
    const baseURL = process.env.BASE_URL;
    const userEmail = process.env.USER_NAME;
    const userPassword = process.env.PASS_WORD;
    const authFile = ".auth/customer1.json"

    await page.goto(`${baseURL}`);
    await expect(page).toHaveURL(/.*salesforce/);
    await expect(page).toHaveTitle(/.*Login | salesforce/);    
    
    await page.getByLabel("UserName").fill(`${userEmail}`);
    const password1 = page.getByLabel('Password');
    await password1.fill(`${userPassword}`);
    
    //console.log(await this.page.locator('#Login').getAttribute('value'));
    await page.locator('#Login').click();
    await expect(page).toHaveURL(/.*SetupOneHome/);
    await page.waitForLoadState('load');
    await expect(page).toHaveTitle(/.*Home | salesforce/);
    await context.storageState({path: authFile});
})
