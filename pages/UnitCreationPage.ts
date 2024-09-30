import BasePage from './BasePage';
import { expect, Page } from '@playwright/test';


export default class UnitCreationPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private unitCreationFormTitle = this.page.locator("div[class*='CreateEditFlowLayout_title_']");
    private nextBtn = this.page.getByTestId("nextButton");
    private prevBtn = this.page.locator("button[class*='ButtonsFlow_emptyBtn_']");
    private tabTitle = this.page.locator("button[id*='mui-p-']");
    private categorySelectionTitle = this.page.locator("[class*='CategorySelect_title_']");
    private categorySelection = this.page.getByTestId("categoryName");
    private categorySelectionPopup = this.page.getByTestId("categoryPopupWrapper");
    private categorySelectionCloseBtn = this.page.getByTestId("closeIcon");
    private categoryErrorMsg = this.page.locator("[class*='CategorySelect_error_']~[class*='CategorySelect_errorTextVisible_']");
    private firstCategory = this.page.getByTestId('firstCategoryLabel');
    private secondCategory = this.page.locator("[class*='SecondCategory_wrapper_unit_']");
    private thirdCategory = this.page.locator("[class*='ThirdCategory_wrapper_unit_']");
    private listingTitleInput = this.page.locator("input[placeholder='Введіть назву оголошення']");
    private listingTitleInputTitle = this.page.locator("div[class*='CustomInput_wrapper_']:has(input[placeholder='Введіть назву оголошення'])>div[class*='CustomInput_title_']");
    private listingTitleErrorMsg = this.page.locator("input[placeholder='Введіть назву оголошення'][class*='CustomInput_inputError_']~div[class*='CustomInput_errorDescr_']");
    private manufacturerInput = this.page.getByTestId('input-customSelectWithSearch');
    private manufacturerErrorMsg = this.page.locator("div[data-testid='div-wrapper-customSelectWithSearch']:has(div[class*='CustomSelectWithSearch_searchResultError_'])>[class*='CustomSelectWithSearch_errorTextVisible_']");
    private manufacturerInputTitle = this.page.locator("div[class*='SelectManufacturer_title_']");
    private manufacturerSearchDropdown = this.page.locator("div[class*='CustomSelectWithSearch_searchResult_']");
    private manufacturerSearchItem = this.page.getByTestId('item-customSelectWithSearch');
    private manufacturerNotFoundMsg = this.page.getByTestId('p2-notFound-addNewItem');
    private manufacturerInputCharLimit = this.page.getByTestId('maxLength');
    private manufacturerInputClearBtn = this.page.getByTestId('crossIcon');
    private manufacturerSearchIcon = this.page.locator("div[class*='CustomSelectWithSearch_searchInput_']>svg");
    private selectedManufacturer = this.page.getByTestId('div-service-customSelectWithSearch');
    private modelNameInput = this.page.locator("input[placeholder='Введіть назву моделі']");
    private modelNameErrorMsg = this.page.locator("input[placeholder='Введіть назву моделі'][class*='CustomInput_inputError_']~div[class*='CustomInput_errorDescr_']")
    private modelInputTitle = this.page.locator("div[class*='CustomInput_wrapper_']:has(input[placeholder='Введіть назву моделі'])>div[class*='CustomInput_title_']");
    private technicalDetailsInput = this.page.getByTestId('textarea-customTextAriaDescription').first();
    private technicalDetailsInputTitle = this.page.locator("div[class*='CustomTextAriaDescription_title_']").first();
    private descriptionInput = this.page.getByTestId('textarea-customTextAriaDescription').nth(1);
    private descriptionInputTitle = this.page.locator("div[class*='CustomTextAriaDescription_title_']").nth(1);
    private mapSelectionError = this.page.locator("[class*='AddressSelectionBlock_labelError_']~div[class*='AddressSelectionBlock_errorTextVisible_']");
    private selectedLocationLabel = this.page.getByTestId('mapLabel');
    private mapSelectionTitle = this.page.locator("div[class*='AddressSelectionBlock_title_']");
    private openMapBtn = this.page.locator("button[class*='AddressSelectionBlock_locationBtn_']");
    private mapPopup = this.page.getByTestId('div-mapPopup');
    private mapPopupTitle = this.page.locator("div[class*='MapPopup_title_']");
    private mapCloseIcon = this.page.locator("span[class*='MapPopup_icon_']");
    private mapSelectedLocation = this.page.getByTestId('address');
    private mapConfirmSelectionBtn = this.page.locator("button[class*='ItemButtons_darkBlueBtn_']");

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
    async assertManufacturerSearhDropdownVisible() {
        expect(this.manufacturerSearchDropdown).toBeVisible();
    }
    async assertListingInputEmpty() {
        expect(this.listingTitleInput).toHaveValue("")
    }
    async assertManufacturerInputValue(value: string) {
        expect(this.manufacturerInput).toHaveValue(value)
    }
    async assertModelInputInputEmpty() {
        expect(this.modelNameInput).toHaveValue("")
    }
    async assertTechnicalDetailsInputInputEmpty() {
        expect(this.technicalDetailsInput).toHaveValue("")
    }
    async assertDescriptionInputInputEmpty() {
        expect(this.descriptionInput).toHaveValue("")
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
    async assertMapPopupTitle() {
        expect(this.mapPopupTitle).toHaveText("Техніка на мапі");
    }
    async assertCancelBtnText() {
        expect(this.prevBtn).toHaveText("Скасувати");
    }
    async assertNextBtnText() {
        expect(this.nextBtn).toHaveText("Далі");
    }
    async assertDefaultLocationPreselected() {
        await this.mapPopup.waitFor();
        expect(this.mapSelectedLocation).toHaveText("Київ, вулиця Володимирська 21/20 Україна, Київська область");
    }
    async selectLocationAndVerify(location: string = "custom") {
        let selectedLocation: string = ""
        if (location == "custom") {
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