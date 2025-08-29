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
        await this.page.waitForURL('**\/list?filterName=__Recent', {waitUntil: 'load', timeout: 2000});
    }

    async findFlightRecords(){
        await this.page.waitForLoadState('load',{ timeout: 2000});
        return await this.page.locator('table.slds-table').count();
    }
    async newFlight(){
        await this.page.locator('nav a[href*="Flight__c/home"] ~ one-app-nav-bar-item-dropdown').click();
        await this.page.waitForSelector('div.menuItemsWrapper', {'state': 'visible', timeout: 5000});
        await this.page.locator('div.menuItemsWrapper a[href*="Flight__c&"]').click();
        await this.page.waitForLoadState('load');
    }
    async waitNewFlightDialog(){
        await this.page.locator('records-lwc-detail-panel').isVisible();
        await this.page.waitForLoadState('load');
    }

    async addFlightName(flightName: string){
        await this.page.locator('div[part="input-text"] input[name*="Name"]').fill(flightName);
    }

    async addDepartureCity(departureName: string){
        await this.page.locator('div[part="input-text"] input[name*="Departure_City"]').fill(departureName);
    }

    async addArrivalCity(arrivalName: string){
        await this.page.locator('div[part="input-text"] input[name*="Arrival_City"]').fill(arrivalName);
    }

    async addDepartureDate(departureDate: string){
        await this.page.locator('div[part="input-text"] input[name*="Departure_Time"]').first().fill(departureDate);
    }

    async addArrivalDate(ArrivalDate: string){
        await this.page.locator('div[part="input-text"] input[name*="Arrival_Time"]').first().fill(ArrivalDate);
    }

    async selectStatus(){
        await this.page.locator('lightning-base-combobox button', {hasText: "--None--"}).click();
        await this.page.locator('lightning-base-combobox button', {hasText: "--None--"}).click({force: true});
        await this.page.locator('div[id*="dropdown-element"] [data-value="On-Time"]').waitFor({state: "visible"});
        await this.page.locator('lightning-base-combobox-item[data-value="On-Time"]').click({force: true});
    }

    async saveFlight(){
        await this.page.locator('button[name*=SaveEdit]').click();
    }

    async flightButtonToOpenDeleteFlightDialog(){
        await this.page.waitForLoadState('load');
        await this.page.locator('tbody lightning-button-menu button').first().click();
        await this.page.locator('.branding-actions.actionMenu ul').waitFor({state: 'visible'});
        await this.page.locator('.branding-actions.actionMenu ul a[title="Delete"]').click();
    }

    async deleteFlight(){
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

    async assertToastMessageElements(assertText: string){
        await this.assertToastMessage('div.forceToastMessage div.toastContent span.toastMessage', assertText);
    }

    async getFlightNameWarn(){
        return await this.page.locator('div[data-name="Name"]').innerText();
    }

    async getFlightNameErrorIcon(){
        return await this.page.locator('div[part="input-text"] [data-key="error"]').isVisible();
    }

    async getErrorIconFooter(){
        return await this.page.locator('.footer-button [data-key="error"]').isVisible()
    }

    async getErrorDialogTitle(){
        return await this.page.locator('.container records-record-edit-error-header h2').innerText();
    }

    async getErrorDialogLinkButton(){
        return await this.page.locator('records-record-edit-error ul.errorsList a').click();
    }
    async getFocusOnFlightNameAndAddName(NewName: string){
        return await this.page.locator('div[part="input-text"] input[name*="Name"]').fill(NewName);
    }

    async closeNewFlightDialog(){
        return this.page.locator('button[title*="Cancel and close"]').click();
    }


}