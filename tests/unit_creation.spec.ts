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

    test('C296 - Verify Category Selection', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationForm.assertCategorySelectionTitleText();
        await unitCreationForm.clickCategorySelection();
        await unitCreationForm.assertCategoryPopupVisibility();
        await unitCreationForm.clickCategorySelectCloseBtn();
        await unitCreationForm.assertCategoryPopupVisibility(false);

        await unitCreationForm.clickCategorySelection();
        await unitCreationForm.assertCategoryPopupVisibility();
        await unitCreationForm.clickOutsidePopup();
        await unitCreationForm.assertCategoryPopupVisibility(false);

        await unitCreationPage.clickNextBtn();
        await unitCreationForm.assertCategorySelectErrorWithMsg(ErrorMessages.fieldRequired);

        await unitCreationForm.clickCategorySelection();
        await unitCreationForm.getFirstCategoryByIndex(0).click();
        await unitCreationForm.getSecondCategoryByIndex(1).click();
        await unitCreationForm.selectThirdCateogryAndVerify(3);
    });

    test('C297 - Verify Unit (Listing) Title Input', async ({ randomData, unitCreationPage, unitCreationForm }) => {
        await unitCreationForm.assertListingTitleInputTitleText();
        await unitCreationPage.clickNextBtn();
        await unitCreationForm.assertUnitNameErrorWithMsg(ErrorMessages.fieldRequired);

        await unitCreationForm.enterUnitName(randomData.generateLessThan10Symbols());
        await unitCreationPage.clickNextBtn();
        await unitCreationForm.assertUnitNameErrorWithMsg(ErrorMessages.listingTitleTooShort);
        await unitCreationForm.enterUnitName(randomData.generate101Symbols());
        await unitCreationPage.clickNextBtn();
        await unitCreationForm.assertUnitNameErrorWithMsg(ErrorMessages.listingTitleTooLong);

        await unitCreationForm.enterUnitName(StaticData.specialSymbols);
        await unitCreationForm.assertUnitNameInputValue("");
        await unitCreationForm.typeListingTitle(StaticData.specialSymbols);
        await unitCreationForm.assertUnitNameInputValue("");

        await unitCreationForm.enterUnitName(randomData.generate10Symbols());
        await unitCreationPage.clickNextBtn();
        await unitCreationForm.assertUnitNameErrorWithMsg(undefined, false);
    });

    test('C298 - Verify Manufacturer Input', async ({ randomData, unitCreationPage, unitCreationForm }) => {
        await unitCreationForm.verifyManufacturerInputElements();
        await unitCreationPage.clickNextBtn();
        await unitCreationForm.assertManufacturerErrorWithMsg(ErrorMessages.fieldRequired);

        await unitCreationForm.enterManufacturer("A");
        await unitCreationForm.assertManufacturerSearhDropdownVisible();

        await unitCreationForm.enterManufacturer(StaticData.validManufacturer);
        await unitCreationForm.assertManufacturerSearchResultItem(StaticData.validManufacturer);
        await unitCreationForm.enterManufacturer(StaticData.validManufacturerLowercase);
        await unitCreationForm.assertManufacturerSearchResultItem(StaticData.validManufacturer);

        await unitCreationForm.enterManufacturer(" ");
        await unitCreationForm.enterManufacturer(StaticData.specialSymbols);
        await unitCreationForm.assertManufacturerInputValue("");
        await unitCreationForm.enterManufacturer(randomData.getRandomName);
        await unitCreationForm.assertManufacturerNotFound(randomData.getRandomName);

        await unitCreationForm.enterManufacturer(randomData.generate101Symbols());
        await unitCreationForm.assertManufacturerInputCharLimit("100");

        await unitCreationForm.enterManufacturer(StaticData.validManufacturerLowercase);
        await unitCreationForm.clickManufacturerSearchItem();
        await unitCreationForm.assertSelectedManufacturer(StaticData.validManufacturer);
        await unitCreationForm.clickManufacturerClearBtn();
        await unitCreationForm.assertManufacturerInputValue("");
    });

    test('C299 - Verify Model Input', async ({ unitCreationForm }) => {
        await unitCreationForm.assertModelInputTitleText();
        await unitCreationForm.enterModelName("1234567890123456");
        await unitCreationForm.assertModelNameErrorWithMsg(ErrorMessages.modelNameTooLong);
        await unitCreationForm.enterModelName("1234567890 12345");
        await unitCreationForm.assertModelNameErrorWithMsg(ErrorMessages.modelNameTooLong);
        await unitCreationForm.enterModelName("123456789012345 ");
        await unitCreationForm.assertModelNameErrorWithMsg(ErrorMessages.modelNameTooLong);

        await unitCreationForm.enterModelName(StaticData.specialSymbols);
        await unitCreationForm.assertModelInputValue("");

        await unitCreationForm.enterModelName("012345678901234");
        await unitCreationForm.assertModelNameErrorWithMsg(undefined, false);
    });

    test('C317 - Verify Technical Details Input', async ({ randomData, unitCreationForm }) => {
        await unitCreationForm.assertTechnicalDetailsInputTitle();
        await unitCreationForm.assertTechnicalDetailsInputValue("");
        await unitCreationForm.enterTechnicalDetails(StaticData.specialSymbols);
        await unitCreationForm.assertTechnicalDetailsInputValue("");

        await unitCreationForm.enterTechnicalDetails(randomData.generate9001Symbols());
        await unitCreationForm.verifyTextAreaCharCount('details', 9000);
    });

    test('C318 - Verify Description Input', async ({ randomData, unitCreationForm }) => {
        await unitCreationForm.assertDescriptionInputTitle();
        await unitCreationForm.assertDescriptionInputValue("");
        await unitCreationForm.enterDescription(StaticData.specialSymbols);
        await unitCreationForm.assertDescriptionInputValue("");

        await unitCreationForm.enterDescription(randomData.generate9001Symbols());
        await unitCreationForm.verifyTextAreaCharCount('description', 9000);
    });

    test('C319 - Verify Vehicle Location Selection', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationForm.assertMapSelectionTitle();
        await unitCreationForm.verifySelectedLocation('placeholder');

        await unitCreationPage.clickNextBtn();
        await unitCreationForm.assertMapSelectionErrorWithMsg(ErrorMessages.locationNotSelected);

        await unitCreationForm.openMap();
        await unitCreationForm.assertMapPopupVisibility();
        await unitCreationForm.assertMapPopupTitle();

        await unitCreationForm.clickMapPopupCloseBtn();
        await unitCreationForm.assertMapPopupVisibility(false);
        await unitCreationForm.verifySelectedLocation('placeholder');

        await unitCreationForm.openMap();
        await unitCreationForm.clickOutsidePopup();
        await unitCreationForm.assertMapPopupVisibility(false);
        await unitCreationForm.verifySelectedLocation('placeholder');

        await unitCreationForm.openMap();
        await unitCreationForm.selectLocationAndVerify('default');
        await unitCreationForm.openMap();
        await unitCreationForm.selectLocationAndVerify();
    });

    test('C326 - Verify "Відмінити" button (1. General Info Tab)', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.verifyCancelBtn();
    });

    test('C329 - Verify "Далі" button (1. General Info Tab)', async ({ randomData, unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.clickNextBtn();
        await unitCreationForm.assertCategorySelectErrorWithMsg(ErrorMessages.fieldRequired);
        await unitCreationForm.assertUnitNameErrorWithMsg(ErrorMessages.fieldRequired);
        await unitCreationForm.assertManufacturerErrorWithMsg(ErrorMessages.fieldRequired);
        await unitCreationForm.assertMapSelectionErrorWithMsg(ErrorMessages.locationNotSelected);

        await unitCreationForm.clickCategorySelection();
        await unitCreationForm.getFirstCategoryByIndex(0).click();
        await unitCreationForm.getSecondCategoryByIndex(1).click();
        await unitCreationForm.selectThirdCateogryAndVerify(4);

        await unitCreationForm.enterUnitName(randomData.generate10Symbols());
        await unitCreationForm.enterManufacturer(StaticData.validManufacturerLowercase);
        await unitCreationForm.clickManufacturerSearchItem();

        await unitCreationForm.openMap();
        await unitCreationForm.selectLocationAndVerify();

        await unitCreationPage.clickNextBtn();
        await unitCreationPage.assertUnitCreationFormTitle();
        await unitCreationPage.verifySelectedTabIsHighlighted(1);
    });

    test('C384 - Verify uploading the same image', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(1).click();
        await unitCreationForm.uploadImagesToBlock(0, ["valid_jpeg.jpeg"]);
        await unitCreationForm.getImageBlockSource(0);
        await unitCreationForm.verifyMainImageLabelVisible();
        await unitCreationForm.uploadImagesToBlock(1, ["valid_jpeg.jpeg"]);
        await unitCreationForm.assertErrorPopupVisibility();
        await unitCreationForm.assertErrorPopupTitle(ErrorMessages.imageInvalid);
        await unitCreationForm.assertErrorPopupContent(ErrorMessages.fileDuplicate);
        await unitCreationForm.clickErrorPopupOkBtn();
        await unitCreationForm.assertErrorPopupVisibility(false);
        await unitCreationForm.verifyImageInBlock(1, '');

        await unitCreationForm.uploadImagesToBlock(1, ["valid_jpeg.jpeg"]);
        await unitCreationForm.assertErrorPopupVisibility();
        await unitCreationForm.clickErrorPopupCloseBtn();
        await unitCreationForm.assertErrorPopupVisibility(false);
        await unitCreationForm.verifyImageInBlock(1, '');

        await unitCreationForm.uploadImagesToBlock(1, ["valid_jpeg.jpeg"]);
        await unitCreationForm.assertErrorPopupVisibility();
        await unitCreationForm.clickOutsidePopup();
        await unitCreationForm.assertErrorPopupVisibility(false);
        await unitCreationForm.verifyImageInBlock(1, '');
    });

    test('C401 - Verify uploading invalid file type', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(1).click();
        await unitCreationForm.uploadImagesToBlock(0, ["webp_image.webp"]);
        await unitCreationForm.assertErrorPopupVisibility();
        await unitCreationForm.assertErrorPopupTitle(ErrorMessages.imageInvalid);
        await unitCreationForm.assertErrorPopupContent(ErrorMessages.imageFormatInvalid);
        await unitCreationForm.clickErrorPopupOkBtn();
        await unitCreationForm.assertErrorPopupVisibility(false);
        await unitCreationForm.verifyImageInBlock(0, '');

        await unitCreationForm.uploadImagesToBlock(0, ["webp_image.webp"]);
        await unitCreationForm.assertErrorPopupVisibility();
        await unitCreationForm.clickErrorPopupCloseBtn();
        await unitCreationForm.assertErrorPopupVisibility(false);
        await unitCreationForm.verifyImageInBlock(0, '');

        await unitCreationForm.uploadImagesToBlock(0, ["webp_image.webp"]);
        await unitCreationForm.assertErrorPopupVisibility();
        await unitCreationForm.clickOutsidePopup();
        await unitCreationForm.assertErrorPopupVisibility(false);
        await unitCreationForm.verifyImageInBlock(0, '');
    });

    test('C405 - Verify uploading image of size more than 20MB', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(1).click();
        await unitCreationForm.uploadImagesToBlock(0, ["image_over_20mb.png"]);
        await unitCreationForm.assertErrorPopupVisibility();
        await unitCreationForm.assertErrorPopupTitle(ErrorMessages.imageInvalid);
        await unitCreationForm.assertErrorPopupContent(ErrorMessages.imageFormatInvalid);
        await unitCreationForm.clickErrorPopupOkBtn();
        await unitCreationForm.assertErrorPopupVisibility(false);
        await unitCreationForm.verifyImageInBlock(0, '');

        await unitCreationForm.uploadImagesToBlock(0, ["image_over_20mb.png"]);
        await unitCreationForm.assertErrorPopupVisibility();
        await unitCreationForm.clickErrorPopupCloseBtn();
        await unitCreationForm.assertErrorPopupVisibility(false);
        await unitCreationForm.verifyImageInBlock(0, '');

        await unitCreationForm.uploadImagesToBlock(0, ["image_over_20mb.png"]);
        await unitCreationForm.assertErrorPopupVisibility();
        await unitCreationForm.clickOutsidePopup();
        await unitCreationForm.assertErrorPopupVisibility(false);
        await unitCreationForm.verifyImageInBlock(0, '');
    });

    test('C390 - Verify "Назад" button (2. Photo Tab)', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(1).click();
        await unitCreationPage.clickPrevBtn();

        await unitCreationPage.verifySelectedTabIsHighlighted(0);
        await unitCreationForm.assertCategorySelectionTitleText();
        await unitCreationForm.assertListingTitleInputTitleText();
        await unitCreationForm.verifyManufacturerInputElements();
        await unitCreationForm.assertModelInputTitleText();
        await unitCreationForm.assertDescriptionInputTitle();
        await unitCreationForm.assertMapSelectionTitle();
    });

    test('C393 - Verify "Далі" button (2. Photo Tab)', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(1).click();
        await unitCreationForm.assertImageUploadTitle();
        await unitCreationForm.assertImageUploadClueText();
        await unitCreationPage.clickNextBtn();
        await unitCreationForm.assertImageUploadClueErrorState();

        await unitCreationForm.uploadImagesToBlock(0, ["valid_jpeg.jpeg"]);
        await unitCreationForm.getImageBlockSource(0);
        await unitCreationPage.clickNextBtn();
        await unitCreationPage.verifySelectedTabIsHighlighted(2);
    });

    test('C593 - Verify image upload', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(1).click();
        await unitCreationForm.assertImageUploadTitle();
        await unitCreationForm.assertImageUploadClueText();

        await unitCreationForm.uploadImagesToBlock(0, ["valid_jpeg.jpeg"]);
        await unitCreationForm.getImageBlockSource(0);
        await unitCreationForm.verifyMainImageLabelVisible();

        await unitCreationForm.uploadImagesToBlock(1, ["valid_jpeg2.jpeg", "valid_jpeg3.jpeg", "valid_jpg.jpg", "valid_jpg2.jpg", "valid_jpg3.jpg", "valid_jpg4.jpg", "valid_png.png", "valid_png2.png", "valid_png3.png", "valid_png4.png", "valid_png5.png"]);
        await unitCreationForm.assertTotalNumberOfImageBlocks(12);
        for (let i = 0; i < 12; i++) {
            await unitCreationForm.getImageBlockSource(i);
        }
    });

    test('C594 - Verify image drag & drop', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(1).click();
        await unitCreationForm.uploadImagesToBlock(0, ["valid_jpeg.jpeg", "valid_jpeg2.jpeg"]);
        let firstBlockImage = await unitCreationForm.getImageBlockSource(0);
        let secondBlockImage = await unitCreationForm.getImageBlockSource(1);

        await unitCreationForm.dragAndDropImage(1, 0);
        await unitCreationForm.verifyImageInBlock(0, secondBlockImage);
        await unitCreationForm.verifyImageInBlock(1, firstBlockImage);
    });

    test('C595 - Verify image deleting', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(1).click();
        await unitCreationForm.uploadImagesToBlock(0, ["valid_jpeg.jpeg"]);
        await unitCreationForm.getImageBlockSource(0);
        await unitCreationForm.deleteImageFromBlock(0);
        await unitCreationForm.verifyImageInBlock(0, '');
    });

    test('C410 - Verify creating new service', async ({ unitCreationPage, unitCreationForm, randomData, apiHelper }) => {
        await unitCreationPage.getTabTitleByIndex(2).click();
        await unitCreationForm.enterService(randomData.getRandomName);
        await unitCreationForm.verifyServiceNotFoundMsg(randomData.getRandomName);
        await unitCreationForm.verifyCreateNewServiceBtnContent();
        await unitCreationForm.clickCreateNewServiceBtn();
        await unitCreationForm.assertSelectedServiceVisibility(randomData.getRandomName);

        let accessToken = await apiHelper.createAdminAccessToken();
        let userCategory = await apiHelper.getUserGeneratedCategory(accessToken, randomData.getRandomName);
        await apiHelper.deleteUserSubmittedCategory(accessToken, userCategory.id);
    });

    test('C411 - Verify choosing multiple services', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(2).click();
        await unitCreationForm.enterService("Г");
        await unitCreationForm.verifyServiceSearchResultsContainTerm("Г");

        const firstResult = await unitCreationForm.getServiceSearchResultByIndex(0).innerText();
        const secondResult = await unitCreationForm.getServiceSearchResultByIndex(1).innerText();

        await unitCreationForm.getServiceSearchResultByIndex(0).click();
        await unitCreationForm.getServiceSearchResultByIndex(1).click();

        await unitCreationForm.assertSelectedServiceVisibility(firstResult);
        await unitCreationForm.assertSelectedServiceVisibility(secondResult);
    });

    test('C412 - Verify removing chosen services', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(2).click();
        await unitCreationForm.enterService(StaticData.serviceDigging);
        await unitCreationForm.selectServiceContainingText(StaticData.serviceDigging);
        await unitCreationForm.enterService(StaticData.serviceBoring);
        await unitCreationForm.selectServiceContainingText(StaticData.serviceBoring);

        await unitCreationForm.assertSelectedServiceVisibility(StaticData.serviceDigging);
        await unitCreationForm.assertSelectedServiceVisibility(StaticData.serviceBoring);
        await unitCreationForm.assertSelectedServicesTitleVisibility();

        await unitCreationForm.removeSelectedService(StaticData.serviceDigging);
        await unitCreationForm.removeSelectedService(StaticData.serviceBoring);
        await unitCreationForm.assertSelectedServiceVisibility(StaticData.serviceDigging, false);
        await unitCreationForm.assertSelectedServiceVisibility(StaticData.serviceBoring, false);
        await unitCreationForm.assertSelectedServicesTitleVisibility(false);
    });

    test('C413 - Verify "Назад" button (3. Services Tab)', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(1).click();
        await unitCreationForm.uploadImagesToBlock(0, ["valid_jpeg.jpeg"]);
        const imageSource = await unitCreationForm.getImageBlockSource(0);
        await unitCreationPage.clickNextBtn();
        await unitCreationPage.verifySelectedTabIsHighlighted(2);

        await unitCreationPage.clickPrevBtn();
        await unitCreationPage.verifySelectedTabIsHighlighted(1);
        await unitCreationForm.verifyImageInBlock(0, imageSource);
        await unitCreationForm.verifyMainImageLabelVisible();
    });

    test('C414 - Verify "Далі" button (3. Services Tab)', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(2).click();
        await unitCreationPage.clickNextBtn();
        await unitCreationForm.assertServiceSelectionClueErrorState();
        await unitCreationForm.assertServiceSearchInputErrorState();

        await unitCreationForm.enterService(StaticData.serviceDigging);
        await unitCreationForm.selectServiceContainingText(StaticData.serviceDigging);
        await unitCreationForm.assertSelectedServiceVisibility(StaticData.serviceDigging);
        await unitCreationForm.assertServiceSearchInputErrorState(false);

        await unitCreationPage.clickNextBtn();
        await unitCreationPage.verifySelectedTabIsHighlighted(3);
    });

    test('C632 - Verify entering special characters in the "Послуги" field', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(2).click();
        await unitCreationForm.enterService(StaticData.specialSymbols);
        await unitCreationForm.verifyServiceInputValue("");
        await unitCreationForm.enterService(StaticData.specialSymbols, 'paste');
        await unitCreationForm.verifyServiceInputValue("");

        await unitCreationForm.enterService(StaticData.serviceBoring + StaticData.specialSymbols);
        await unitCreationForm.verifyServiceInputValue(StaticData.serviceBoring);

        await unitCreationForm.enterService(StaticData.serviceBoring + StaticData.specialSymbols, 'paste');
        await unitCreationForm.verifyServiceInputValue(StaticData.serviceBoring);
    });

    test('C633 - Verify character limit for the "Послуги" field', async ({ unitCreationPage, unitCreationForm, randomData }) => {
        await unitCreationPage.getTabTitleByIndex(2).click();
        await unitCreationForm.enterService("G");
        await unitCreationForm.verifyServiceSearchResultsContainTerm("G");

        await unitCreationForm.enterService("");
        await unitCreationForm.verifyServiceInputValue("");

        const moreThan100Symbols = randomData.generate101Symbols();
        await unitCreationForm.enterService(moreThan100Symbols);
        await unitCreationForm.verifyServiceInputValueLength(100);
        await unitCreationForm.verifyNewServiceCharCount("100");
    });

    test('C634 - Verify service search in uppercase and lowercase ', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(2).click();

        await unitCreationForm.enterService(StaticData.serviceBoring, 'lowercase');
        await unitCreationForm.verifyServiceSearchResultsContainTerm(StaticData.serviceBoring);

        await unitCreationForm.enterService(StaticData.serviceBoring, 'uppercase');
        await unitCreationForm.verifyServiceSearchResultsContainTerm(StaticData.serviceBoring);
    });

    test('C592 - Verify UI of the "Послуги" field', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(2).click();
        await unitCreationForm.verifyServiceInputTitle();
        await unitCreationForm.assertServiceSelectionClueText();
        await unitCreationForm.verifyServiceSearchInputElements();

        await unitCreationForm.enterService(StaticData.serviceBoring);
        await unitCreationForm.assertStatusIconInServiceSearchResult(StaticData.serviceBoring, 'not selected');
        await unitCreationForm.selectServiceContainingText(StaticData.serviceBoring);
        await unitCreationForm.assertStatusIconInServiceSearchResult(StaticData.serviceBoring, 'selected');

        await unitCreationForm.assertSelectedServiceVisibility(StaticData.serviceBoring);
        await unitCreationForm.assertSelectedServicesTitleVisibility();

        await unitCreationForm.removeSelectedService(StaticData.serviceBoring);
        await unitCreationForm.assertSelectedServiceVisibility(StaticData.serviceBoring, false);
        await unitCreationForm.assertSelectedServicesTitleVisibility(false);
    });

    test('C417 - Verify "Спосіб оплати" section', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(3).click();
        await unitCreationForm.verifyPaymentMethodTitle();
        await unitCreationForm.verifyPaymentMethodOptions();
    });

    test('C418 - Verify "Вартість мінімального замовлення" section', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(2).click();
        await unitCreationForm.enterService(StaticData.serviceDigging);
        await unitCreationForm.selectServiceContainingText(StaticData.serviceDigging);
        await unitCreationForm.assertSelectedServiceVisibility(StaticData.serviceDigging);
        await unitCreationPage.clickNextBtn();

        await unitCreationForm.verifyMinimumPriceInputTitle();
        await unitCreationForm.verifyMinimumPriceInputPlaceholder();

        await unitCreationForm.enterMinimumPrice(StaticData.price10Digits);
        await unitCreationForm.verifyMinimumPriceInputValue(StaticData.validPrice);

        await unitCreationForm.enterMinimumPrice(StaticData.priceWithSpace);
        await unitCreationForm.verifyMinimumPriceInputValue(StaticData.validPrice2);

        await unitCreationForm.enterMinimumPrice(StaticData.priceWithLeadingSpace);
        await unitCreationForm.verifyMinimumPriceInputValue(StaticData.validPrice2);

        await unitCreationForm.enterMinimumPrice("");
        await unitCreationForm.enterMinimumPrice(" ");
        await unitCreationForm.verifyMinimumPriceInputValue("");
        await unitCreationForm.enterMinimumPrice("abc");
        await unitCreationForm.verifyMinimumPriceInputValue("");
        await unitCreationForm.enterMinimumPrice(StaticData.specialSymbols2);
        await unitCreationForm.verifyMinimumPriceInputValue("");

        await unitCreationForm.enterMinimumPrice(StaticData.validPrice);
        await unitCreationForm.verifyMinimumPriceInputValue(StaticData.validPrice);
    });

    test('C482 - Verify adding price for service', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(2).click();
        await unitCreationForm.enterService(StaticData.serviceDigging);
        await unitCreationForm.selectServiceContainingText(StaticData.serviceDigging);
        await unitCreationForm.assertSelectedServiceVisibility(StaticData.serviceDigging);
        await unitCreationPage.clickNextBtn();

        await unitCreationForm.addPriceForService(StaticData.serviceDigging);
        await unitCreationForm.verifyCurrencyFieldOnService(StaticData.serviceDigging);
        await unitCreationForm.verifyCurrencyFieldOnService(StaticData.serviceDigging);
        await unitCreationForm.verifyRatesForService(StaticData.serviceDigging);

        await unitCreationForm.enterPriceForService(StaticData.serviceDigging, StaticData.price10Digits);
        await unitCreationForm.verifyPriceInputValueOnService(StaticData.serviceDigging, StaticData.validPrice);

        await unitCreationForm.enterPriceForService(StaticData.serviceDigging, StaticData.priceWithSpace);
        await unitCreationForm.verifyPriceInputValueOnService(StaticData.serviceDigging, StaticData.validPrice2);

        await unitCreationForm.enterPriceForService(StaticData.serviceDigging, StaticData.priceWithLeadingSpace);
        await unitCreationForm.verifyPriceInputValueOnService(StaticData.serviceDigging, StaticData.validPrice2);

        await unitCreationForm.enterPriceForService(StaticData.serviceDigging, "");
        await unitCreationForm.enterPriceForService(StaticData.serviceDigging, " ");
        await unitCreationForm.verifyPriceInputValueOnService(StaticData.serviceDigging, "");
        await unitCreationForm.enterPriceForService(StaticData.serviceDigging, "abc");
        await unitCreationForm.verifyPriceInputValueOnService(StaticData.serviceDigging, "");
        await unitCreationForm.enterPriceForService(StaticData.serviceDigging, StaticData.specialSymbols2);
        await unitCreationForm.verifyPriceInputValueOnService(StaticData.serviceDigging, "");

        await unitCreationForm.enterPriceForService(StaticData.serviceDigging, StaticData.validPrice);
        await unitCreationForm.verifyPriceInputValueOnService(StaticData.serviceDigging, StaticData.validPrice);

        await unitCreationForm.removePriceFromService(StaticData.serviceDigging);
        await unitCreationForm.assertAddPriceBtnVisibilityOnService(StaticData.serviceDigging);
    });

    test('C488 - Verify "Назад" button (4. Price Tab)', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(2).click();
        await unitCreationForm.enterService(StaticData.serviceDigging);
        await unitCreationForm.selectServiceContainingText(StaticData.serviceDigging);
        await unitCreationForm.assertSelectedServiceVisibility(StaticData.serviceDigging);
        await unitCreationPage.clickNextBtn();

        await unitCreationPage.clickPrevBtn();
        await unitCreationPage.verifySelectedTabIsHighlighted(2);
        await unitCreationForm.assertSelectedServiceVisibility(StaticData.serviceDigging);
    });

    test('C489 - Verify "Далі" button (4. Price Tab)', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(2).click();
        await unitCreationForm.enterService(StaticData.serviceDigging);
        await unitCreationForm.selectServiceContainingText(StaticData.serviceDigging);
        await unitCreationForm.assertSelectedServiceVisibility(StaticData.serviceDigging);
        await unitCreationPage.clickNextBtn();

        await unitCreationForm.addPriceForService(StaticData.serviceDigging);
        await unitCreationPage.clickNextBtn();
        await unitCreationForm.assertMinimumPriceErrorWithMsg(ErrorMessages.fieldRequired);
        await unitCreationForm.assertPriceErorrMsgOnService(StaticData.serviceDigging, ErrorMessages.fieldRequired);

        await unitCreationForm.enterMinimumPrice(StaticData.validPrice);
        await unitCreationForm.enterPriceForService(StaticData.serviceDigging, StaticData.validPrice);
        await unitCreationForm.assertMinimumPriceErrorMsgNotVisible();
        await unitCreationForm.assertPriceErorrMsgOnServiceNotVisible(StaticData.serviceDigging);

        await unitCreationPage.clickNextBtn();
        await unitCreationPage.verifySelectedTabIsHighlighted(4);
    });

    test('C596 - Verify entering invalid price in the "Вартість мінімального замовлення" input', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(3).click();
        await unitCreationForm.enterMinimumPrice("0");
        await unitCreationForm.verifyMinimumPriceInputValue("");
        await unitCreationForm.enterMinimumPrice("1");
        await unitCreationPage.clickNextBtn();
        await unitCreationForm.assertMinimumPriceErrorWithMsg(ErrorMessages.priceTooSmall);

        await unitCreationForm.enterMinimumPrice("");
        await unitCreationForm.assertMinimumPriceErrorWithMsg(ErrorMessages.fieldRequired);

        await unitCreationForm.enterMinimumPrice("1000");
        await unitCreationForm.assertMinimumPriceErrorMsgNotVisible();
    });

    test('C637 - Verify UI of the "Вартість Ваших послуг" section', async ({ unitCreationPage, unitCreationForm }) => {
        await unitCreationPage.getTabTitleByIndex(2).click();
        await unitCreationForm.enterService(StaticData.serviceDigging);
        await unitCreationForm.selectServiceContainingText(StaticData.serviceDigging);
        await unitCreationForm.assertSelectedServiceVisibility(StaticData.serviceDigging);
        await unitCreationPage.clickNextBtn();

        await unitCreationForm.verifyServicesPriceSectionTitle();
        await unitCreationForm.verifyServicesPriceSectionClue();

        await unitCreationForm.assertAddPriceBtnVisibilityOnService(StaticData.serviceDigging);
        await unitCreationForm.addPriceForService(StaticData.serviceDigging);
        await unitCreationForm.assertAddPriceBtnVisibilityOnService(StaticData.serviceDigging, false);

        await unitCreationForm.verifyPriceInputPlaceholderOnService(StaticData.serviceDigging);
        await unitCreationForm.verifyCurrencyFieldOnService(StaticData.serviceDigging);
        await unitCreationForm.verifyRatesForService(StaticData.serviceDigging);
        await unitCreationForm.removePriceFromService(StaticData.serviceDigging);
        await unitCreationForm.assertAddPriceBtnVisibilityOnService(StaticData.serviceDigging);
    });

});