import { test } from '../fixtures';
import { verifyServicesInTab } from '../helpers/tabHelpers';


test.describe('C212 - Checking "Послуги" section on the main page ', () => {

    test('Verify Services in Tab 1', async ({ headerElements, homePage, unitListingsPage, singleUnitPage }) => {
        await verifyServicesInTab(headerElements, homePage, unitListingsPage, singleUnitPage, 0)
    });
    test('Verify Services in Tab 2', async ({ headerElements, homePage, unitListingsPage, singleUnitPage }) => {
        await verifyServicesInTab(headerElements, homePage, unitListingsPage, singleUnitPage, 1)
    });
    test('Verify Services in Tab 3', async ({ headerElements, homePage, unitListingsPage, singleUnitPage }) => {
        await verifyServicesInTab(headerElements, homePage, unitListingsPage, singleUnitPage, 2)
    });
    test('Verify Services in Tab 4', async ({ headerElements, homePage, unitListingsPage, singleUnitPage }) => {
        await verifyServicesInTab(headerElements, homePage, unitListingsPage, singleUnitPage, 3)
    });
});