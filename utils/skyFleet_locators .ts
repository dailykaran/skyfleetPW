import {Page, test, expect,BrowserContext, Locator} from '@playwright/test'


export abstract class SkyFleet_Locators {
    readonly page: Page
    readonly context: BrowserContext

    constructor (page: Page, context: BrowserContext){
        this.page = page;
        this.context = context;
    }

    async goto(url: string){       
        await this.page.goto(url, {waitUntil: 'load'});
        await this.page.waitForLoadState('load', {timeout: 4000});
    }

    async findRecords(){
        await this.page.waitForLoadState('load',{ timeout: 2000});
        return await this.page.locator('table.slds-table').count();
    }

    async waitNewDialog(){
        await this.page.locator('records-lwc-detail-panel').isVisible();
        await this.page.waitForLoadState('load');
    }

    async addName(Name: string){
        await this.page.locator('div[part="input-text"] input[name*="Name"]').fill(Name);
    }

    async saveDialog(){
        await this.page.locator('button[name*="SaveEdit"]').click();
    }

    async saveNewDialog(){
        await this.page.locator('button[name*="SaveAndNew"]').click();
    }

    async getNameWarn(){
        return await this.page.locator('div[data-name="Name"]').innerText();
    }

    async getNameErrorIcon(){
        return await this.page.locator('div[part="input-text"] [data-key="error"]').isVisible();
    }

    async getErrorIcon(){
        return await this.page.locator('.footer-button [data-key="error"]').isVisible()
    }

    async getErrorDialogTitle(){
        return await this.page.locator('.container records-record-edit-error-header h2').innerText();
    }

    async getErrorDialogLinkButton(){
        return await this.page.locator('records-record-edit-error ul.errorsList a').click();
    }
    async getFocusOnNameAndAddName(NewName: string){
        return await this.page.locator('div[part="input-text"] input[name*="Name"]').fill(NewName);
    }

    async closeNewDialog(){
        return this.page.locator('button[title*="Cancel and close"]').click();
    }

    async assertNameTextBoxError(){
        await this.page.locator('records-lwc-detail-panel').nth(1).waitFor({state: 'visible', timeout: 2000});
        await this.page.waitForTimeout(2000);
        //expect(await airCrafts.page.locator('records-lwc-detail-panel div[part="input-text"] [data-key="error"]').count()).toEqual(0);
        expect((await this.getNameWarn()).split('\n')[1]).not.toContain('Complete this field.');
    }

    async buttonToOpenDeleteDialog(){
        await this.page.waitForLoadState('load');
        await this.page.locator('tbody lightning-button-menu button').first().click();
        await this.page.locator('.branding-actions.actionMenu ul').waitFor({state: 'visible', timeout: 3000});
        await this.page.locator('.branding-actions.actionMenu ul a[title="Delete"]').click();
    }

    async deleteRecord(){
        await this.page.waitForLoadState('load');
        await this.page.locator('div.modal-header h1').waitFor({state: 'visible'});
        await this.page.locator('div.modal-footer button[title="Delete"]').click();
    }    

    async assertToastMessage(locator: string, assertText: string){
        await test.step(`Assert the toast message ${assertText}`, async()=>{
            await this.page.waitForLoadState('domcontentloaded');
            const toastMSG = this.page.locator(locator);
            await expect(toastMSG).toContainText(assertText);
            console.log(await toastMSG.innerText());
            await this.page.waitForSelector(locator, { state: "detached" });
        })
    }
    
    async getAssertToastMessage(){
        await this.page.waitForLoadState('domcontentloaded');
        const getToastMessage = await this.page.locator('div.forceToastMessage div.toastContent span.toastMessage').innerText();
        console.log(getToastMessage);
        //await expect(getToastMessage).toContain('was deleted. Undo');
    }
}

