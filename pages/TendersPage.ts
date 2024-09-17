import BasePage from './BasePage';
import { Page } from '@playwright/test';

export default class TendersPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    async assertUserIsOnTendersPage() {
        await this.assertURLContains("/tenders-map");
    }
}