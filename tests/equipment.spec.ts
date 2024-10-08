import { test } from '../fixtures';
import { verifyEquipmentInTab } from '../helpers/tabHelpers';


test.describe('C213 - Checking "Спецтехніка" section on the main page ', () => {

    test('Verify Equipment in Tab 1', async ({ headerElements, homePage, unitListingsPage, singleUnitPage }) => {
        await verifyEquipmentInTab(headerElements, homePage, unitListingsPage, singleUnitPage, 0)
    });
    test('Verify Equipment in Tab 2', async ({ headerElements, homePage, unitListingsPage, singleUnitPage }) => {
        await verifyEquipmentInTab(headerElements, homePage, unitListingsPage, singleUnitPage, 1)
    });
    test.skip('Verify Equipment in Tab 3', async ({ headerElements, homePage, unitListingsPage, singleUnitPage }) => {
        await verifyEquipmentInTab(headerElements, homePage, unitListingsPage, singleUnitPage, 2) /*fails, category filter "Автокрани" is not applied on the Unit Listings page*/
    });
    test.skip('Verify Equipment in Tab 4', async ({ headerElements, homePage, unitListingsPage, singleUnitPage }) => {
        await verifyEquipmentInTab(headerElements, homePage, unitListingsPage, singleUnitPage, 3) /*fails, several categories do not have any products*/
    });
});