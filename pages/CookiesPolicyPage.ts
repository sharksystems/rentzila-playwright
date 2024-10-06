import BasePage from './BasePage';
import { Page } from '@playwright/test';

export default class CookiesPolicyPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    async assertUserIsOnCookiesPolicyPage() {
        await this.assertURLContains("/cookie-policy");
    }
}