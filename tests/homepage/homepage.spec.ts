import {expect} from '@playwright/test'
import { test } from '../../lib/fixtures/pages.fixtures'


test.use({storageState: ".auth/sales_login_storage.json"})
test(`Verify the home page`, async ({loginPage})=>{

    const title = await loginPage.page.title();
    console.log(`Page title on home page ${title}`);

    //await loginPage.page.goto(`${process.env.HOME_URL}`);
    await loginPage.page.waitForLoadState('load');
    const url = await loginPage.page.url();
    console.log(`home URL: ${url}`);

})
