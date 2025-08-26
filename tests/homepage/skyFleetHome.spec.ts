import {expect} from '@playwright/test'
import { test } from '../../lib/fixtures/pages.fixtures'


test.use({storageState: ".auth/sales_login_storage.json"})
test(`Verify the SkyFleet home page`, async ({skyfleetHome})=>{

    await skyfleetHome.page.goto(`${process.env.HOME_URL}`);
    await skyfleetHome.page.waitForLoadState('load');
    await skyfleetHome.clickAppLauncher();
    await skyfleetHome.clickViewAll();
    await skyfleetHome.clickSearchApps('SkyFleet');
    await skyfleetHome.clickAppLink('SkyFleet');
    await skyfleetHome.page.waitForURL(skyfleetHome.page.url(), {waitUntil: 'domcontentloaded', timeout: 3000});
    await expect(skyfleetHome.page.url()).toContain('Account/list');
    await console.log(skyfleetHome.page.url());
    
})