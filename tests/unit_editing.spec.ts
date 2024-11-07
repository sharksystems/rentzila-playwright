import { expect } from '@playwright/test';
import { ErrorMessages } from '../data/ErrorMessages';
import { StaticData } from '../data/StaticData';
import { test } from '../fixtures';

test.describe('Unit editing tests', async () => {
    let accessToken: string | null
    let adminAccessToken: string | null
    let unitId: number
    let unitName: string

    test.beforeAll(async ({ apiHelper }) => {
        accessToken = await apiHelper.createAccessToken();
        adminAccessToken = await apiHelper.createAdminAccessToken();
    });

    test.beforeEach(async ({ apiHelper, randomData, homePage, headerElements, loginPopup, loginData, myUnitsPage, unitCreationForm }) => {
        unitName = "Unit " + randomData.generate10Symbols();
        unitId = await apiHelper.createUnit(accessToken, unitName, 'valid_jpeg.jpeg');
        await apiHelper.setUnitActiveStatus(adminAccessToken, unitId);

        await headerElements.clickLoginBtn();
        await loginPopup.login(loginData.getValidPhoneNumber, loginData.getValidPassword);

        await headerElements.goToMyUnits();
        await myUnitsPage.clickEditBtnOnUnit(unitName);
        await unitCreationForm.assertUnitNameInputValue(unitName);
        await unitCreationForm.verifySelectedLocation('location', StaticData.defaultAddress);

    });

    test.afterEach(async ({ apiHelper }) => {
        await apiHelper.deleteUnit(adminAccessToken, unitId);
    });

    test('C182 - Edit Unit without changes', async ({ editUnitPage, myUnitsPage }) => {
        await editUnitPage.clickEditSubmitBtn();
        await editUnitPage.verifyEditSuccessMsgTitle();
        await editUnitPage.verifyEditSuccessMsg();

        await editUnitPage.clickGoToUnitsBtn();
        // await myUnitsPage.getTabTitleByIndex(2).click(); //unit is not set to "waiting" on automation
        await myUnitsPage.assertUnitWithNameVisible(unitName);
    });

    test('C272 - Check "Назва оголошення" input field', async ({ apiHelper, editUnitPage, myUnitsPage, unitCreationForm, randomData }) => {
        await unitCreationForm.enterUnitName("");
        await editUnitPage.clickEditSubmitBtn();
        await unitCreationForm.assertUnitNameErrorWithMsg(ErrorMessages.fieldRequired);

        await unitCreationForm.enterUnitName(StaticData.specialSymbols);
        await unitCreationForm.assertUnitNameInputValue("");

        await unitCreationForm.enterUnitName(randomData.generateLessThan10Symbols());
        await unitCreationForm.assertUnitNameErrorWithMsg(ErrorMessages.listingTitleTooShort);

        await unitCreationForm.enterUnitName(randomData.generate101Symbols());
        await unitCreationForm.assertUnitNameErrorWithMsg(ErrorMessages.listingTitleTooLong);

        const newUnitName: string = unitName + " test12345";
        await unitCreationForm.enterUnitName(newUnitName);
        await editUnitPage.clickEditSubmitBtn();
        await editUnitPage.clickGoToUnitsBtn();
        await myUnitsPage.getTabTitleByIndex(2).click();
        await myUnitsPage.assertUnitWithNameVisible(newUnitName);

        const updatedUnit = await apiHelper.getUnitDetails(accessToken, unitId);
        expect(updatedUnit.name).toBe(newUnitName);

    });

    test('C273 - Check "Виробник транспортного засобу" input field', async ({ apiHelper, editUnitPage, myUnitsPage, unitCreationForm, randomData }) => {
        await unitCreationForm.clickManufacturerClearBtn();
        await editUnitPage.clickEditSubmitBtn();
        await unitCreationForm.assertManufacturerErrorWithMsg(ErrorMessages.fieldRequired);
        await unitCreationForm.verifyManufacturerInputElements();

        await unitCreationForm.enterManufacturer(StaticData.specialSymbols);
        await unitCreationForm.assertManufacturerInputValue("");
        await unitCreationForm.assertManufacturerErrorWithMsg(ErrorMessages.fieldRequired);

        await unitCreationForm.enterManufacturer(randomData.getRandomEmail);
        await unitCreationForm.assertManufacturerNotFound(randomData.getRandomEmail);

        await unitCreationForm.enterManufacturer(StaticData.validManufacturer);
        await unitCreationForm.clickManufacturerSearchItem();
        await unitCreationForm.assertSelectedManufacturer(StaticData.validManufacturer);

        await editUnitPage.clickEditSubmitBtn();
        await editUnitPage.clickGoToUnitsBtn();
        await myUnitsPage.getTabTitleByIndex(2).click();
        await myUnitsPage.assertUnitWithNameVisible(unitName);

        const updatedUnit = await apiHelper.getUnitDetails(accessToken, unitId);
        expect(updatedUnit.manufacturer.name).toBe(StaticData.validManufacturer);
    });

    test('C532 - Check "Назва моделі" input field', async ({ apiHelper, editUnitPage, myUnitsPage, unitCreationForm }) => {
        await unitCreationForm.enterModelName(StaticData.specialSymbols);
        await unitCreationForm.assertModelInputValue("");

        await unitCreationForm.enterModelName("testmodelnametestmodelnam");
        await unitCreationForm.assertModelNameErrorWithMsg(ErrorMessages.modelNameTooLong);
        await unitCreationForm.enterModelName("CLAAS Lexion123");
        await unitCreationForm.assertModelNameErrorWithMsg(undefined, false);

        await editUnitPage.clickEditSubmitBtn();
        await editUnitPage.clickGoToUnitsBtn();
        await myUnitsPage.getTabTitleByIndex(2).click();
        await myUnitsPage.assertUnitWithNameVisible(unitName);

        const updatedUnit = await apiHelper.getUnitDetails(accessToken, unitId);
        expect(updatedUnit.model_name).toBe("CLAAS Lexion123");
    });

    test('C532 - Check "Технічні характеристики" input field', async ({ apiHelper, editUnitPage, myUnitsPage, unitCreationForm, randomData }) => {
        await editUnitPage.clickEditSubmitBtn();
        await editUnitPage.clickGoToUnitsBtn();
        await myUnitsPage.clickEditBtnOnUnit(unitName);

        await unitCreationForm.enterTechnicalDetails(StaticData.specialSymbols);
        await unitCreationForm.verifyTextAreaCharCount('details', 0);
        const newTechnicalDetails: string = randomData.getRandomName;
        await unitCreationForm.enterTechnicalDetails(newTechnicalDetails);

        await editUnitPage.clickEditSubmitBtn();
        await editUnitPage.clickGoToUnitsBtn();
        await myUnitsPage.getTabTitleByIndex(2).click();
        await myUnitsPage.assertUnitWithNameVisible(unitName);

        const updatedUnit = await apiHelper.getUnitDetails(accessToken, unitId);
        expect(updatedUnit.features).toBe(newTechnicalDetails);
    });

    test('C534 - Check "Опис" input field', async ({ apiHelper, editUnitPage, myUnitsPage, unitCreationForm, randomData }) => {
        await unitCreationForm.enterDescription("");
        await editUnitPage.clickEditSubmitBtn();
        await editUnitPage.clickGoToUnitsBtn();
        await myUnitsPage.getTabTitleByIndex(2).click();
        await myUnitsPage.clickEditBtnOnUnit(unitName);

        await unitCreationForm.verifyTextAreaCharCount('description', 0);
        await unitCreationForm.enterDescription(StaticData.specialSymbols);
        await unitCreationForm.verifyTextAreaCharCount('description', 0);

        const newDescription: string = randomData.getRandomName;
        await unitCreationForm.enterDescription(newDescription);

        await editUnitPage.clickEditSubmitBtn();
        await editUnitPage.clickGoToUnitsBtn();
        await myUnitsPage.getTabTitleByIndex(2).click();
        await myUnitsPage.assertUnitWithNameVisible(unitName);

        const updatedUnit = await apiHelper.getUnitDetails(accessToken, unitId);
        expect(updatedUnit.description).toBe(newDescription);
    });

    test('C535 - Check "Місце розташування технічного засобу" functionality', async ({ apiHelper, editUnitPage, myUnitsPage, unitCreationForm, randomData }) => {
        await unitCreationForm.assertMapSelectionTitle();
        await unitCreationForm.openMap();
        await unitCreationForm.assertMapPopupTitle();
        await unitCreationForm.zoomMap('out');
        await unitCreationForm.zoomMap('in');

        await unitCreationForm.selectLocationAndVerify();
        await unitCreationForm.assertMapPopupVisibility(false);
        await editUnitPage.clickEditSubmitBtn();
        await editUnitPage.clickGoToUnitsBtn();
        await myUnitsPage.getTabTitleByIndex(2).click();
        await myUnitsPage.assertUnitWithNameVisible(unitName);

        const updatedUnit = await apiHelper.getUnitDetails(accessToken, unitId);
        expect(updatedUnit.lat).not.toBe(StaticData.defaultAdressLat);
        expect(updatedUnit.lng).not.toBe(StaticData.defaultAdressLong);
    });
});