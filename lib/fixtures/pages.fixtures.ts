//import {test as baseTest} from '@playwright/test';
import { mergeTests  } from "@playwright/test";
import { LoginPage } from '../../pages/login/LoginPage'
import { LogoutPage } from '../../pages/logout/LogoutPage'
import {SkyFleetHome} from '../../pages/skyFleetHome/skyFleetHome.page'
import {Flights} from '../../pages/flights/flights.page'
import {AirCrafts} from '../../pages/aircrafts/aircrafts.page'
import { test as spinnerListen } from "./spinnerListen"

type myPages = {
    loginPage: LoginPage
    logoutPage: LogoutPage
    skyfleetHome : SkyFleetHome
    flights : Flights
    airCrafts : AirCrafts
}
const baseURL = process.env.BASE_URL;
const userEmail = process.env.USER_NAME;
const userPassword = process.env.PASS_WORD;
const homeURL = process.env.HOME_URL

export const test = mergeTests(spinnerListen).extend<
myPages
>({
    loginPage: async({page, context}, use) => {
        const loginPage = new LoginPage(page, context);
        await loginPage.gotoURL(`${baseURL}`)
        await loginPage.login(`${userEmail}`, `${userPassword}`)
        await use(loginPage)
    },
    logoutPage: async({page, context}, use) => {
        const logout = new LogoutPage(page, context);
        await logout.logout(`${homeURL}`)
        await use(logout);
    },
    skyfleetHome: async({page, context}, use) => {
        const skyfleetHome = new SkyFleetHome(page, context);
        await use(skyfleetHome);
    },
    flights: async({page, context}, use) => {
        const flights = new Flights(page, context);
        await use(flights);
    },
    airCrafts: async({page, context}, use) => {
        const airCrafts = new AirCrafts(page, context);
        await use(airCrafts);
    }
})

export {expect} from '@playwright/test';
