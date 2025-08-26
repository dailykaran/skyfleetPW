import {type Page, BrowserContext, test, expect} from "@playwright/test"

export class Flights{
    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext){
        this.page = page;
        this.context = context;
    }

    async gotoURL(url: string){       
        await this.page.goto(url);
        await this.page.waitForLoadState('load');
    }

    async navigateToFlights(){
        await this.page.locator('nav a[href*="Flight__c/home"]').click();
        await this.page.waitForURL('**\/list?filterName=__Recent');
    }

    async newFlight(){
        await this.page.locator('nav a[href*="Flight__c/home"] ~ one-app-nav-bar-item-dropdown').click();
        await this.page.waitForSelector('div.menuItemsWrapper', {'state': 'visible', timeout: 5000});
        await this.page.locator('div.menuItemsWrapper a[href*="Flight__c&"]').click();
        await this.page.waitForLoadState('load');
    }

}