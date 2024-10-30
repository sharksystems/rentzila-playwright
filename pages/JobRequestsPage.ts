import BasePage from './BasePage';
import { Page } from '@playwright/test';

export default class JobRequestsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    
    async assertUserIsOnJobRequestsPage() {
        await this.assertURLContains("/requests-map");
    }
}