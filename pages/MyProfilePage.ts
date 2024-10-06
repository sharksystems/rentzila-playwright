import BasePage from './BasePage';
import { expect, Locator, Page } from '@playwright/test';


export default class MyProfilePage extends BasePage {
    private readonly phoneNumberField: Locator;
    private readonly phoneVerificationStatus: Locator;

    constructor(page: Page) {
        super(page);
        this.phoneNumberField = this.page.locator("#mobile[class*='OwnerProfileNumber_input_']");
        this.phoneVerificationStatus = this.page.getByTestId("verification_OwnerProfileNumber");
    }

    async assertPhoneVerificationStatus(status: string) {
        expect(this.phoneVerificationStatus).toHaveText(status);
    }
    async assertUserPhonePrefilledAndVerified(phone: string) {
        expect(this.phoneNumberField).toHaveValue(phone);
        await this.assertPhoneVerificationStatus("Успішно верифіковано");
    }
}