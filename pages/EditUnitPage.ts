import BasePage from './BasePage';
import { expect, Locator, Page } from '@playwright/test';
import { elementsText } from '../helpers/jsonHelper';

export default class EditUnitPage extends BasePage {
    private readonly editSubmitBtn: Locator;
    private readonly editSuccessMsgTitle: Locator;
    private readonly editSuccessMsg: Locator;
    private readonly goToUnitsBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.editSubmitBtn = this.page.locator("button", { hasText: 'Зберегти' });
        this.editSuccessMsgTitle = this.page.locator("div[class*='SuccessfullyCreatedPage_finishTitle_']");
        this.editSuccessMsg = this.page.locator("div[class*='SuccessfullyCreatedPage_finishText2_']");
        this.goToUnitsBtn = this.page.locator("button", { hasText: 'Переглянути в моїх оголошеннях' });
    }

    async clickEditSubmitBtn() {
        await this.page.waitForLoadState('networkidle');
        await this.editSubmitBtn.click();
    }

    async clickGoToUnitsBtn() {
        await this.goToUnitsBtn.click();
    }

    async verifyEditSuccessMsgTitle() {
        await expect(this.editSuccessMsgTitle).toHaveText(elementsText.unitEditing.editSuccessMsgTitle);
    }

    async verifyEditSuccessMsg() {
        await expect(this.editSuccessMsg).toHaveText(elementsText.unitEditing.editSuccessMsg);
    }
}