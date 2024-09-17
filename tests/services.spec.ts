import { test } from '../fixtures';
import { verifyServicesInTab } from '../helpers/tabHelpers';


test.describe('Checking "Послуги" section on the main page ', () => {

    test('Verify Services in Tab 1', async ({ page, homePage, unitListingsPage, singleUnitPage }) => {
        await verifyServicesInTab(page, homePage, unitListingsPage, singleUnitPage, 0)
    });
    test('Verify Services in Tab 2', async ({ page, homePage, unitListingsPage, singleUnitPage }) => {
        await verifyServicesInTab(page, homePage, unitListingsPage, singleUnitPage, 1)
    });
    test('Verify Services in Tab 3', async ({ page, homePage, unitListingsPage, singleUnitPage }) => {
        await verifyServicesInTab(page, homePage, unitListingsPage, singleUnitPage, 2)
    });
    test('Verify Services in Tab 4', async ({ page, homePage, unitListingsPage, singleUnitPage }) => {
        await verifyServicesInTab(page, homePage, unitListingsPage, singleUnitPage, 3)
    });
});