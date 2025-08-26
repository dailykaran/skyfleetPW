import {Page, BrowserContext, test, expect} from "@playwright/test"

export class LogoutPage {
    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext){
        this.page = page;
        this.context = context;
    }

    async logout(homeURL: string){
        await this.page.goto(homeURL);
        
        await this.page.waitForLoadState('load');
        await expect(this.page).toHaveTitle(/.*Home | salesforce/);
        await this.page.locator('button.slds-global-actions__avatar').click();
        await this.page.locator('a.logout').click();
        await this.page.waitForLoadState('load');
        await expect(this.page).toHaveTitle(/.*Login | salesforce/);
    }
} 
