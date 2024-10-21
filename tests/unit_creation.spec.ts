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
        await unitCreationPage.getFirstCategoryByIndex(0).click();
        await unitCreationPage.getSecondCategoryByIndex(1).click();
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

    test('C326 - Verify "Відмінити" button (1. General Info Tab)', async ({ unitCreationPage }) => {
        await unitCreationPage.assertCancelBtnText();
        await unitCreationPage.verifyCancelBtn();
    });

    test('C329 - Verify "Далі" button (1. General Info Tab)', async ({ randomData, unitCreationPage }) => {
        await unitCreationPage.assertNextBtnText();
        await unitCreationPage.clickNextBtn();
        await unitCreationPage.assertCategorySelectErrorWithMsg(ErrorMessages.fieldRequired);
        await unitCreationPage.assertListingTitleErrorWithMsg(ErrorMessages.fieldRequired);
        await unitCreationPage.assertManufacturerErrorWithMsg(ErrorMessages.fieldRequired);
        await unitCreationPage.assertMapSelectionErrorWithMsg(ErrorMessages.locationNotSelected);

        await unitCreationPage.clickCategorySelection();
        await unitCreationPage.getFirstCategoryByIndex(0).click();
        await unitCreationPage.getSecondCategoryByIndex(1).click();
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

    test('C384 - Verify uploading the same image', async ({ unitCreationPage }) => {
        await unitCreationPage.getTabTitleByIndex(1).click();
        await unitCreationPage.uploadImagesToBlock(0, ["valid_jpeg.jpeg"]);
        await unitCreationPage.getImageBlockSource(0);
        await unitCreationPage.verifyMainImageLabelVisible();
        await unitCreationPage.uploadImagesToBlock(1, ["valid_jpeg.jpeg"]);
        await unitCreationPage.assertErrorPopupVisible();
        await unitCreationPage.assertErrorPopupTitle(ErrorMessages.imageInvalid);
        await unitCreationPage.assertErrorPopupContent(ErrorMessages.fileDuplicate);
        await unitCreationPage.clickErrorPopupOkBtn();
        await unitCreationPage.assertErrorPopupNotVisible();
        await unitCreationPage.verifyImageInBlock(1, '');

        await unitCreationPage.uploadImagesToBlock(1, ["valid_jpeg.jpeg"]);
        await unitCreationPage.assertErrorPopupVisible();
        await unitCreationPage.clickErrorPopupCloseBtn();
        await unitCreationPage.assertErrorPopupNotVisible();
        await unitCreationPage.verifyImageInBlock(1, '');

        await unitCreationPage.uploadImagesToBlock(1, ["valid_jpeg.jpeg"]);
        await unitCreationPage.assertErrorPopupVisible();
        await unitCreationPage.clickOutsidePopup();
        await unitCreationPage.assertErrorPopupNotVisible();
        await unitCreationPage.verifyImageInBlock(1, '');
    });

    test('C401 - Verify uploading invalid file type', async ({ unitCreationPage }) => {
        await unitCreationPage.getTabTitleByIndex(1).click();
        await unitCreationPage.uploadImagesToBlock(0, ["webp_image.webp"]);
        await unitCreationPage.assertErrorPopupVisible();
        await unitCreationPage.assertErrorPopupTitle(ErrorMessages.imageInvalid);
        await unitCreationPage.assertErrorPopupContent(ErrorMessages.imageFormatInvalid);
        await unitCreationPage.clickErrorPopupOkBtn();
        await unitCreationPage.assertErrorPopupNotVisible();
        await unitCreationPage.verifyImageInBlock(0, '');

        await unitCreationPage.uploadImagesToBlock(0, ["webp_image.webp"]);
        await unitCreationPage.assertErrorPopupVisible();
        await unitCreationPage.clickErrorPopupCloseBtn();
        await unitCreationPage.assertErrorPopupNotVisible();
        await unitCreationPage.verifyImageInBlock(0, '');

        await unitCreationPage.uploadImagesToBlock(0, ["webp_image.webp"]);
        await unitCreationPage.assertErrorPopupVisible();
        await unitCreationPage.clickOutsidePopup();
        await unitCreationPage.assertErrorPopupNotVisible();
        await unitCreationPage.verifyImageInBlock(0, '');
    });

    test('C405 - Verify uploading image of size more than 20MB', async ({ unitCreationPage }) => {
        await unitCreationPage.getTabTitleByIndex(1).click();
        await unitCreationPage.uploadImagesToBlock(0, ["image_over_20mb.png"]);
        await unitCreationPage.assertErrorPopupVisible();
        await unitCreationPage.assertErrorPopupTitle(ErrorMessages.imageInvalid);
        await unitCreationPage.assertErrorPopupContent(ErrorMessages.imageFormatInvalid);
        await unitCreationPage.clickErrorPopupOkBtn();
        await unitCreationPage.assertErrorPopupNotVisible();
        await unitCreationPage.verifyImageInBlock(0, '');

        await unitCreationPage.uploadImagesToBlock(0, ["image_over_20mb.png"]);
        await unitCreationPage.assertErrorPopupVisible();
        await unitCreationPage.clickErrorPopupCloseBtn();
        await unitCreationPage.assertErrorPopupNotVisible();
        await unitCreationPage.verifyImageInBlock(0, '');

        await unitCreationPage.uploadImagesToBlock(0, ["image_over_20mb.png"]);
        await unitCreationPage.assertErrorPopupVisible();
        await unitCreationPage.clickOutsidePopup();
        await unitCreationPage.assertErrorPopupNotVisible();
        await unitCreationPage.verifyImageInBlock(0, '');
    });

    test('C390 - Verify "Назад" button (2. Photo Tab)', async ({ unitCreationPage }) => {
        await unitCreationPage.getTabTitleByIndex(1).click();
        await unitCreationPage.assertPrevBtnText();
        await unitCreationPage.clickPrevBtn();

        await unitCreationPage.verifySelectedTabIsHighlighted(0);
        await unitCreationPage.assertCategorySelectionTitleText();
        await unitCreationPage.assertListingTitleInputTitleText();
        await unitCreationPage.assertManufacturerInputElements();
        await unitCreationPage.assertModelInputTitleText();
        await unitCreationPage.assertDescriptionInputTitle();
        await unitCreationPage.assertMapSelectionTitle();
    });

    test('C393 - Verify "Далі" button (2. Photo Tab)', async ({ unitCreationPage }) => {
        await unitCreationPage.getTabTitleByIndex(1).click();
        await unitCreationPage.assertImageUploadTitle();
        await unitCreationPage.assertImageUploadClueText();
        await unitCreationPage.clickNextBtn();
        await unitCreationPage.assertImageUploadClueErrorState();

        await unitCreationPage.uploadImagesToBlock(0, ["valid_jpeg.jpeg"]);
        await unitCreationPage.getImageBlockSource(0);
        await unitCreationPage.clickNextBtn();
        await unitCreationPage.verifySelectedTabIsHighlighted(2);
    });

    test('C593 - Verify image upload', async ({ unitCreationPage }) => {
        await unitCreationPage.getTabTitleByIndex(1).click();
        await unitCreationPage.assertImageUploadTitle();
        await unitCreationPage.assertImageUploadClueText();
        
        await unitCreationPage.uploadImagesToBlock(0, ["valid_jpeg.jpeg"]);
        await unitCreationPage.getImageBlockSource(0);
        await unitCreationPage.verifyMainImageLabelVisible();

        await unitCreationPage.uploadImagesToBlock(1, ["valid_jpeg2.jpeg", "valid_jpeg3.jpeg", "valid_jpg.jpg", "valid_jpg2.jpg", "valid_jpg3.jpg", "valid_jpg4.jpg", "valid_png.png", "valid_png2.png", "valid_png3.png", "valid_png4.png", "valid_png5.png"]);
        await unitCreationPage.assertTotalNumberOfImageBlocks(12);
        for(let i = 0; i < 12; i++) {
            await unitCreationPage.getImageBlockSource(i);
        }
    });

    test('C594 - Verify image drag & drop', async ({ unitCreationPage }) => {
        await unitCreationPage.getTabTitleByIndex(1).click();
        await unitCreationPage.uploadImagesToBlock(0, ["valid_jpeg.jpeg", "valid_jpeg2.jpeg"]);
        let firstBlockImage = await unitCreationPage.getImageBlockSource(0);
        let secondBlockImage = await unitCreationPage.getImageBlockSource(1);

        await unitCreationPage.dragAndDropImage(1, 0);
        await unitCreationPage.verifyImageInBlock(0, secondBlockImage);
        await unitCreationPage.verifyImageInBlock(1, firstBlockImage);
    });

    test('C595 - Verify image deleting', async ({ unitCreationPage }) => {
        await unitCreationPage.getTabTitleByIndex(1).click();
        await unitCreationPage.uploadImagesToBlock(0, ["valid_jpeg.jpeg"]);
        await unitCreationPage.getImageBlockSource(0);
        await unitCreationPage.deleteImageFromBlock(0);
        await unitCreationPage.verifyImageInBlock(0, '');
    });
});