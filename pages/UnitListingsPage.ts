import BasePage from './BasePage';
import { expect, Page } from '@playwright/test';
import { categoryMap } from '../data/CategoryMap';

export default class UnitListingsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private productListing = this.page.locator("a[data-testid='link']").first();
    private selectedFilter = this.page.locator("div[class*='ResetFilters_selectedCategory_']");
    private selectedEquipmentSecondCategory = this.page.locator("div[data-testid*='namesBlock']:has(img[class*='SecondCategory_rotate_'])");
    private selectedEqupmentThirdCategory = this.page.locator("label[class*='ThirdCategory_active_label_']");
    private civilEngineerEquipmentDropdown = this.page.locator("label[for='category3'] ~ span")
    private farmingEquipmentDropdown = this.page.locator("label[for='category2'] ~ div[data-testid='arrowWrapper']")

    async assertUserIsOnUnitListingsPage() {
        await this.assertURLContains("/products");
    }
    async assertFilterSelectedWithName(category: string) {
        const expectedText = categoryMap[category] || category;
        await expect(this.selectedFilter).toHaveText(expectedText);
    }
    async verifyCheckboxVisible(category: string) {
        await this.page.waitForLoadState("domcontentloaded");
        const checkboxLabel = this.page.locator('label', { hasText: category });
        const labelVisible = await checkboxLabel.isVisible();
        return labelVisible;
    }
    async verifyCheckboxChecked(category: string) {
        const checkboxLabel = this.page.locator('label', { hasText: category });

        const checkboxId = await checkboxLabel.getAttribute('for');
        const checkboxLocator = this.page.locator(`input[id="${checkboxId}"]`);

        const isChecked = await checkboxLocator.isChecked();
        expect(isChecked).toBe(true);
    }
    async verifyEquipmentCategoryisSelected(mainCategory: string, category: string) {
        await this.page.waitForLoadState("domcontentloaded");

        const farmingCategories = ["Сівалки", "Трактори", "Обприскувачі"];

        if (mainCategory === "СІЛЬСЬКОГОСПОДАРСЬКА" || farmingCategories.includes(category)) {
            await this.civilEngineerEquipmentDropdown.click();
            await this.farmingEquipmentDropdown.click();

            const expectedText = categoryMap[category] || category;
            await expect(this.selectedEqupmentThirdCategory).toHaveText(expectedText);
        } else {
            const expectedText = categoryMap[category] || category;
            await expect(this.selectedEquipmentSecondCategory).toHaveText(expectedText);
        }
    }
    async clickProductListing() {
        await this.productListing.waitFor();
        await this.page.waitForTimeout(700);
        await this.productListing.click();
    }
}
