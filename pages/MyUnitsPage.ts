import BasePage from './BasePage';
import { Page } from '@playwright/test';


export default class MyUnitsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private createUnitBtn = this.page.getByTestId('addUnit');

    async clickCreateUnitBtn() {
        await this.createUnitBtn.click();
    }
}