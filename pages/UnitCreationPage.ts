import BasePage from './BasePage';
import { expect, Locator, Page } from '@playwright/test';
import { elementsText } from '../helpers/jsonHelper';
import { StaticData } from '../data/StaticData';

export default class UnitCreationPage extends BasePage {
    private readonly unitCreationFormTitle: Locator;
    private readonly nextBtn: Locator;
    private readonly prevBtn: Locator;
    private readonly cancelBtn: Locator;
    private readonly tabTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.unitCreationFormTitle = this.page.locator("div[class*='CreateEditFlowLayout_title_']");
        this.nextBtn = this.page.locator('button', { hasText: "Далі" });
        this.prevBtn = this.page.locator('button', { hasText: "Назад" });
        this.cancelBtn = this.page.locator('button', { hasText: "Скасувати" });
        this.tabTitle = this.page.locator("button[id*='mui-p-']");
    }

    async clickNextBtn() {
        await this.nextBtn.click();
    }

    async clickPrevBtn() {
        await this.prevBtn.click();
    }

    async verifyCancelBtn() {
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.cancelBtn.click({ noWaitAfter: true });
        const dialog = await dialogPromise;
        expect(dialog.message()).toContain(StaticData.dialogConfirmExit);
        await dialog.accept();
        expect(this.page).toHaveURL("/owner-units-page/");
    }

    async assertUnitCreationFormTitle() {
        expect(this.unitCreationFormTitle).toHaveText(elementsText.unitCreationPage.unitCreationFormTitle);
    }

    getTabTitleByIndex(index: number) {
        return this.tabTitle.nth(index);
    }

    async verifySelectedTabIsHighlighted(tabNumber: number) {
        for (let i = 0; i < 4; i++) {
            if (i == tabNumber) {
                expect(this.getTabTitleByIndex(i)).toHaveAttribute('aria-selected', 'true');
            }
            else {
                expect(this.getTabTitleByIndex(i)).toHaveAttribute('aria-selected', 'false');
            }
        }
    }

    async verifyTabsText() {
        await expect(this.getTabTitleByIndex(0)).toHaveText(elementsText.unitCreationPage.generalInfoTab);
        await expect(this.getTabTitleByIndex(1)).toHaveText(elementsText.unitCreationPage.photoTab);
        await expect(this.getTabTitleByIndex(2)).toHaveText(elementsText.unitCreationPage.servicesTab);
        await expect(this.getTabTitleByIndex(3)).toHaveText(elementsText.unitCreationPage.priceTab);
        await expect(this.getTabTitleByIndex(4)).toHaveText(elementsText.unitCreationPage.contactsTab);
    }
}