import BasePage from './BasePage';
import { expect, Page } from '@playwright/test';
import { categoryMap } from '../data/CategoryMap';

export default class SingleUnitPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private categoryNameBreadcrumb = this.page.locator("span[data-testid='secondCategorySpan']");

    async assertServiceTagVisible(service: string) {
        const serviceTag = this.page.locator("div[class*='UnitCharacteristics_service_']", { hasText: service });
        await expect(serviceTag).toBeVisible();
    }
    async assertEqupmentCategoryVisible(category: string) {
        const expectedText = categoryMap[category] || category;
        await expect(this.categoryNameBreadcrumb).toHaveText(expectedText);
    }
}