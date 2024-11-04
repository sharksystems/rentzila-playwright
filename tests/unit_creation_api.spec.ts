import { test } from '../fixtures';

test.describe('Unit creation API tests', async () => {

    test('Create Unit Using API', async ({ page, apiHelper, randomData, homePage, headerElements, loginPopup, loginData, myUnitsPage }) => {
        let unitName = "Unit " + randomData.generate10Symbols();
        let accessToken = await apiHelper.createAccessToken();
        let adminAccessToken = await apiHelper.createAdminAccessToken();
        let unitId = await apiHelper.createUnit(accessToken, unitName, 'valid_jpeg.jpeg');

        await headerElements.clickLoginBtn();
        await loginPopup.login(loginData.getValidPhoneNumber, loginData.getValidPassword);
        await headerElements.goToMyUnits();
        await myUnitsPage.getTabTitleByIndex(2).click();
        await myUnitsPage.assertUnitWithNameVisible(unitName);

        await apiHelper.setUnitActiveStatus(adminAccessToken, unitId);
        await page.reload({waitUntil: "networkidle"});
        await myUnitsPage.assertUnitWithNameVisible(unitName);
        await apiHelper.deleteUnit(adminAccessToken, unitId);
    });
});