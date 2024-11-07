import BasePage from './BasePage';
import { expect, Locator, Page } from '@playwright/test';

export default class MyUnitsPage extends BasePage {
    private readonly createUnitBtn: Locator;
    private readonly tabTitle: Locator;
    private readonly unitCard: Locator;
    private readonly unitTitle: Locator;
    private readonly editBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.createUnitBtn = this.page.getByTestId('addUnit');
        this.tabTitle = this.page.locator("button[id*='mui-p-']");
        this.unitCard = this.page.locator("div[class*='OwnerUnitCard_unitCard_']");
        this.unitTitle = this.page.locator("div[class*='OwnerUnitCard_name_']");
        this.editBtn = this.page.locator('button', { hasText: 'Редагувати' });
    }

    async clickCreateUnitBtn() {
        await this.createUnitBtn.click();
    }

    getTabTitleByIndex(index: number) {
        return this.tabTitle.nth(index);
    }

    getUnitByTitle(title: string) {
        const unitCard = this.unitCard.filter({ has: this.unitTitle.filter({ hasText: title }) });
        return unitCard
    }

    async assertUnitWithNameVisible(title: string, visible: boolean = true) {
        const unitCard = this.getUnitByTitle(title);

        if (visible) {
            await expect(unitCard).toBeVisible();
        } else if (!visible) {
            await expect(unitCard).not.toBeVisible();
        }
    }

    async clickEditBtnOnUnit(title: string) {
        const unitCard = this.getUnitByTitle(title);
        const editBtn = unitCard.locator(this.editBtn);

        await editBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
}