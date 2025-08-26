import {expect} from '@playwright/test'
import { test as setup } from '../lib/fixtures/pages.fixtures'


setup(`Verify the login credentials`, async ({loginPage})=>{
    //const baseURL = process.env.BASE_URL;

    const title = await loginPage.page.title();
    console.log(`Page title after login ${title}`);

    const url = await loginPage.page.url();
    console.log(`URL after login: ${url}`);
    expect(url).toContain('home');

})


