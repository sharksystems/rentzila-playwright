import BasePage from './BasePage';
import { expect, Locator, Page } from '@playwright/test';


export default class HomePage extends BasePage {
    private readonly servicesTabs: Locator;
    private readonly serviceItems: Locator;
    private readonly equipmentTabs: Locator;
    private readonly equipmentItems: Locator;
    private readonly nameInput: Locator;
    private readonly phoneNumberInput: Locator;
    private readonly submitBtn: Locator;
    private readonly phoneInputErrorMsg: Locator;
    private readonly nameInputErrorMsg: Locator;
    private readonly nameInputErrorState: Locator;
    private readonly phoneInputErrorState: Locator;

    constructor(page: Page) {
        super(page);
        this.servicesTabs = this.page.locator('div[data-testid*="services_"]');
        this.serviceItems = this.page.locator('div[data-testid*="service_"]');
        this.equipmentTabs = this.page.locator('h3[data-testid*="specialEquipment_"]');
        this.equipmentItems = this.page.locator('div[data-testid*="category_"]');
        this.nameInput = this.page.locator("input[name='name']");
        this.phoneNumberInput = this.page.locator('#mobile');
        this.submitBtn = this.page.locator("button[type='submit']");
        this.phoneInputErrorMsg = this.page.locator('#mobile~p');
        this.nameInputErrorMsg = this.page.locator("input[name='name']~p");
        this.nameInputErrorState = this.page.locator("input[name='name'][class*='ConsultationForm_error_']");
        this.phoneInputErrorState = this.page.locator("#mobile[class*='ConsultationForm_error_']");
    }

    async clickFormSubmitBtn() {
        await this.submitBtn.click();
    }
    async assertNameInputErrorStateNotVisible() {
        expect(this.nameInputErrorState).not.toBeVisible();
    }
    async assertPhoneInputErrorStateNotVisible() {
        expect(this.phoneInputErrorState).not.toBeVisible();
    }
    async assertNameErrorVisibleWithText(message: string) {
        expect(this.nameInputErrorState).toBeVisible();
        expect(this.nameInputErrorMsg).toHaveText(message);
    }
    async assertPhoneErrorVisibleWithText(message: string) {
        expect(this.phoneInputErrorState).toBeVisible();
        expect(this.phoneInputErrorMsg).toHaveText(message);
    }
    async clickPhoneInputField() {
        await this.phoneNumberInput.click();
    }
    async assertPhoneNumberExtentionPrefilled() {
        expect(this.phoneNumberInput).toHaveValue("+380");
    }
    async enterName(name: string) {
        await this.nameInput.clear();
        await this.nameInput.fill(name);
    }
    async enterPhoneNumber(name: string) {
        await this.phoneNumberInput.clear();
        await this.phoneNumberInput.fill(name);
    }
    async verifyContactFormSuccessMsg() {
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.clickFormSubmitBtn();
        const dialog = await dialogPromise;
        expect(dialog.message()).toContain('Ви успішно відправили заявку');
        await dialog.accept();
    }

    async getServicesTabByNumber(number: number) {
        const servicesTab = this.servicesTabs.nth(number)
        return servicesTab
    }
    async getServiceByNumber(number: number) {
        const service = this.serviceItems.nth(number)
        return service
    }
    async getEquipmentTabByNumber(number: number) {
        const equipmentTab = this.equipmentTabs.nth(number)
        return equipmentTab
    }
    async getEquipmentItemByNumber(number: number) {
        const equipmentItem = this.equipmentItems.nth(number)
        return equipmentItem
    }
    async assertNumberOfServices(number: number = 7) {
        const services = await this.serviceItems.all()
        expect(services).toHaveLength(number)
    }
    async assertNumberOfEquipment(number: number = 7) {
        const equipment = await this.equipmentItems.all()
        expect(equipment).toHaveLength(number)
    }
}