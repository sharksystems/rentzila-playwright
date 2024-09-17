import { Page } from '@playwright/test';
import HomePage from '../pages/HomePage';
import UnitListingsPage from '../pages/UnitListingsPage';
import SingleUnitPage from '../pages/SingleUnitPage';

export async function verifyServicesInTab(page: Page = this.page, homePage: HomePage, unitListingsPage: UnitListingsPage, singleUnitPage: SingleUnitPage, tabNumber: number) {

    for (let i = 0; i < 7; i++) {
        await (await homePage.getServicesTabByNumber(tabNumber)).click();
        await homePage.assertNumberOfServices();

        let serviceCategory: string = await (await homePage.getServiceByNumber(i)).innerText();
        await (await homePage.getServiceByNumber(i)).click();
        let visible: boolean = await unitListingsPage.verifyCheckboxVisible(serviceCategory);

        if (!visible) {
            console.warn(`Service "${serviceCategory}" checkbox not found. Retrying...`);

            await homePage.clickSiteLogo();
            await (await homePage.getServicesTabByNumber(tabNumber)).click();
            await (await homePage.getServiceByNumber(i)).click();
            await unitListingsPage.assertFilterSelectedWithName(serviceCategory);
            await unitListingsPage.verifyCheckboxChecked(serviceCategory);
            await unitListingsPage.clickProductListing();
            await singleUnitPage.assertServiceTagVisible(serviceCategory);
            await unitListingsPage.clickSiteLogo();
        }
        else {
            await unitListingsPage.assertFilterSelectedWithName(serviceCategory);
            await unitListingsPage.verifyCheckboxChecked(serviceCategory);
            await unitListingsPage.clickProductListing();
            await singleUnitPage.assertServiceTagVisible(serviceCategory);
            await unitListingsPage.clickSiteLogo();
        }
    }
}

export async function verifyEquipmentInTab(page: Page = this.page, homePage: HomePage, unitListingsPage: UnitListingsPage, singleUnitPage: SingleUnitPage, tabNumber: number) {

    for (let i = 0; i < 7; i++) {
        await (await homePage.getEquipmentTabByNumber(tabNumber)).click();
        await page.waitForTimeout(200);
        await homePage.assertNumberOfEquipment();
        let mainCategory: string = await (await homePage.getEquipmentTabByNumber(tabNumber)).innerText();

        let equipmentCategory: string = await (await homePage.getEquipmentItemByNumber(i)).innerText();
        await (await homePage.getEquipmentItemByNumber(i)).click();
        await unitListingsPage.assertFilterSelectedWithName(equipmentCategory);
        await unitListingsPage.verifyEquipmentCategoryisSelected(mainCategory, equipmentCategory);
        await unitListingsPage.clickProductListing();
        await singleUnitPage.assertEqupmentCategoryVisible(equipmentCategory);
        await unitListingsPage.clickSiteLogo();
    }
}
