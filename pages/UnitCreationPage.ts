import * as path from 'path';
import BasePage from './BasePage';
import { expect, Locator, Page } from '@playwright/test';

export default class UnitCreationPage extends BasePage {
    private readonly unitCreationFormTitle: Locator;
    private readonly nextBtn: Locator;
    private readonly prevBtn: Locator;
    private readonly tabTitle: Locator;
    private readonly categorySelectionTitle: Locator;
    private readonly categorySelection: Locator;
    private readonly categorySelectionPopup: Locator;
    private readonly categorySelectionCloseBtn: Locator;
    private readonly categoryErrorMsg: Locator;
    private readonly firstCategory: Locator;
    private readonly secondCategory: Locator;
    private readonly thirdCategory: Locator;
    private readonly listingTitleInput: Locator;
    private readonly listingTitleInputTitle: Locator;
    private readonly listingTitleErrorMsg: Locator;
    private readonly manufacturerInput: Locator;
    private readonly manufacturerErrorMsg: Locator;
    private readonly manufacturerInputTitle: Locator;
    private readonly manufacturerSearchDropdown: Locator;
    private readonly manufacturerSearchItem: Locator;
    private readonly manufacturerNotFoundMsg: Locator;
    private readonly manufacturerInputCharLimit: Locator;
    private readonly manufacturerInputClearBtn: Locator;
    private readonly manufacturerSearchIcon: Locator;
    private readonly selectedManufacturer: Locator;
    private readonly modelNameInput: Locator;
    private readonly modelNameErrorMsg: Locator;
    private readonly modelInputTitle: Locator;
    private readonly technicalDetailsInput: Locator;
    private readonly technicalDetailsInputTitle: Locator;
    private readonly descriptionInput: Locator;
    private readonly descriptionInputTitle: Locator;
    private readonly mapSelectionError: Locator;
    private readonly selectedLocationLabel: Locator;
    private readonly mapSelectionTitle: Locator;
    private readonly openMapBtn: Locator;
    private readonly mapPopup: Locator;
    private readonly mapPopupTitle: Locator;
    private readonly mapCloseIcon: Locator;
    private readonly mapSelectedLocation: Locator;
    private readonly mapConfirmSelectionBtn: Locator;
    private readonly imageBlock: Locator;
    private readonly errorPopup: Locator;
    private readonly errorPopupTitle: Locator;
    private readonly errorPopupCloseBtn: Locator;
    private readonly errorPopupOkBtn: Locator;
    private readonly errorPopupContent: Locator;
    private readonly imageUploadClueText: Locator;
    private readonly imageUploadTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.unitCreationFormTitle = this.page.locator("div[class*='CreateEditFlowLayout_title_']");
        this.nextBtn = this.page.getByTestId("nextButton");
        this.prevBtn = this.page.locator("button[class*='ButtonsFlow_emptyBtn_']");
        this.tabTitle = this.page.locator("button[id*='mui-p-']");
        this.categorySelectionTitle = this.page.locator("[class*='CategorySelect_title_']");
        this.categorySelection = this.page.getByTestId("categoryName");
        this.categorySelectionPopup = this.page.getByTestId("categoryPopupWrapper");
        this.categorySelectionCloseBtn = this.page.getByTestId("closeIcon");
        this.categoryErrorMsg = this.page.locator("[class*='CategorySelect_error_']~[class*='CategorySelect_errorTextVisible_']");
        this.firstCategory = this.page.getByTestId('firstCategoryLabel');
        this.secondCategory = this.page.locator("[class*='SecondCategory_wrapper_unit_']");
        this.thirdCategory = this.page.locator("[class*='ThirdCategory_wrapper_unit_']");
        this.listingTitleInput = this.page.locator("input[placeholder='Введіть назву оголошення']");
        this.listingTitleInputTitle = this.page.locator("div[class*='CustomInput_wrapper_']:has(input[placeholder='Введіть назву оголошення'])>div[class*='CustomInput_title_']");
        this.listingTitleErrorMsg = this.page.locator("input[placeholder='Введіть назву оголошення'][class*='CustomInput_inputError_']~div[class*='CustomInput_errorDescr_']");
        this.manufacturerInput = this.page.getByTestId('input-customSelectWithSearch');
        this.manufacturerErrorMsg = this.page.locator("div[data-testid='div-wrapper-customSelectWithSearch']:has(div[class*='CustomSelectWithSearch_searchResultError_'])>[class*='CustomSelectWithSearch_errorTextVisible_']");
        this.manufacturerInputTitle = this.page.locator("div[class*='SelectManufacturer_title_']");
        this.manufacturerSearchDropdown = this.page.locator("div[class*='CustomSelectWithSearch_searchResult_']");
        this.manufacturerSearchItem = this.page.getByTestId('item-customSelectWithSearch');
        this.manufacturerNotFoundMsg = this.page.getByTestId('p2-notFound-addNewItem');
        this.manufacturerInputCharLimit = this.page.getByTestId('maxLength');
        this.manufacturerInputClearBtn = this.page.getByTestId('crossIcon');
        this.manufacturerSearchIcon = this.page.locator("div[class*='CustomSelectWithSearch_searchInput_']>svg");
        this.selectedManufacturer = this.page.getByTestId('div-service-customSelectWithSearch');
        this.modelNameInput = this.page.locator("input[placeholder='Введіть назву моделі']");
        this.modelNameErrorMsg = this.page.locator("input[placeholder='Введіть назву моделі'][class*='CustomInput_inputError_']~div[class*='CustomInput_errorDescr_']");
        this.modelInputTitle = this.page.locator("div[class*='CustomInput_wrapper_']:has(input[placeholder='Введіть назву моделі'])>div[class*='CustomInput_title_']");
        this.technicalDetailsInput = this.page.getByTestId('textarea-customTextAriaDescription').first();
        this.technicalDetailsInputTitle = this.page.locator("div[class*='CustomTextAriaDescription_title_']").first();
        this.descriptionInput = this.page.getByTestId('textarea-customTextAriaDescription').nth(1);
        this.descriptionInputTitle = this.page.locator("div[class*='CustomTextAriaDescription_title_']").nth(1);
        this.mapSelectionError = this.page.locator("[class*='AddressSelectionBlock_labelError_']~div[class*='AddressSelectionBlock_errorTextVisible_']");
        this.selectedLocationLabel = this.page.getByTestId('mapLabel');
        this.mapSelectionTitle = this.page.locator("div[class*='AddressSelectionBlock_title_']");
        this.openMapBtn = this.page.locator("button[class*='AddressSelectionBlock_locationBtn_']");
        this.mapPopup = this.page.getByTestId('div-mapPopup');
        this.mapPopupTitle = this.page.locator("div[class*='MapPopup_title_']");
        this.mapCloseIcon = this.page.locator("span[class*='MapPopup_icon_']");
        this.mapSelectedLocation = this.page.getByTestId('address');
        this.mapConfirmSelectionBtn = this.page.locator("button[class*='ItemButtons_darkBlueBtn_']");
        this.imageBlock = this.page.getByTestId('imageBlock');
        this.errorPopup = this.page.locator('div[class*="PopupLayout_content_"]');
        this.errorPopupTitle = this.page.locator('div[class*="PopupLayout_label_"]');
        this.errorPopupCloseBtn = this.page.locator('div[class*="PopupLayout_closeIcon_"]');
        this.errorPopupOkBtn = this.page.locator('button', { hasText: "Зрозуміло" });
        this.errorPopupContent = this.page.getByTestId('errorPopup');
        this.imageUploadClueText = this.page.locator("div[class*='ImagesUnitFlow_descr_']");
        this.imageUploadTitle = this.page.locator("div[class*='ImagesUnitFlow_paragraph_']");
    }

    async clickNextBtn() {
        await this.nextBtn.click();
    }
    async clickPrevBtn() {
        await this.prevBtn.click({ noWaitAfter: true });
    }
    async verifyCancelBtn() {
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.clickPrevBtn();
        const dialog = await dialogPromise;
        expect(dialog.message()).toContain('Ви впевнені, що хочете перейти на іншу сторінку? Внесені дані не збережуться!');
        await dialog.accept();
        expect(this.page).toHaveURL("/owner-units-page/");
    }
    async getImageBlockByIndex(index: number) {
        const imageBlock = this.imageBlock.nth(index);
        return imageBlock;
    }
    async uploadImagesToBlock(blockIndex: number, imageFiles: string[]) {
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            (await this.getImageBlockByIndex(blockIndex)).click()
        ]);
        const filePaths = imageFiles.map(image => path.join(process.cwd(), 'data', 'files', 'images', image));
        await fileChooser.setFiles(filePaths);
    }
    async deleteImageFromBlock(blockIndex: number) {
        const imageBlock = await this.getImageBlockByIndex(blockIndex);
        await imageBlock.hover();
        const deleteIcon = imageBlock.getByTestId('deleteImage');
        await deleteIcon.click();
    }
    async assertErrorPopupVisible() {
        expect(this.errorPopup).toBeVisible();
    }
    async assertErrorPopupNotVisible() {
        expect(this.errorPopup).not.toBeVisible();
    }
    async assertErrorPopupContent(text: string) {
        expect(this.errorPopupContent).toHaveText(text);
    }
    async assertErrorPopupTitle(text: string) {
        expect(this.errorPopupTitle).toHaveText(text);
    }
    async clickErrorPopupOkBtn() {
        await this.errorPopupOkBtn.click();
    }
    async clickErrorPopupCloseBtn() {
        await this.errorPopupCloseBtn.click();
    }
    async dragAndDropImage (dragIndex: number, dropIndex: number) {
        const dragBlock = await this.getImageBlockByIndex(dragIndex);
        const dropBlock = await this.getImageBlockByIndex(dropIndex);

        await dragBlock.dragTo(dropBlock);
    }
    async getImageBlockSource(blockIndex: number) {
        const imageBlock = await this.getImageBlockByIndex(blockIndex);

        const imageSrc = await imageBlock.locator('img').getAttribute('src');
        expect(imageSrc).not.toBe('');

        return imageSrc;
    }
    async verifyMainImageLabelVisible() {
        const firstImageBlock = await this.getImageBlockByIndex(0);
        const mainImageLabel = firstImageBlock.locator("[data-testid='mainImageLabel']");

        expect(mainImageLabel).toHaveText("Головне");
    }
    async verifyImageInBlock(blockIndex: number, imgSource: string | null) {
        const imageBlock = await this.getImageBlockByIndex(blockIndex);

        const imageInBlock = await imageBlock.locator('img').getAttribute('src');
        expect(imageInBlock).toBe(imgSource);
    }
    async getTabTitleByNumber(number: number) {
        return this.tabTitle.nth(number);
    }
    async getFirstCategoryByNumber(number: number) {
        return this.firstCategory.nth(number);
    }
    async getSecondCategoryByNumber(number: number) {
        return this.secondCategory.nth(number);
    }
    async getThirdCategoryByNumber(number: number) {
        return this.thirdCategory.nth(number);
    }
    async clickCategorySelection() {
        await this.categorySelection.click();
    }
    async clickCategorySelectCloseBtn() {
        await this.categorySelectionCloseBtn.click();
    }
    async openMap() {
        await this.openMapBtn.click();
        await this.assertDefaultLocationPreselected();
    }
    async clickMapPopupCloseBtn() {
        await this.mapCloseIcon.click();
    }
    async selectThirdCateogryAndVerify(number: number) {
        let thirdCategoryText: string = await (await this.getThirdCategoryByNumber(number)).innerText();
        await (await this.getThirdCategoryByNumber(number)).click();
        expect(this.categorySelection).toHaveText(thirdCategoryText.toLowerCase());
    }
    async clickOutsidePopup() {
        const viewportSize = this.page.viewportSize();
        if (!viewportSize) {
            throw new Error("Unable to get the viewport size.");
        }
        const clickX = viewportSize.width * 0.9;
        const clickY = viewportSize.height * 0.5;

        await this.page.mouse.move(clickX, clickY);
        await this.page.mouse.click(clickX, clickY);
    }
    async clickRandomLocation() {
        const viewportSize = this.page.viewportSize();
        if (!viewportSize) {
            throw new Error("Unable to get the viewport size.");
        }

        const randomX = Math.random() * (0.7 - 0.4) + 0.4;
        const randomY = Math.random() * (0.7 - 0.4) + 0.4;

        const clickX = viewportSize.width * randomX;
        const clickY = viewportSize.height * randomY;

        await this.page.mouse.move(clickX, clickY);
        await this.page.mouse.click(clickX, clickY);
    }
    async clickManufacturerClearBtn() {
        await this.manufacturerInputClearBtn.click();
    }
    async clickManufacturerSearchItem() {
        await this.manufacturerSearchItem.nth(0).click();
    }
    async enterListingTitle(title: string) {
        await this.listingTitleInput.fill(title);
    }
    async typeListingTitle(title: string) {
        await this.listingTitleInput.pressSequentially(title);
    }
    async enterTechnicalDetails(text: string) {
        await this.technicalDetailsInput.fill(text);
    }
    async enterDescription(text: string) {
        await this.descriptionInput.fill(text);
    }
    async enterManufacturer(manufacturer: string) {
        await this.manufacturerInput.fill(manufacturer);
    }
    async enterModelName(model: string) {
        await this.modelNameInput.fill(model);
    }
    async verifyTextAreaCharCount(area: string = "details") {
        let enteredText: string = ""
        if (area == "details") {
            enteredText = await this.technicalDetailsInput.inputValue();
        }
        else if (area == "description") {
            enteredText = await this.descriptionInput.inputValue();
        }
        expect(enteredText.length).toEqual(9000);
    }
    async assertCategorySelectionTitleText() {
        expect(this.categorySelectionTitle).toHaveText("Категорія *");
    }
    async assertListingTitleInputTitleText() {
        expect(this.listingTitleInputTitle).toHaveText("Назва оголошення *");
    }
    async assertManufacturerInputElements() {
        expect(this.manufacturerInputTitle).toHaveText("Виробник транспортного засобу *");
        expect(this.manufacturerInput).toHaveAttribute("placeholder", "Введіть виробника транспортного засобу");
        expect(this.manufacturerSearchIcon).toBeVisible();
    }
    async assertModelInputTitleText() {
        expect(this.modelInputTitle).toHaveText("Назва моделі");
    }
    async assertTechnicalDetailsInputTitle() {
        expect(this.technicalDetailsInputTitle).toHaveText("Технічні характеристики");
    }
    async assertDescriptionInputTitle() {
        expect(this.descriptionInputTitle).toHaveText("Детальний опис");
    }
    async assertMapSelectionTitle() {
        expect(this.mapSelectionTitle).toHaveText("Місце розташування технічного засобу *");
    }
    async assertMapSelectionPlaceholderVisible() {
        expect(this.selectedLocationLabel).toHaveText("Виберіть на мапі");
    }
    async assertImageUploadTitle() {
        expect(this.imageUploadTitle).toHaveText("Фото технічного засобу *");
    }
    async assertManufacturerSearhDropdownVisible() {
        expect(this.manufacturerSearchDropdown).toBeVisible();
    }
    async assertListingInputEmpty() {
        expect(this.listingTitleInput).toHaveValue("");
    }
    async assertManufacturerInputValue(value: string) {
        expect(this.manufacturerInput).toHaveValue(value);
    }
    async assertModelInputInputEmpty() {
        expect(this.modelNameInput).toHaveValue("");
    }
    async assertTechnicalDetailsInputInputEmpty() {
        expect(this.technicalDetailsInput).toHaveValue("");
    }
    async assertDescriptionInputInputEmpty() {
        expect(this.descriptionInput).toHaveValue("");
    }
    async assertManufacturerSearchResultItem(result: string) {
        expect(this.manufacturerSearchItem).toHaveText(result);
    }
    async assertSelectedManufacturer(manufacturer: string) {
        expect(this.selectedManufacturer).toHaveText(manufacturer);
    }
    async assertCategorySelectErrorWithMsg(message: string) {
        expect(this.categoryErrorMsg).toHaveText(message);
    }
    async assertListingTitleErrorWithMsg(message: string) {
        expect(this.listingTitleErrorMsg).toHaveText(message);
    }
    async assertManufacturerErrorWithMsg(message: string) {
        expect(this.manufacturerErrorMsg).toHaveText(message);
    }
    async assertMapSelectionErrorWithMsg(message: string) {
        expect(this.mapSelectionError).toHaveText(message);
    }
    async assertModelErrorWithMsg(message: string) {
        expect(this.modelNameErrorMsg).toHaveText(message);
    }
    async assertListingTitleErrorNotVisible() {
        expect(this.listingTitleErrorMsg).not.toBeVisible();
    }
    async assertModelNameErrorNotVisible() {
        expect(this.modelNameErrorMsg).not.toBeVisible();
    }
    async assertMapPopupVisible() {
        expect(this.mapPopup).toBeVisible();
    }
    async assertMapPopupNotVisible() {
        expect(this.mapPopup).not.toBeVisible();
    }
    async assertCategoryPopupVisible() {
        expect(this.categorySelectionPopup).toBeVisible();
    }
    async assertCategoryPopupNotVisible() {
        expect(this.categorySelectionPopup).not.toBeVisible();
    }
    async assertUnitCreationFormTitle() {
        expect(this.unitCreationFormTitle).toHaveText("Створити оголошення");
    }
    async assertManufacturerInputCharLimitMaxed() {
        expect(this.manufacturerInputCharLimit).toHaveText("100 / 100");
    }
    async assertManufacturerNotFound(manufacturer: string) {
        expect(this.manufacturerNotFoundMsg).toHaveText(`На жаль, виробника “${manufacturer}“ не знайдено в нашій базі.` + " Щоб додати виробника - зв`яжіться із службою підтримки");
    }
    async assertImageUploadClueText() {
        expect(this.imageUploadClueText).toHaveText("Додайте в оголошення від 1 до 12 фото технічного засобу розміром до 20 МВ у форматі .jpg, .jpeg, .png. Перше фото буде основним.");
    }
    async assertImageUploadClueErrorState() {
        expect(this.imageUploadClueText).toHaveCSS('color', "rgb(247, 56, 89)");
    }
    async assertTotalNumberOfImageBlocks(number: number) {
        const imageBlocks = await this.imageBlock.all();
        expect(imageBlocks).toHaveLength(number);
    }
    async assertMapPopupTitle() {
        expect(this.mapPopupTitle).toHaveText("Техніка на мапі");
    }
    async assertCancelBtnText() {
        expect(this.prevBtn).toHaveText("Скасувати");
    }
    async assertPrevBtnText() {
        expect(this.prevBtn).toHaveText("Назад");
    }
    async assertNextBtnText() {
        expect(this.nextBtn).toHaveText("Далі");
    }
    async assertDefaultLocationPreselected() {
        await this.mapPopup.waitFor();
        expect(this.mapSelectedLocation).toHaveText("Київ, вулиця Володимирська 21/20 Україна, Київська область");
    }
    async selectLocationAndVerify(location: string = "random") {
        let selectedLocation: string
        if (location == "random") {
            await this.clickRandomLocation();
            await this.page.waitForTimeout(1000);
        }
        selectedLocation = await this.mapSelectedLocation.innerText();
        await this.mapConfirmSelectionBtn.click();
        await expect(this.selectedLocationLabel).toHaveText(selectedLocation);
    }
    async verifySelectedTabIsHighlighted(tabNumber: number) {
        for (let i = 0; i < 4; i++) {
            if (i == tabNumber) {
                expect(await (this.getTabTitleByNumber(i))).toHaveAttribute('aria-selected', 'true');
            }
            else {
                expect(await (this.getTabTitleByNumber(i))).toHaveAttribute('aria-selected', 'false');
            }
        }
    }
    async verifyTabsText() {
        expect(await (this.getTabTitleByNumber(0))).toHaveText("1Основна інформація");
        expect(await (this.getTabTitleByNumber(1))).toHaveText("2Фотографії");
        expect(await (this.getTabTitleByNumber(2))).toHaveText("3Послуги");
        expect(await (this.getTabTitleByNumber(3))).toHaveText("4Вартість");
        expect(await (this.getTabTitleByNumber(4))).toHaveText("5Контакти");
    }
}