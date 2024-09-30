import { Page } from '@playwright/test';

export default class HeaderElements {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private headerLogo() { return this.page.getByTestId('logo').first(); }

    async clickSiteLogo() {
        await this.headerLogo().click()
    }
}