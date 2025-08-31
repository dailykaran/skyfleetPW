import {type Page, BrowserContext, test, expect} from "@playwright/test"
import {SkyFleet_Locators} from "../../utils/skyFleet_locators ";

export class AirCrafts extends SkyFleet_Locators {

    constructor(page: Page, context: BrowserContext){
        super(page, context);
    }

    async gotoURL(url: string){       
        await this.goto(url);
    }

    async navigateToAircraft(){
        await this.page.locator('nav a[href*="Aircraft__c/home"]').click();
        await this.page.waitForURL('**\/list?filterName=__Recent', {waitUntil: 'load', timeout: 5000});
    }

    async findAircraftRecords(){
        return await this.findRecords();
    }

    async newAircraft(){
        await this.page.locator('nav a[href*="Aircraft__c/home"] ~ one-app-nav-bar-item-dropdown').click();
        await this.page.waitForSelector('div.menuItemsWrapper', {'state': 'visible', timeout: 5000});
        await this.page.locator('div.menuItemsWrapper a[href*="Aircraft__c&"]').click();
        await this.page.waitForLoadState('load');
    }
    async waitNewAircraftDialog(){
        await this.waitNewDialog();
    }

    async addAircraftName(flightName: string){
        await this.addName(flightName); 
    }

    async saveAircraft(){
        await this.saveDialog();
    }

    async saveNewAircraft(){
        await this.saveNewDialog();
    }

    async assertToastMessageAircrafts(assertText: string){
        await this.assertToastMessage('div.forceToastMessage div.toastContent span.toastMessage', assertText);
    }

    async getAssertToastMessageTextAircrafts(){
        await this.getAssertToastMessage();
    }
    
    async getAircraftNameWarn(){
        return await this.getNameWarn()
    }

    async getAircraftNameErrorIcon(){
        return await this.getNameErrorIcon();
    }

    async getAircraftErrorIconFooter(){
        return await this.getErrorIcon()
    }

    async getAircraftErrorDialogTitle(){
        return await this.getErrorDialogTitle();
    }

    async getAircraftErrorDialogLinkButton(){ 
        return await this.getErrorDialogLinkButton();
    }
    async getFocusOnAircraftNameAndAddName(NewName: string){
        return await this.getFocusOnNameAndAddName(NewName);
    }

    async closeNewAircraftDialog(){
        return this.closeNewDialog();
    }

    async aircraftButtonToOpenDeleteDialog(){
        await this.buttonToOpenDeleteDialog();
    }

    async deleteAircraft(){
        await this.deleteRecord();
    }

    async assertAircraftNameTextBoxError(){
        await this.assertNameTextBoxError();
    }

}
