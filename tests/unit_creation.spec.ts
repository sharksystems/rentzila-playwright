import { ErrorMessages } from '../data/ErrorMessages';
import { StaticData } from '../data/StaticData';
import { test } from '../fixtures';

test.describe('Unit creation tests', async () => {
    test.beforeEach(async ({ homePage, headerElements, loginPopup, loginData, myUnitsPage }) => {
        await headerElements.clickLoginBtn();
        await loginPopup.login(loginData.getValidPhoneNumber, loginData.getValidPassword);
        await headerElements.goToMyUnits();
        await myUnitsPage.clickCreateUnitBtn();
    });

    test('C294 - Verify body and title', async ({ unitCreationPage }) => {
        await unitCreationPage.assertUnitCreationFormTitle();
        await unitCreationPage.verifySelectedTabIsHighlighted(0);
        await unitCreationPage.verifyTabsText();
    });

    test('C296 - Verify Category Selection', async ({ unitCreationPage }) => {
        await unitCreationPage.assertCategorySelectionTitleText();
        await unitCreationPage.clickCategorySelection();
        await unitCreationPage.assertCategoryPopupVisible();
        await unitCreationPage.clickCategorySelectCloseBtn();
        await unitCreationPage.assertCategoryPopupNotVisible();

        await unitCreationPage.clickCategorySelection();
        await unitCreationPage.assertCategoryPopupVisible();
        await unitCreationPage.clickOutsidePopup();
        await unitCreationPage.assertCategoryPopupNotVisible();

        await unitCreationPage.clickNextBtn();
        await unitCreationPage.assertCategorySelectErrorWithMsg(ErrorMessages.fieldRequired);

        await unitCreationPage.clickCategorySelection();
        (await unitCreationPage.getFirstCategoryByNumber(0)).click();
        (await unitCreationPage.getSecondCategoryByNumber(1)).click();
        await unitCreationPage.selectThirdCateogryAndVerify(3);
    });

    test('C297 - Verify Unit (Listing) Title Input', async ({ randomData, unitCreationPage }) => {
        await unitCreationPage.assertListingTitleInputTitleText();
        await unitCreationPage.clickNextBtn();
        await unitCreationPage.assertListingTitleErrorWithMsg(ErrorMessages.fieldRequired);

        await unitCreationPage.enterListingTitle(randomData.generateLessThan10Symbols());
        await unitCreationPage.clickNextBtn();
        await unitCreationPage.assertListingTitleErrorWithMsg(ErrorMessages.listingTitleTooShort);
        await unitCreationPage.enterListingTitle(randomData.generate101Symbols());
        await unitCreationPage.clickNextBtn();
        await unitCreationPage.assertListingTitleErrorWithMsg(ErrorMessages.listingTitleTooLong);

        await unitCreationPage.enterListingTitle(StaticData.specialSymbols);
        await unitCreationPage.assertListingInputEmpty();
        await unitCreationPage.typeListingTitle(StaticData.specialSymbols);
        await unitCreationPage.assertListingInputEmpty();

        await unitCreationPage.enterListingTitle(randomData.generate10Symbols());
        await unitCreationPage.clickNextBtn();
        await unitCreationPage.assertListingTitleErrorNotVisible();
    });

    test('C298 - Verify Manufacturer Input', async ({ randomData, unitCreationPage }) => {
        await unitCreationPage.assertManufacturerInputElements();
        await unitCreationPage.clickNextBtn();
        await unitCreationPage.assertManufacturerErrorWithMsg(ErrorMessages.fieldRequired);

        await unitCreationPage.enterManufacturer("A");
        await unitCreationPage.assertManufacturerSearhDropdownVisible();

        await unitCreationPage.enterManufacturer(StaticData.validManufacturer);
        await unitCreationPage.assertManufacturerSearchResultItem(StaticData.validManufacturer);
        await unitCreationPage.enterManufacturer(StaticData.validManufacturerLowercase);
        await unitCreationPage.assertManufacturerSearchResultItem(StaticData.validManufacturer);

        await unitCreationPage.enterManufacturer(" ");
        await unitCreationPage.enterManufacturer(StaticData.specialSymbols);
        await unitCreationPage.assertManufacturerInputValue("");
        await unitCreationPage.enterManufacturer(randomData.getRandomName);
        await unitCreationPage.assertManufacturerNotFound(randomData.getRandomName);

        await unitCreationPage.enterManufacturer(randomData.generate101Symbols());
        await unitCreationPage.assertManufacturerInputCharLimitMaxed();

        await unitCreationPage.enterManufacturer(StaticData.validManufacturerLowercase);
        await unitCreationPage.clickManufacturerSearchItem();
        await unitCreationPage.assertSelectedManufacturer(StaticData.validManufacturer);
        await unitCreationPage.clickManufacturerClearBtn();
        await unitCreationPage.assertManufacturerInputValue("");
    });

    test('C299 - Verify Model Input', async ({ unitCreationPage }) => {
        await unitCreationPage.assertModelInputTitleText();
        await unitCreationPage.enterModelName("1234567890123456");
        await unitCreationPage.assertModelErrorWithMsg(ErrorMessages.modelNameTooLong);
        await unitCreationPage.enterModelName("1234567890 12345");
        await unitCreationPage.assertModelErrorWithMsg(ErrorMessages.modelNameTooLong);
        await unitCreationPage.enterModelName("123456789012345 ");
        await unitCreationPage.assertModelErrorWithMsg(ErrorMessages.modelNameTooLong);

        await unitCreationPage.enterModelName(StaticData.specialSymbols);
        await unitCreationPage.assertModelInputInputEmpty();

        await unitCreationPage.enterModelName("012345678901234");
        await unitCreationPage.assertModelNameErrorNotVisible();
    });

    test('C317 - Verify Technical Details Input', async ({ randomData, unitCreationPage }) => {
        await unitCreationPage.assertTechnicalDetailsInputTitle();
        await unitCreationPage.assertTechnicalDetailsInputInputEmpty();
        await unitCreationPage.enterTechnicalDetails(StaticData.specialSymbols);
        await unitCreationPage.assertTechnicalDetailsInputInputEmpty();

        await unitCreationPage.enterTechnicalDetails(randomData.generate9001Symbols());
        await unitCreationPage.verifyTextAreaCharCount();
    });

    test('C318 - Verify Description Input', async ({ randomData, unitCreationPage }) => {
        await unitCreationPage.assertDescriptionInputTitle();
        await unitCreationPage.assertDescriptionInputInputEmpty();
        await unitCreationPage.enterDescription(StaticData.specialSymbols);
        await unitCreationPage.assertDescriptionInputInputEmpty();

        await unitCreationPage.enterDescription(randomData.generate9001Symbols());
        await unitCreationPage.verifyTextAreaCharCount("description");
    });

    test('C319 - Verify Vehicle Location Selection', async ({ unitCreationPage }) => {
        await unitCreationPage.assertMapSelectionTitle();
        await unitCreationPage.assertMapSelectionPlaceholderVisible();

        await unitCreationPage.clickNextBtn();
        await unitCreationPage.assertMapSelectionErrorWithMsg(ErrorMessages.locationNotSelected);

        await unitCreationPage.openMap();
        await unitCreationPage.assertMapPopupVisible();
        await unitCreationPage.assertMapPopupTitle();

        await unitCreationPage.clickMapPopupCloseBtn();
        await unitCreationPage.assertMapPopupNotVisible();
        await unitCreationPage.assertMapSelectionPlaceholderVisible();

        await unitCreationPage.openMap();
        await unitCreationPage.clickOutsidePopup();
        await unitCreationPage.assertMapPopupNotVisible();
        await unitCreationPage.assertMapSelectionPlaceholderVisible();

        await unitCreationPage.openMap();
        await unitCreationPage.selectLocationAndVerify("default");
        await unitCreationPage.openMap();
        await unitCreationPage.selectLocationAndVerify();
    });

    test('C326 - Verify "Відмінити" button', async ({ unitCreationPage }) => {
        await unitCreationPage.assertCancelBtnText();
        await unitCreationPage.verifyCancelBtn();
    });

    test('C329 - Verify "Далі" button', async ({ randomData, unitCreationPage }) => {
        await unitCreationPage.assertNextBtnText();
        await unitCreationPage.clickNextBtn();
        await unitCreationPage.assertCategorySelectErrorWithMsg(ErrorMessages.fieldRequired);
        await unitCreationPage.assertListingTitleErrorWithMsg(ErrorMessages.fieldRequired);
        await unitCreationPage.assertManufacturerErrorWithMsg(ErrorMessages.fieldRequired);
        await unitCreationPage.assertMapSelectionErrorWithMsg(ErrorMessages.locationNotSelected);

        await unitCreationPage.clickCategorySelection();
        (await unitCreationPage.getFirstCategoryByNumber(0)).click();
        (await unitCreationPage.getSecondCategoryByNumber(1)).click();
        await unitCreationPage.selectThirdCateogryAndVerify(4);

        await unitCreationPage.enterListingTitle(randomData.generate10Symbols());
        await unitCreationPage.enterManufacturer(StaticData.validManufacturerLowercase);
        await unitCreationPage.clickManufacturerSearchItem();

        await unitCreationPage.openMap();
        await unitCreationPage.selectLocationAndVerify();

        await unitCreationPage.clickNextBtn();
        await unitCreationPage.assertUnitCreationFormTitle();
        await unitCreationPage.verifySelectedTabIsHighlighted(1);
    });

});