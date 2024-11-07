import { expect, Locator, Page } from '@playwright/test';
import path from 'path';

export default class LoginPopup {
    protected page: Page;
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
    private readonly mapZoomInBtn: Locator;
    private readonly mapZoomOutBtn: Locator;
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
    private readonly serviceInputTitle: Locator;
    private readonly serviceInputClue: Locator;
    private readonly serviceSearchInput: Locator;
    private readonly serviceSearchInputWrapper: Locator;
    private readonly serviceSearchItem: Locator;
    private readonly selectedServicesTitle: Locator;
    private readonly selectedService: Locator;
    private readonly serviceRemoveBtn: Locator;
    private readonly minPriceInput: Locator;
    private readonly minPriceInputError: Locator;
    private readonly minPriceInputTitle: Locator;
    private readonly currencyField: Locator;
    private readonly addServicePriceBtn: Locator;
    private readonly removeServicePriceBtn: Locator;
    private readonly paymentSelect: Locator;
    private readonly shiftHoursSelect: Locator;
    private readonly selectOption: Locator;
    private readonly priceInputWrapper: Locator;
    private readonly servicesPriceSectionTitle: Locator;
    private readonly servicesPriceSectionClue: Locator;
    private readonly servicesPaymentMethodTitle: Locator;
    private readonly serviceNotFoundMsg: Locator;
    private readonly createNewServiceBtn: Locator;
    private readonly newServiceCharCount: Locator;

    constructor(page: Page) {
        this.page = page;
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
        this.mapZoomInBtn = this.page.locator("a[title='Zoom in']");
        this.mapZoomOutBtn = this.page.locator("a[title='Zoom out']");
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
        this.serviceInputTitle = this.page.locator("div[class*='ServicesUnitFlow_paragraph_']");
        this.serviceInputClue = this.page.getByTestId('add-info');
        this.serviceSearchInput = this.page.locator("div[class*='ServicesUnitFlow_searchInput_'] input");
        this.serviceSearchItem = this.page.getByTestId('searchItem-servicesUnitFlow');
        this.selectedServicesTitle = this.page.locator("div[class*='ServicesUnitFlow_paragraph_']").nth(1);
        this.selectedService = this.page.locator("div[class*='ServicesUnitFlow_service_']");
        this.serviceRemoveBtn = this.page.getByTestId('remove-servicesUnitFlow');
        this.minPriceInput = this.page.getByTestId('priceInput_RowUnitPrice').first();
        this.minPriceInputError = this.page.locator("div[class*='RowUnitPrice_error_']").first();
        this.minPriceInputTitle = this.page.locator("div[class*='PricesUnitFlow_paragraph_']").nth(1);
        this.currencyField = this.page.locator("input[class*='RowUnitPrice_currencyText_']");
        this.paymentSelect = this.page.getByTestId('div_CustomSelect').first();
        this.addServicePriceBtn = this.page.getByTestId('addPriceButton_ServicePrice');
        this.removeServicePriceBtn = this.page.getByTestId('div_removePrice_RowUnitPrice');
        this.shiftHoursSelect = this.page.getByTestId('div_CustomSelect').nth(1);
        this.selectOption = this.page.getByTestId('item-customSelect');
        this.priceInputWrapper = this.page.locator("div[class*='RowUnitPrice_inputWrapper_']").first();
        this.servicesPriceSectionTitle = this.page.locator("div[class*='PricesUnitFlow_paragraph_']").nth(2);
        this.servicesPriceSectionClue = this.page.locator("div[class*='PricesUnitFlow_description_']");
        this.servicesPaymentMethodTitle = this.page.locator("div[class*='PricesUnitFlow_paragraph_']").first();
        this.serviceNotFoundMsg = this.page.getByTestId('p2-notFound-addNewItem');
        this.createNewServiceBtn = this.page.getByTestId('btn-addNewItem');
        this.newServiceCharCount = this.page.locator("div[class*='AddNewItem_maxLength_']");
        this.serviceSearchInputWrapper = this.page.locator("div[class*='ServicesUnitFlow_searchResult_']");
    }

    async enterService(service: string, caseOption: 'uppercase' | 'lowercase' | 'paste' | 'default' = 'default') {
        let formattedService = service;

        if (caseOption == 'uppercase') {
            formattedService = service.toUpperCase();
        } else if (caseOption == 'lowercase') {
            formattedService = service.toLowerCase();
        } else if (caseOption == 'paste') {
            await this.page.evaluate(async (text) => {
                await navigator.clipboard.writeText(text);
            }, service);

            await this.serviceSearchInput.clear();
            await this.serviceSearchInput.click();
            await this.page.keyboard.press(process.platform === 'darwin' ? 'Meta+V' : 'Control+V');
            return
        }
        await this.serviceSearchInput.fill(formattedService);
    }

    async verifyServiceSearchResultsContainTerm(term: string) {
        const searchResults = await this.serviceSearchItem.all();

        for (const result of searchResults) {
            const searchText = await result.innerText();
            expect(searchText.toLowerCase()).toContain(term.toLowerCase());
        }
    }

    async selectServiceContainingText(service: string) {
        const searchItem = this.getServiceSearchResultByName(service);
        await searchItem.click();
    }

    getServiceSearchResultByName(name: string) {
        const searchItem = this.serviceSearchItem.locator('div', { hasText: name }).first();
        return searchItem
    }

    getServiceSearchResultByIndex(index: number) {
        const searchItem = this.serviceSearchItem.nth(index);
        return searchItem
    }

    async assertStatusIconInServiceSearchResult(service: string, statusIcon: 'selected' | 'not selected') {
        const searchItem = this.getServiceSearchResultByName(service);
        const plusIcon = searchItem.locator("~button svg[viewBox='0 0 14 14']");
        const checkmarkIcon = searchItem.locator("~ button svg[viewBox='0 0 15 12']");

        if (statusIcon == 'selected') {
            await expect(checkmarkIcon).toBeVisible();
        } else if (statusIcon == 'not selected') {
            await expect(plusIcon).toBeVisible();
        }
    }

    async clickCreateNewServiceBtn() {
        await this.createNewServiceBtn.click();
    }

    async verifyCreateNewServiceBtnContent() {
        const plusIcon = this.createNewServiceBtn.getByTestId("svg-plus-addNewItem");
        await expect(this.createNewServiceBtn).toHaveText("Створити послугу");
        await expect(plusIcon).toBeVisible();
    }

    async verifyServiceNotFoundMsg(service: string) {
        await expect(this.serviceNotFoundMsg).toHaveText(`На жаль, послугу “${service}“ не знайдено в нашій базі. Ви можете додати послугу в категорію “Користувацькі”:`);
    }

    async verifyServiceInputValue(value: string) {
        await expect(this.serviceSearchInput).toHaveValue(value);
    }

    async verifyServiceInputValueLength(length: number) {
        const inputValue = await this.serviceSearchInput.inputValue();
        expect(inputValue.length).toEqual(length);
    }

    async verifyNewServiceCharCount(count: string) {
        await expect(this.newServiceCharCount).toHaveText(`${count} / 100`);
    }

    async verifyServiceInputTitle() {
        await expect(this.serviceInputTitle).toHaveText("Знайдіть послуги, які надає Ваш технічний засіб *");
    }

    async verifyServiceSearchInputElements() {
        const searchIcon = this.serviceSearchInputWrapper.locator("svg[viewBox='0 0 18 18']");
        await expect(searchIcon).toBeVisible();
        await expect(this.serviceSearchInput).toHaveAttribute('placeholder', 'Наприклад: Рихлення грунту, буріння');
    }

    async assertServiceSearchInputErrorState(error: boolean = true) {
        if (error) {
            await expect(this.serviceSearchInputWrapper).toHaveCSS('border', "1px solid rgb(247, 56, 89)");
        } else if (!error) {
            await expect(this.serviceSearchInputWrapper).toHaveCSS('border', "1px solid rgb(229, 229, 229)");
        }
    }

    async enterMinimumPrice(price: string) {
        await this.minPriceInput.fill(price);
    }

    async verifyMinimumPriceInputValue(value: string) {
        const enteredValue: string = await this.minPriceInput.inputValue();
        const isEmpty: boolean = enteredValue == ""
        if (!isEmpty) {
            expect(enteredValue.length).toBeLessThanOrEqual(9);
        }
        expect(enteredValue).toEqual(value);
    }

    async verifyPaymentMethodOptions() {
        await expect(this.paymentSelect).toHaveText("Готівкою / на картку");
        await this.paymentSelect.click();
        const paymentOptions = await this.selectOption.all();

        for (let i = 0; i < paymentOptions.length; i++) {
            let currentOption = this.selectOption.nth(i);
            let optionContent: string = await currentOption.innerText();

            await currentOption.click();
            await expect(this.paymentSelect).toHaveText(optionContent);
            await this.paymentSelect.click();
        }
    }

    async verifyPaymentMethodTitle() {
        await expect(this.servicesPaymentMethodTitle).toHaveText("Спосіб оплати *");
    }

    async verifyMinimumPriceInputTitle() {
        await expect(this.minPriceInputTitle).toHaveText("Вартість мінімального замовлення *");
    }

    async verifyMinimumPriceInputPlaceholder() {
        await expect(this.minPriceInput).toHaveAttribute('placeholder', 'Наприклад, 1000');
    }

    async verifyServicesPriceSectionTitle() {
        await expect(this.servicesPriceSectionTitle).toHaveText("Вартість Ваших послуг *");
    }

    async verifyServicesPriceSectionClue() {
        await expect(this.servicesPriceSectionClue).toHaveText("За бажанням Ви можете додати вартість конкретних послуг, які надає технічний засіб");
    }

    async assertMinimumPriceErrorWithMsg(message: string) {
        await this.assertMinimumPriceInputErrorState();
        await expect(this.minPriceInputError).toHaveText(message);
    }

    async assertMinimumPriceErrorMsgNotVisible() {
        await this.assertMinimumPriceInputNormalState();
        await expect(this.minPriceInputError).not.toBeVisible();
    }

    async assertMinimumPriceInputErrorState() {
        await expect(this.priceInputWrapper).toHaveCSS('border', "1px solid rgb(247, 56, 89)");
    }

    async assertMinimumPriceInputNormalState() {
        await expect(this.priceInputWrapper).toHaveCSS('border', "1px solid rgb(229, 229, 229)");
    }

    async verifyCurrencyField() {
        await expect(this.currencyField).toHaveAttribute('value', 'UAH');
    }

    getServiceByName(name: string) {
        return this.page.locator("div[class*='ServicePrice_serviceWrapper_']", { hasText: name }).locator('..');
    }

    async assertPriceErorrMsgOnService(service: string, message: string) {
        const serviceElement = this.getServiceByName(service);
        const errorMsg = serviceElement.locator(this.minPriceInputError);
        const priceInputWrapper = serviceElement.locator(this.priceInputWrapper);
        await expect(priceInputWrapper).toHaveCSS('border', "1px solid rgb(247, 56, 89)");
        await expect(errorMsg).toHaveText(message);
    }

    async assertPriceErorrMsgOnServiceNotVisible(service: string) {
        const serviceElement = this.getServiceByName(service);
        const errorMsg = serviceElement.locator(this.minPriceInputError);
        await expect(errorMsg).not.toBeVisible();
    }

    async assertAddPriceBtnVisibilityOnService(service: string, visible: boolean = true) {
        const serviceElement = this.getServiceByName(service);
        const addPriceBtn = serviceElement.locator(this.addServicePriceBtn);
        const plusIcon = addPriceBtn.locator('svg');

        if (visible) {
            await expect(addPriceBtn).toBeVisible();
            await expect(addPriceBtn).toHaveText("Додати вартість");
            await expect(plusIcon).toBeVisible();
        }
        else if (!visible) {
            await expect(addPriceBtn).not.toBeVisible();
            await expect(plusIcon).not.toBeVisible();
        }
    }

    async verifyPriceInputPlaceholderOnService(service: string) {
        const serviceElement = this.getServiceByName(service);
        const priceInput = serviceElement.locator(this.minPriceInput);
        await expect(priceInput).toHaveAttribute('placeholder', 'Наприклад, 1000');
    }

    async verifyCurrencyFieldOnService(service: string) {
        const serviceElement = this.getServiceByName(service);
        const currencyField = serviceElement.locator(this.currencyField);
        await expect(currencyField).toHaveAttribute('value', 'UAH');
    }

    async verifyPriceInputValueOnService(service: string, value: string) {
        const serviceElement = this.getServiceByName(service);
        const priceInput = serviceElement.locator(this.minPriceInput);
        await expect(priceInput).toHaveValue(value);
    }

    async enterPriceForService(service: string, price: string) {
        const serviceElement = this.getServiceByName(service);
        const priceInput = serviceElement.locator(this.minPriceInput);
        await priceInput.fill(price);
    }

    async addPriceForService(service: string) {
        const serviceElement = this.getServiceByName(service);
        const addPriceBtn = serviceElement.locator(this.addServicePriceBtn);
        await addPriceBtn.click();
    }

    async removePriceFromService(service: string) {
        const serviceElement = this.getServiceByName(service);
        const removePriceBtn = serviceElement.locator(this.removeServicePriceBtn);
        await removePriceBtn.click();
    }

    async verifyRatesForService(service: string) {
        const serviceElement = this.getServiceByName(service);
        const rateSelect = serviceElement.locator(this.paymentSelect);
        const shiftHoursSelect = serviceElement.locator(this.shiftHoursSelect);

        await expect(rateSelect).toHaveText("година");
        await rateSelect.click();
        const rateOptions = await this.selectOption.all();

        for (let i = 0; i < rateOptions.length; i++) {
            let currentOption = this.selectOption.nth(i);
            let optionContent: string = await currentOption.innerText();

            await currentOption.click();

            if (optionContent == "Кілометр") {
                await expect(rateSelect).toHaveText(optionContent);
            }
            else {
                await expect(rateSelect).toHaveText(optionContent.toLowerCase());
            }

            if (optionContent == "Зміна") {
                await expect(shiftHoursSelect).toHaveText("8 год");
                await shiftHoursSelect.click();
                await this.selectOption.nth(1).click();
                await expect(shiftHoursSelect).toHaveText("4 год");
            }

            await rateSelect.click();
        }
    }

    getImageBlockByIndex(index: number) {
        return this.imageBlock.nth(index);
    }

    async uploadImagesToBlock(blockIndex: number, imageFiles: string[]) {
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            (this.getImageBlockByIndex(blockIndex)).click()
        ]);
        const filePaths = imageFiles.map(image => path.join(process.cwd(), 'data', 'files', 'images', image));
        await fileChooser.setFiles(filePaths);
    }

    async deleteImageFromBlock(blockIndex: number) {
        const imageBlock = this.getImageBlockByIndex(blockIndex);
        await imageBlock.hover();
        const deleteIcon = imageBlock.getByTestId('deleteImage');
        await deleteIcon.click();
    }

    async assertErrorPopupVisibility(visible: boolean = true) {
        if (visible) {
            await expect(this.errorPopup).toBeVisible();
        } else if (!visible) {
            await expect(this.errorPopup).not.toBeVisible();
        }
    }

    async assertErrorPopupContent(text: string) {
        await expect(this.errorPopupContent).toHaveText(text);
    }

    async assertErrorPopupTitle(text: string) {
        await expect(this.errorPopupTitle).toHaveText(text);
    }

    async clickErrorPopupOkBtn() {
        await this.errorPopupOkBtn.click();
    }

    async clickErrorPopupCloseBtn() {
        await this.errorPopupCloseBtn.click();
    }

    async dragAndDropImage(dragIndex: number, dropIndex: number) {
        const dragBlock = this.getImageBlockByIndex(dragIndex);
        const dropBlock = this.getImageBlockByIndex(dropIndex);

        await dragBlock.dragTo(dropBlock);
    }

    async getImageBlockSource(blockIndex: number) {
        const imageBlock = this.getImageBlockByIndex(blockIndex);

        const imageSrc = await imageBlock.locator('img').getAttribute('src');
        expect(imageSrc).not.toBe('');

        return imageSrc;
    }

    async verifyMainImageLabelVisible() {
        const firstImageBlock = this.getImageBlockByIndex(0);
        const mainImageLabel = firstImageBlock.locator("[data-testid='mainImageLabel']");

        await expect(mainImageLabel).toHaveText("Головне");
    }

    async verifyImageInBlock(blockIndex: number, imgSource: string | null) {
        const imageBlock = this.getImageBlockByIndex(blockIndex);

        const imageInBlock = await imageBlock.locator('img').getAttribute('src');
        expect(imageInBlock).toBe(imgSource);
    }

    getFirstCategoryByIndex(index: number) {
        return this.firstCategory.nth(index);
    }

    getSecondCategoryByIndex(index: number) {
        return this.secondCategory.nth(index);
    }

    getThirdCategoryByIndex(index: number) {
        return this.thirdCategory.nth(index);
    }

    async selectThirdCateogryAndVerify(index: number) {
        let thirdCategoryText: string = await this.getThirdCategoryByIndex(index).innerText();
        await this.getThirdCategoryByIndex(index).click();
        await expect(this.categorySelection).toHaveText(thirdCategoryText.toLowerCase());
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

    async zoomMap(zoom: 'in' | 'out') {
        if (zoom == 'in') {
            await this.mapZoomInBtn.click();
        } else if (zoom == 'out') {
            await this.mapZoomOutBtn.click();
        }
    }

    async clickMapPopupCloseBtn() {
        await this.mapCloseIcon.click();
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

    async clickManufacturerClearBtn() {
        await this.manufacturerInputClearBtn.click();
    }

    async clickManufacturerSearchItem() {
        await this.manufacturerSearchItem.nth(0).click();
    }

    async enterUnitName(title: string) {
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

    async verifyTextAreaCharCount(area: 'details' | 'description', count: number) {
        let enteredText: string = ""
        if (area == "details") {
            enteredText = await this.technicalDetailsInput.inputValue();
        }
        else if (area == "description") {
            enteredText = await this.descriptionInput.inputValue();
        }
        expect(enteredText.length).toEqual(count);
    }

    async assertCategorySelectionTitleText() {
        await expect(this.categorySelectionTitle).toHaveText("Категорія *");
    }

    async assertListingTitleInputTitleText() {
        await expect(this.listingTitleInputTitle).toHaveText("Назва оголошення *");
    }

    async verifyManufacturerInputElements() {
        await expect(this.manufacturerInputTitle).toHaveText("Виробник транспортного засобу *");
        await expect(this.manufacturerInput).toHaveAttribute("placeholder", "Введіть виробника транспортного засобу");
        await expect(this.manufacturerSearchIcon).toBeVisible();
    }

    async assertModelInputTitleText() {
        await expect(this.modelInputTitle).toHaveText("Назва моделі");
    }

    async assertTechnicalDetailsInputTitle() {
        await expect(this.technicalDetailsInputTitle).toHaveText("Технічні характеристики");
    }

    async assertDescriptionInputTitle() {
        await expect(this.descriptionInputTitle).toHaveText("Детальний опис");
    }

    async assertImageUploadTitle() {
        await expect(this.imageUploadTitle).toHaveText("Фото технічного засобу *");
    }

    async assertManufacturerSearhDropdownVisible() {
        await expect(this.manufacturerSearchDropdown).toBeVisible();
    }

    async assertUnitNameInputValue(value: string) {
        await expect(this.listingTitleInput).toHaveValue(value);
    }

    async assertManufacturerInputValue(value: string) {
        await expect(this.manufacturerInput).toHaveValue(value);
    }

    async assertModelInputValue(value: string) {
        await expect(this.modelNameInput).toHaveValue(value);
    }

    async assertTechnicalDetailsInputValue(value: string) {
        await expect(this.technicalDetailsInput).toHaveValue(value);
    }

    async assertDescriptionInputValue(value: string) {
        await expect(this.descriptionInput).toHaveValue(value);
    }

    async assertManufacturerSearchResultItem(result: string) {
        await expect(this.manufacturerSearchItem).toHaveText(result);
    }

    async assertSelectedManufacturer(manufacturer: string) {
        await expect(this.selectedManufacturer).toHaveText(manufacturer);
    }

    async assertCategorySelectErrorWithMsg(message: string) {
        await expect(this.categoryErrorMsg).toHaveText(message);
    }

    async assertUnitNameErrorWithMsg(message?: string, visible: boolean = true) {
        if (visible && message) {
            await expect(this.listingTitleErrorMsg).toHaveText(message);
        } else if (!visible) {
            await expect(this.listingTitleErrorMsg).not.toBeVisible();
        }
    }

    async assertManufacturerErrorWithMsg(message?: string, visible: boolean = true) {
        if (visible && message) {
            await expect(this.manufacturerErrorMsg).toHaveText(message);
        } else if (!visible) {
            await expect(this.manufacturerErrorMsg).not.toBeVisible();
        }
    }

    async assertModelNameErrorWithMsg(message?: string, visible: boolean = true) {
        if (visible && message) {
            await expect(this.modelNameErrorMsg).toHaveText(message);
        } else if (!visible) {
            await expect(this.modelNameErrorMsg).not.toBeVisible();
        }
    }

    async assertMapSelectionTitle() {
        await expect(this.mapSelectionTitle).toHaveText("Місце розташування технічного засобу *");
    }

    async verifySelectedLocation(label: 'location'|'placeholder', location?: string) {
        if (label == 'placeholder') {
            await expect(this.selectedLocationLabel).toHaveText("Виберіть на мапі");
        } else if (label == 'location' && location) {
            await expect(this.selectedLocationLabel).toHaveText(location);
        }
        
    }

    async assertMapSelectionErrorWithMsg(message: string) {
        await expect(this.mapSelectionError).toHaveText(message);
    }

    async assertMapPopupVisibility(visible: boolean = true) {
        if (visible) {
            await expect(this.mapPopup).toBeVisible();
        } else if (!visible) {
            await expect(this.mapPopup).not.toBeVisible();
        }
    }

    async assertMapPopupTitle() {
        await expect(this.mapPopupTitle).toHaveText("Техніка на мапі");
    }

    async assertDefaultLocationPreselected() {
        await this.mapPopup.waitFor();
        await expect(this.mapSelectedLocation).toHaveText("Київ, вулиця Володимирська 21/20 Україна, Київська область");
    }

    async assertCategoryPopupVisibility(visible: boolean = false) {
        if (visible) {
            await expect(this.categorySelectionPopup).toBeVisible();
        } else if (!visible) {
            await expect(this.categorySelectionPopup).not.toBeVisible();
        }
    }

    async assertManufacturerInputCharLimit(count: string) {
        await expect(this.manufacturerInputCharLimit).toHaveText(`${count} / 100`);
    }

    async assertManufacturerNotFound(manufacturer: string) {
        await expect(this.manufacturerNotFoundMsg).toHaveText(`На жаль, виробника “${manufacturer}“ не знайдено в нашій базі.` + " Щоб додати виробника - зв`яжіться із службою підтримки");
    }

    async assertImageUploadClueText() {
        await expect(this.imageUploadClueText).toHaveText("Додайте в оголошення від 1 до 12 фото технічного засобу розміром до 20 МВ у форматі .jpg, .jpeg, .png. Перше фото буде основним.");
    }

    async assertImageUploadClueErrorState() {
        await expect(this.imageUploadClueText).toHaveCSS('color', "rgb(247, 56, 89)");
    }

    async assertTotalNumberOfImageBlocks(number: number) {
        const imageBlocks = await this.imageBlock.all();
        expect(imageBlocks).toHaveLength(number);
    }

    async assertServiceSelectionClueText() {
        await expect(this.serviceInputClue).toHaveText("Додайте в оголошення принаймні 1 послугу");
    }

    async assertServiceSelectionClueErrorState() {
        await expect(this.serviceInputClue).toHaveCSS('color', "rgb(247, 56, 89)");
    }

    async assertSelectedServiceVisibility(service: string, visible: boolean = true) {
        const serviceText = this.selectedService.locator('div', { hasText: service });
        if (visible) {
            await expect(serviceText).toBeVisible();
        } else if (!visible) {
            await expect(serviceText).not.toBeVisible();
        }
    }

    async assertSelectedServicesTitleVisibility(visible: boolean = true) {
        if (visible) {
            await expect(this.selectedServicesTitle).toHaveText("Послуги, які надає технічний засіб:");
        } else if (!visible) {
            await expect(this.selectedServicesTitle).not.toBeVisible();
        }
    }

    async removeSelectedService(service: string) {
        const serviceElement = this.selectedService.locator('div', { hasText: service }).locator('..');
        const removeBtn = serviceElement.locator(this.serviceRemoveBtn);
        await removeBtn.click();
    }
}