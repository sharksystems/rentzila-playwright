import BasePage from './BasePage';
import { expect, Page } from '@playwright/test';


export default class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private servicesTabs = this.page.locator('div[data-testid*="services_"]')
    private serviceItems = this.page.locator('div[data-testid*="service_"]')
    private equipmentTabs = this.page.locator('h3[data-testid*="specialEquipment_"]');
    private equipmentItems = this.page.locator('div[data-testid*="category_"]');
    private nameInput = this.page.locator("input[name='name']");
    private phoneNumberInput = this.page.locator('#mobile');
    private submitBtn = this.page.locator("button[type='submit']");
    private phoneInputErrorMsg = this.page.locator('#mobile~p');
    private nameInputErrorMsg = this.page.locator("input[name='name']~p");
    private nameInputErrorState = this.page.locator("input[name='name'][class*='ConsultationForm_error_']")
    private phoneInputErrorState = this.page.locator("#mobile[class*='ConsultationForm_error_']");

    async clickFormSubmitBtn() {
        await this.submitBtn.click();
    }
    async assertNameInputErrorStateVisible() {
        expect(this.nameInputErrorState).toBeVisible();
    }
    async assertPhoneInputErrorStateVisible() {
        expect(this.phoneInputErrorState).toBeVisible();
    }
    async assertNameInputErrorStateNotVisible() {
        expect(this.nameInputErrorState).not.toBeVisible();
    }
    async assertPhoneInputErrorStateNotVisible() {
        expect(this.phoneInputErrorState).not.toBeVisible();
    }
    async assertNameErrorMsgVisible(message: string) {
        expect(this.nameInputErrorMsg).toHaveText(message);
    }
    async assertPhoneErrorMsgVisible(message: string) {
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