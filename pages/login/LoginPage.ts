import {type Page, BrowserContext, type Locator, test, expect} from "@playwright/test"

export class LoginPage {
    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext){
        this.page = page;
        this.context = context;
    }

    async gotoURL(url: string){       
        await this.page.goto(url, {waitUntil: 'load'});
        await this.page.waitForLoadState('load');
    }

    async login(UserName: string, password: string){
        const authFile = ".auth/sales_login_storage.json"

        await expect(this.page).toHaveURL(/.*salesforce/);
        await expect(this.page).toHaveTitle(/.*Login | salesforce/);    
    
        await this.page.getByLabel("UserName").fill(UserName);
        const password1 = this.page.getByLabel('Password');
        await password1.fill(password);
    
        //console.log(await this.page.locator('#Login').getAttribute('value'));
        await this.page.locator('#Login').click();
        await this.page.waitForURL(/.*SetupOneHome/, {waitUntil: 'load', timeout: 5000});
        await expect(this.page).toHaveURL(/.*SetupOneHome/);
        await this.page.waitForLoadState('load');
        await expect(this.page).toHaveTitle(/.*Home | salesforce/);
        await this.page.context().storageState({path: authFile});

        //await this.context.storageState({path: authFile});

    }
}
