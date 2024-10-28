import BasePage from './BasePage';
import { Locator, Page } from '@playwright/test';

export default class MyUnitsPage extends BasePage {
    private readonly createUnitBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.createUnitBtn = this.page.getByTestId('addUnit');
    }

    async clickCreateUnitBtn() {
        await this.createUnitBtn.click();
    }
}