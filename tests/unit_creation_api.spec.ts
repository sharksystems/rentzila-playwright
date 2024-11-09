import { test } from '../fixtures';

test.describe('Unit creation API tests', async () => {
    let accessToken: string | null
    let adminAccessToken: string | null
    let unitId: number
    let unitName: string

    test.beforeAll(async ({ apiHelper }) => {
        accessToken = await apiHelper.createAccessToken();
        adminAccessToken = await apiHelper.createAdminAccessToken();
    });

    test.beforeEach(async ({ apiHelper, randomData, homePage, headerElements, loginPopup, loginData, }) => {
        unitName = "Unit " + randomData.generate10Symbols();
        unitId = await apiHelper.createUnit(accessToken, unitName, 'valid_jpeg.jpeg');
        await apiHelper.setUnitActiveStatus(adminAccessToken, unitId);

        await headerElements.clickLoginBtn();
        await loginPopup.login(loginData.getValidPhoneNumber, loginData.getValidPassword);
        await headerElements.goToMyUnits();
    });

    test.afterEach(async ({ apiHelper }) => {
        await apiHelper.deleteUnit(adminAccessToken, unitId);
    });

    test('Create Unit Using API', async ({ page, apiHelper, myUnitsPage }) => {
        await myUnitsPage.getTabTitleByIndex(2).click();
        await myUnitsPage.assertUnitWithNameVisible(unitName);

        await apiHelper.setUnitActiveStatus(adminAccessToken, unitId);
        await page.reload({waitUntil: "networkidle"});
        await myUnitsPage.assertUnitWithNameVisible(unitName);
    });
});