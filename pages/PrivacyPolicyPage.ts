import BasePage from './BasePage';
import { Page } from '@playwright/test';

export default class PrivacyPolicyPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    async assertUserIsOnPrivacyPolicyPage() {
        await this.assertURLContains("/privacy-policy");
    }
}