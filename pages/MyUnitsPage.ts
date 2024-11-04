import BasePage from './BasePage';
import { expect, Locator, Page } from '@playwright/test';

export default class MyUnitsPage extends BasePage {
    private readonly createUnitBtn: Locator;
    private readonly tabTitle: Locator;
    private readonly unitCard: Locator;
    private readonly unitTitle: Locator;

    constructor(page: Page) {
        super(page);

        this.createUnitBtn = this.page.getByTestId('addUnit');
        this.tabTitle = this.page.locator("button[id*='mui-p-']");
        this.unitCard = this.page.locator("a[class*='OwnerUnitCard_container_']");
        this.unitTitle = this.page.locator("div[class*='OwnerUnitCard_name_']");
    }

    async clickCreateUnitBtn() {
        await this.createUnitBtn.click();
    }

    getTabTitleByIndex(index: number) {
        return this.tabTitle.nth(index);
    }

    async assertUnitWithNameVisible (name: string) {
        const unitCard = this.unitCard.filter({has: this.unitTitle.filter({hasText: name})});
        expect(unitCard).toBeVisible();
    }
}