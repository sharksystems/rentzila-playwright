import { expect, Page } from '@playwright/test';

export default class HeaderElements {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private headerLogo() { return this.page.getByTestId('logo').first(); }
    private loginBtn() { return this.page.locator("[class*='NavbarAuthBlock_buttonEnter_']"); }
    private userProfilePicture() { return this.page.getByTestId('avatarBlock'); }
    private userProfileDropdown() { return this.page.locator("div[class*='ProfileDropdownMenu_container_']"); }
    private userDropdownEmail() { return this.page.locator("div[class*='ProfileDropdownMenu_email_']"); }
    private userDropdownMyProfileBtn() { return this.page.getByTestId('profile'); }
    private userDropdownLogoutBtn() { return this.page.getByTestId('logout'); }
    private userDropdownMyUnitsBtn() { return this.page.getByTestId('units'); }
    
    async clickLoginBtn() {
        await this.loginBtn().click()
    }
    async clickUserProfilePicture() {
        await this.userProfilePicture().click()
    }
    async clickMyProfileBtn() {
        await this.userDropdownMyProfileBtn().click()
    }
    async clickLogoutBtn() {
        await this.userDropdownLogoutBtn().click()
    }
    async clickMyUnitsBtn() {
        await this.userDropdownMyUnitsBtn().click()
    }
    async goToProfile() {
        await this.clickUserProfilePicture();
        await this.clickMyProfileBtn();
    }
    async goToMyUnits() {
        await this.clickUserProfilePicture();
        await this.clickMyUnitsBtn();
    }
    async logout() {
        await this.clickUserProfilePicture();
        await this.clickLogoutBtn();
    }
    async assertUserDropdownVisible() {
        await expect(this.userProfileDropdown()).toBeVisible();
    }
    async assertUserEmailIsDisplayed(email: string) {
        await expect(this.userDropdownEmail()).toHaveText(email);
    }

    async clickSiteLogo() {
        await this.headerLogo().click()
    }
}