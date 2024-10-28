import BasePage from './BasePage';
import { Page } from '@playwright/test';

export default class TermsOfServicePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    
    async assertUserIsOnTermsOfServicePage() {
        await this.assertURLContains("/terms-conditions");
    }
}