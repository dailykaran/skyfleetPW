import {expect} from '@playwright/test'
import { test } from '../../lib/fixtures/pages.fixtures'
import { FakerData } from '../../utils/fakers'

test.use({storageState: ".auth/sales_login_storage.json"})
test.describe('An aircraft page', ()=>{
    const getFlightName = FakerData.getFlightNumber();
    test.beforeEach('Navigate to the aircraft home page', async ({flights, airCrafts})=>{
        await airCrafts.page.goto(`${process.env.SKYFLEET_HOME}`, {waitUntil: 'load'})
        await airCrafts.navigateToAircraft();
        await airCrafts.page.waitForTimeout(2000);
    })
    
    test(`Add a new aircraft under SkyFleet`, async ({flights, airCrafts})=>{
        await airCrafts.newAircraft();
        await airCrafts.waitNewAircraftDialog();
        await airCrafts.addAircraftName(getFlightName);
        await flights.saveFlight();
        await flights.assertToastMessageElements(getFlightName.slice(0, 6))
    })

    test(`Verify the mandatory field in the New airFlight dialog`, async ({flights, airCrafts})=>{
        await airCrafts.newAircraft();
        await airCrafts.waitNewAircraftDialog();
        await flights.saveFlight();
        await expect((await flights.getFlightNameWarn()).split('\n')[1]).toContain('Complete this field');
        expect(await flights.getFlightNameErrorIcon()).toBeTruthy();
        await expect(flights.getErrorIconFooter()).toBeTruthy();
        await flights.getErrorDialogLinkButton();
        await flights.getFocusOnFlightNameAndAddName(getFlightName);
        await flights.page.keyboard.press('Tab');
        await expect(await flights.getFlightNameWarn()).toBeFalsy();
        await flights.closeNewFlightDialog();
    })

    test.afterEach('Delete an aircraft which added recently', async({flights, airCrafts})=>{
        await airCrafts.navigateToAircraft();
        await airCrafts.page.waitForTimeout(1000);
        const getAircraftCount = await airCrafts.findAircraftRecords()
        if (getAircraftCount > 0){
            await flights.flightButtonToOpenDeleteFlightDialog();
            await flights.deleteFlight();
            //await flights.assertToastMessageElements(getAirlineName.slice(0, 6));
        }else{
            console.log('There is no aircraft records found');            
        }
    })

})

