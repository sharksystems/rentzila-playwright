import HomePage from '../pages/HomePage';
import UnitListingsPage from '../pages/UnitListingsPage';
import SingleUnitPage from '../pages/SingleUnitPage';
import HeaderElements from '../page_elements/headerElements';

export async function verifyServicesInTab(headerElements: HeaderElements, homePage: HomePage, unitListingsPage: UnitListingsPage, singleUnitPage: SingleUnitPage, tabNumber: number) {

    for (let i = 0; i < 7; i++) {
        await homePage.getServicesTabByIndex(tabNumber).click();
        await homePage.assertNumberOfServices();

        let serviceCategory: string = await homePage.getServiceByIndex(i).innerText();
        await homePage.getServiceByIndex(i).click();
        let visible: boolean = await unitListingsPage.verifyCheckboxVisible(serviceCategory);

        if (!visible) {
            console.warn(`Service "${serviceCategory}" checkbox not found. Retrying...`);

            await headerElements.clickSiteLogo();
            await homePage.getServicesTabByIndex(tabNumber).click();
            await homePage.getServiceByIndex(i).click();
            await unitListingsPage.assertFilterSelectedWithName(serviceCategory);
            await unitListingsPage.verifyCheckboxChecked(serviceCategory);
            await unitListingsPage.clickProductListing();
            await singleUnitPage.assertServiceTagVisible(serviceCategory);
            await headerElements.clickSiteLogo();
        }
        else {
            await unitListingsPage.assertFilterSelectedWithName(serviceCategory);
            await unitListingsPage.verifyCheckboxChecked(serviceCategory);
            await unitListingsPage.clickProductListing();
            await singleUnitPage.assertServiceTagVisible(serviceCategory);
            await headerElements.clickSiteLogo();
        }
    }
}

export async function verifyEquipmentInTab(headerElements: HeaderElements, homePage: HomePage, unitListingsPage: UnitListingsPage, singleUnitPage: SingleUnitPage, tabNumber: number) {

    for (let i = 0; i < 7; i++) {
        await homePage.getEquipmentTabByIndex(tabNumber).click();
        await homePage.assertNumberOfEquipment();
        let mainCategory: string = await homePage.getEquipmentTabByIndex(tabNumber).innerText();

        let equipmentCategory: string = await homePage.getEquipmentItemByIndex(i).innerText();
        await homePage.getEquipmentItemByIndex(i).click();
        await unitListingsPage.assertFilterSelectedWithName(equipmentCategory);
        await unitListingsPage.verifyEquipmentCategoryisSelected(mainCategory, equipmentCategory);
        await unitListingsPage.clickProductListing();
        await singleUnitPage.assertEqupmentCategoryVisible(equipmentCategory);
        await headerElements.clickSiteLogo();
    }
}
