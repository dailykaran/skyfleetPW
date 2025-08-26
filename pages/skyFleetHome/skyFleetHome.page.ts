import {type Page, BrowserContext, test, expect} from "@playwright/test"

export class SkyFleetHome {
    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext){
        this.page = page;
        this.context = context;
    }

    async clickAppLauncher() {
        await this.page.locator('div.tabBar a[href*="Home"]').first().focus({timeout: 2000});
        await this.page.locator('div.slds-icon-waffle').waitFor({state: 'attached'});
        await this.page.locator('div.slds-icon-waffle').click();
        await this.page.waitForLoadState('load');
    }

    async clickViewAll(){
        await this.page.waitForSelector("one-app-launcher-menu button", {state: 'attached', timeout: 1000});
        await this.page.locator("one-app-launcher-menu button").click();
    }

    async clickSearchApps(SearchApps: string){
        const searchAppsBox = 'one-app-launcher-search-bar input[type="search"]';
        test.step(`SearchApps textbox filled with application`, async()=>{
            await this.page.waitForSelector(searchAppsBox, {state: 'attached'});
            await expect(this.page.locator(searchAppsBox)).toBeEditable();
            await this.page.locator(searchAppsBox).fill(SearchApps);
            await this.page.keyboard.press('Enter');
        })
        await this.page.waitForLoadState('load');
    }

    async clickAppLink(name: string){
        await this.page.waitForTimeout(1000);
        await this.page.waitForSelector(`one-app-launcher-app-tile[data-name=${name}] a`, {timeout: 3000});
        await this.page.click(`one-app-launcher-app-tile[data-name=${name}] a`);
        const InnerText = await this.page.locator('h1.appName span').innerText();
        expect(InnerText).toContain(name);
        await this.page.waitForLoadState('load');
    }


}