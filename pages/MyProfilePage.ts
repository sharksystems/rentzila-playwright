import BasePage from './BasePage';
import { expect, Page } from '@playwright/test';


export default class MyProfilePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private phoneNumberField = this.page.locator("#mobile[class*='OwnerProfileNumber_input_']");
    private phoneVerificationStatus = this.page.getByTestId("verification_OwnerProfileNumber");

    async assertPhoneVerificationStatus(status: string) {
        expect(this.phoneVerificationStatus).toHaveText(status);
    }
    async assertUserPhonePrefilledAndVerified(phone: string) {
        expect(this.phoneNumberField).toHaveValue(phone);
        await this.assertPhoneVerificationStatus("Успішно верифіковано");
    }
}