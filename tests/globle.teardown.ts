import {expect} from '@playwright/test'
import { test as teardown } from '../lib/fixtures/pages.fixtures'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


teardown(`Verify the logout `, async ({loginPage, logoutPage})=>{

    const title = await logoutPage.page.title();
    console.log(`Page title after logout ${title}`);

    const url = await logoutPage.page.url();
    console.log(`URL after logout: ${url}`);   
    expect(url).toContain('psvpec9-dev-ed.develop');

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const storagePath = path.resolve(__dirname, '../.auth/sales_login_storage.json');
    if (fs.existsSync(storagePath)) {
        fs.unlinkSync(storagePath); // Remove storage state after tests
    }

    
})
