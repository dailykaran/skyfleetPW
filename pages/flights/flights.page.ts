import {type Page, BrowserContext, test, expect} from "@playwright/test"
import {SkyFleet_Locators} from "../../utils/skyFleet_locators ";

export class Flights extends SkyFleet_Locators {

    constructor(page: Page, context: BrowserContext){
        super(page, context);
    }


    async gotoURL(url: string){       
        await this.page.goto(url);
        await this.page.waitForLoadState('load');
    }

    async navigateToFlights(){
        await this.page.locator('nav a[href*="Flight__c/home"]').click();
        await this.page.waitForURL('**\/list?filterName=__Recent', {waitUntil: 'load', timeout: 5000});
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
        await this.saveDialog();
    }

    async saveNewFlight(){
        await this.saveNewDialog();
    }
    async flightButtonToOpenDeleteDialog(){
        await this.buttonToOpenDeleteDialog();
    }

    async deleteFlight(){
        await this.deleteRecord();
    }

    async assertToastMessageFlights(assertText: string){
        await this.assertToastMessage('div.forceToastMessage div.toastContent span.toastMessage', assertText);
    }

    async getAssertToastMessageTextFlights(){
        await this.getAssertToastMessage();
    }

    async getAssertToastMessageFlights(){
        await this.getAssertToastMessage();
    }


    async getFlightNameWarn(){
        return await this.getNameWarn()
    }

    async getFlightNameErrorIcon(){
        return await this.getNameErrorIcon();
    }

    async getFlightErrorIconFooter(){
        return await this.getErrorIcon()
    }

    async getFlightErrorDialogTitle(){
        return await this.getErrorDialogTitle();
    }

    async getFlightErrorDialogLinkButton(){
        return await this.getErrorDialogLinkButton();
    }
    async getFocusOnFlightNameAndAddName(NewName: string){
        return await this.getFocusOnNameAndAddName(NewName);
    }

    async closeNewFlightDialog(){
        return this.closeNewDialog();
    }

    async assertFlightNameTextBoxError(){
        await this.assertNameTextBoxError();
    }

}