import {expect} from '@playwright/test'
import { test } from '../../lib/fixtures/pages.fixtures'
import { FakerData } from '../../utils/fakers'


test.describe('', ()=>{
    const getAirlineName = FakerData.getAirline();
    test.beforeEach('Navigate to the Flight home page', async ({flights})=>{
        await flights.page.goto(`${process.env.SKYFLEET_HOME}`, {waitUntil: 'load'})
        await flights.navigateToFlights();
        await flights.page.waitForTimeout(2000);
    })

    test.use({storageState: ".auth/sales_login_storage.json"})
    test(`Verify the SkyFleet home page`, async ({flights})=>{

        await flights.newFlight();
        await flights.waitNewFlightDialog();
        await flights.addFlightName(getAirlineName);
        await flights.addDepartureCity(FakerData.getDeparture_Arrival());
        await flights.addArrivalCity(FakerData.getDeparture_Arrival());
        await flights.addDepartureDate(FakerData.getDepartureDay());
        await flights.addArrivalDate(FakerData.getArrivalDay());
        await flights.selectStatus();
        await flights.saveFlight();
        await flights.assertToastMessageElements(getAirlineName.slice(0, 6))
    })

    test.afterEach('Delete a flight which added recently', async({flights})=>{
        await flights.navigateToFlights();
        await flights.page.waitForTimeout(1000);
        const getFlightsCount = await flights.findFlightRecords()
        if (getFlightsCount > 0){
            await flights.flightButtonToOpenDeleteFlightDialog();
            await flights.deleteFlight();
            await flights.assertToastMessageElements(getAirlineName.slice(0, 6));
        }else{
            console.log('There is no flight records found');
            
        }
        
    })


})