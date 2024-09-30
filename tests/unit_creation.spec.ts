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

    test('Verify body and title', async ({ unitCreationPage }) => {
        await unitCreationPage.assertUnitCreationFormTitle();
        await unitCreationPage.verifySelectedTabIsHighlighted(0);
        await unitCreationPage.verifyTabsText();
    });
    test('Verify Category Selection', async ({ unitCreationPage }) => {
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
        await unitCreationPage.assertCategorySelectErrorWithMsg(ErrorMessages.FIELD_REQUIRED);

        await unitCreationPage.clickCategorySelection();
        (await unitCreationPage.getFirstCategoryByNumber(0)).click();
        (await unitCreationPage.getSecondCategoryByNumber(1)).click();
        await unitCreationPage.selectThirdCateogryAndVerify(3);
    });
    test('Verify Listing Title Input', async ({ randomData, unitCreationPage }) => {
        await unitCreationPage.assertListingTitleInputTitleText();
        await unitCreationPage.clickNextBtn();
        await unitCreationPage.assertListingTitleErrorWithMsg(ErrorMessages.FIELD_REQUIRED);

        await unitCreationPage.enterListingTitle(randomData.generateLessThan10Symbols());
        await unitCreationPage.clickNextBtn();
        await unitCreationPage.assertListingTitleErrorWithMsg(ErrorMessages.LISTING_TITLE_TOO_SHORT);
        await unitCreationPage.enterListingTitle(randomData.generate101Symbols());
        await unitCreationPage.clickNextBtn();
        await unitCreationPage.assertListingTitleErrorWithMsg(ErrorMessages.LISTING_TITLE_TOO_LONG);

        await unitCreationPage.enterListingTitle(StaticData.SPECIAL_SYMBOLS);
        await unitCreationPage.assertListingInputEmpty();
        await unitCreationPage.typeListingTitle(StaticData.SPECIAL_SYMBOLS);
        await unitCreationPage.assertListingInputEmpty();

        await unitCreationPage.enterListingTitle(randomData.generate10Symbols());
        await unitCreationPage.clickNextBtn();
        await unitCreationPage.assertListingTitleErrorNotVisible();
    });
    test('Verify Manufacturer Input', async ({ randomData, unitCreationPage }) => {
        await unitCreationPage.assertManufacturerInputElements();
        await unitCreationPage.clickNextBtn();
        await unitCreationPage.assertManufacturerErrorWithMsg(ErrorMessages.FIELD_REQUIRED);

        await unitCreationPage.enterManufacturer("A");
        await unitCreationPage.assertManufacturerSearhDropdownVisible();

        await unitCreationPage.enterManufacturer(StaticData.VALID_MANUFACTURER);
        await unitCreationPage.assertManufacturerSearchResultItem(StaticData.VALID_MANUFACTURER);
        await unitCreationPage.enterManufacturer(StaticData.VALID_MANUFACTURER_LOWERCASE);
        await unitCreationPage.assertManufacturerSearchResultItem(StaticData.VALID_MANUFACTURER);

        await unitCreationPage.enterManufacturer(" ");
        await unitCreationPage.enterManufacturer(StaticData.SPECIAL_SYMBOLS);
        await unitCreationPage.assertManufacturerInputValue("");
        await unitCreationPage.enterManufacturer(randomData.getRandomName);
        await unitCreationPage.assertManufacturerNotFound(randomData.getRandomName);

        await unitCreationPage.enterManufacturer(randomData.generate101Symbols());
        await unitCreationPage.assertManufacturerInputCharLimitMaxed();

        await unitCreationPage.enterManufacturer(StaticData.VALID_MANUFACTURER_LOWERCASE);
        await unitCreationPage.clickManufacturerSearchItem();
        await unitCreationPage.assertSelectedManufacturer(StaticData.VALID_MANUFACTURER);
        await unitCreationPage.clickManufacturerClearBtn();
        await unitCreationPage.assertManufacturerInputValue("");
    });
    test('Verify Model Input', async ({ unitCreationPage }) => {
        await unitCreationPage.assertModelInputTitleText();
        await unitCreationPage.enterModelName("1234567890123456");
        await unitCreationPage.assertModelErrorWithMsg(ErrorMessages.MODEL_NAME_TOO_LONG);
        await unitCreationPage.enterModelName("1234567890 12345");
        await unitCreationPage.assertModelErrorWithMsg(ErrorMessages.MODEL_NAME_TOO_LONG);
        await unitCreationPage.enterModelName("123456789012345 ");
        await unitCreationPage.assertModelErrorWithMsg(ErrorMessages.MODEL_NAME_TOO_LONG);

        await unitCreationPage.enterModelName(StaticData.SPECIAL_SYMBOLS);
        await unitCreationPage.assertModelInputInputEmpty();

        await unitCreationPage.enterModelName("012345678901234");
        await unitCreationPage.assertModelNameErrorNotVisible();
    });
    test('Verify Technical Details Input', async ({ randomData, unitCreationPage }) => {
        await unitCreationPage.assertTechnicalDetailsInputTitle();
        await unitCreationPage.assertTechnicalDetailsInputInputEmpty();
        await unitCreationPage.enterTechnicalDetails(StaticData.SPECIAL_SYMBOLS);
        await unitCreationPage.assertTechnicalDetailsInputInputEmpty();

        await unitCreationPage.enterTechnicalDetails(randomData.generate9001Symbols());
        await unitCreationPage.verifyTextAreaCharCount();
    });
    test('Verify Description Input', async ({ randomData, unitCreationPage }) => {
        await unitCreationPage.assertDescriptionInputTitle();
        await unitCreationPage.assertDescriptionInputInputEmpty();
        await unitCreationPage.enterDescription(StaticData.SPECIAL_SYMBOLS);
        await unitCreationPage.assertDescriptionInputInputEmpty();

        await unitCreationPage.enterDescription(randomData.generate9001Symbols());
        await unitCreationPage.verifyTextAreaCharCount("description");
    });
    test('Verify Vehicle Location Selection', async ({ unitCreationPage }) => {
        await unitCreationPage.assertMapSelectionTitle();
        await unitCreationPage.assertMapSelectionPlaceholderVisible();

        await unitCreationPage.clickNextBtn();
        await unitCreationPage.assertMapSelectionErrorWithMsg(ErrorMessages.LOCATION_NOT_SELECTED);

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
    test('Verify "Відмінити" button', async ({ unitCreationPage }) => {
        await unitCreationPage.assertCancelBtnText();
        await unitCreationPage.verifyCancelBtn();
    });
    test('Verify "Далі" button', async ({ randomData, unitCreationPage }) => {
        await unitCreationPage.assertNextBtnText();
        await unitCreationPage.clickNextBtn();
        await unitCreationPage.assertCategorySelectErrorWithMsg(ErrorMessages.FIELD_REQUIRED);
        await unitCreationPage.assertListingTitleErrorWithMsg(ErrorMessages.FIELD_REQUIRED);
        await unitCreationPage.assertManufacturerErrorWithMsg(ErrorMessages.FIELD_REQUIRED);
        await unitCreationPage.assertMapSelectionErrorWithMsg(ErrorMessages.LOCATION_NOT_SELECTED);

        await unitCreationPage.clickCategorySelection();
        (await unitCreationPage.getFirstCategoryByNumber(0)).click();
        (await unitCreationPage.getSecondCategoryByNumber(1)).click();
        await unitCreationPage.selectThirdCateogryAndVerify(4);

        await unitCreationPage.enterListingTitle(randomData.generate10Symbols());
        await unitCreationPage.enterManufacturer(StaticData.VALID_MANUFACTURER_LOWERCASE);
        await unitCreationPage.clickManufacturerSearchItem();

        await unitCreationPage.openMap();
        await unitCreationPage.selectLocationAndVerify();

        await unitCreationPage.clickNextBtn();
        await unitCreationPage.assertUnitCreationFormTitle();
        await unitCreationPage.verifySelectedTabIsHighlighted(1);
    });

});