import {expect} from '@playwright/test'
import { test } from '../../lib/fixtures/pages.fixtures'
import { FakerData } from '../../utils/fakers'

test.use({storageState: ".auth/sales_login_storage.json"})
test.describe('An aircraft page', ()=>{
    const getFlightName = FakerData.getFlightNumber();
    test.beforeEach('Navigate to the aircraft home page', async ({airCrafts})=>{
        await airCrafts.page.goto(`${process.env.SKYFLEET_HOME}`, {waitUntil: 'load'})
        await airCrafts.navigateToAircraft();
        await airCrafts.page.waitForTimeout(2000);
    })
    
    test(`Add a new aircraft under SkyFleet`, { tag: ['@positiveTest'] }, async ({airCrafts})=>{
        await airCrafts.newAircraft();
        await airCrafts.waitNewAircraftDialog();
        await airCrafts.addAircraftName(getFlightName);
        await airCrafts.saveAircraft();
        await airCrafts.assertToastMessageAircrafts(getFlightName.slice(0, 6))
    })

    test(`Verify the mandatory field in the New airCraft dialog`, async ({ airCrafts})=>{
        await airCrafts.newAircraft();
        await airCrafts.waitNewAircraftDialog();
        await airCrafts.saveAircraft();
        await expect((await airCrafts.getAircraftNameWarn()).split('\n')[1]).toContain('Complete this field');
        expect(await airCrafts.getAircraftNameErrorIcon()).toBeTruthy();
        await expect(airCrafts.getAircraftErrorIconFooter()).toBeTruthy();
        await airCrafts.getAircraftErrorDialogLinkButton();
        await airCrafts.getFocusOnAircraftNameAndAddName(getFlightName);
        await airCrafts.page.keyboard.press('Tab');
        await expect(await airCrafts.getAircraftNameWarn()).toBeFalsy();
        await airCrafts.closeNewAircraftDialog();
    })

    test(`Verify the SaveAndNew in the New airCraft dialog`, { tag: ['@negativeTest'] }, async ({airCrafts})=>{
        await airCrafts.newAircraft();
        await airCrafts.waitNewAircraftDialog();
        await airCrafts.addAircraftName(getFlightName);
        await airCrafts.saveNewAircraft();
        await airCrafts.waitNewAircraftDialog();
        await airCrafts.getAssertToastMessageTextAircrafts();
        await airCrafts.assertAircraftNameTextBoxError();
        await airCrafts.closeNewAircraftDialog();
    })

    test.afterEach('Delete an aircraft which added recently', async({airCrafts})=>{
        await airCrafts.navigateToAircraft();
        await airCrafts.page.waitForTimeout(1000);
        const getAircraftCount = await airCrafts.findAircraftRecords()
        if (getAircraftCount > 0){
            await airCrafts.aircraftButtonToOpenDeleteDialog();
            await airCrafts.deleteAircraft();
            await airCrafts.getAssertToastMessageTextAircrafts();
        }else{
            console.log('There is no aircraft records found');            
        }
    })

})

