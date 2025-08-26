import {expect} from '@playwright/test'
import { test } from '../../lib/fixtures/pages.fixtures'
import { FakerData } from '../../utils/fakers'

test.use({storageState: ".auth/sales_login_storage.json"})
test(`Verify the SkyFleet home page`, async ({flights})=>{

    await flights.page.goto(`${process.env.SKYFLEET_HOME}`, {waitUntil: 'load'})
    
    await flights.navigateToFlights();
    await flights.page.waitForTimeout(2000);
    await flights.newFlight();
    console.log( await FakerData.getAirline());
    await console.log(FakerData.getAirplane());
    await console.log(FakerData.getFlightNumber());
    await console.log(FakerData.getDeparture_Arrival());
    await console.log(FakerData.getBirthDateTime());
    
    
    

})