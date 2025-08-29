import {type Page, BrowserContext, test, expect} from "@playwright/test"

export class AirCrafts{
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

    async navigateToAircraft(){
        await this.page.locator('nav a[href*="Aircraft__c/home"]').click();
        await this.page.waitForURL('**\/list?filterName=__Recent', {waitUntil: 'load', timeout: 2000});
    }

    async findAircraftRecords(){
        await this.page.waitForLoadState('load',{ timeout: 2000});
        return await this.page.locator('table.slds-table').count();
    }
    async newAircraft(){
        await this.page.locator('nav a[href*="Aircraft__c/home"] ~ one-app-nav-bar-item-dropdown').click();
        await this.page.waitForSelector('div.menuItemsWrapper', {'state': 'visible', timeout: 5000});
        await this.page.locator('div.menuItemsWrapper a[href*="Aircraft__c&"]').click();
        await this.page.waitForLoadState('load');
    }
    async waitNewAircraftDialog(){
        await this.page.locator('records-lwc-detail-panel').isVisible();
        await this.page.waitForLoadState('load');
    }

    async addAircraftName(flightName: string){
        await this.page.locator('div[part="input-text"] input[name*="Name"]').fill(flightName);
    }

}
