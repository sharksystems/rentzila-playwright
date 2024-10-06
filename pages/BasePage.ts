import { expect, Page } from '@playwright/test';

export default class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open(path: string = '/') {
        await this.page.goto(path);
    }
    async assertURLContains(expectedPath: string) {
        await expect(this.page).toHaveURL(new RegExp(expectedPath));
    }
}