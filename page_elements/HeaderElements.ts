import { expect, Locator, Page } from '@playwright/test';

export default class HeaderElements {
    protected page: Page;
    private readonly headerLogo: Locator;
    private readonly loginBtn: Locator;
    private readonly userProfilePicture: Locator;
    private readonly userProfileDropdown: Locator;
    private readonly userDropdownEmail: Locator;
    private readonly userDropdownMyProfileBtn: Locator;
    private readonly userDropdownLogoutBtn: Locator;
    private readonly userDropdownMyUnitsBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerLogo = this.page.getByTestId('logo').first();
        this.loginBtn = this.page.locator("[class*='NavbarAuthBlock_buttonEnter_']");
        this.userProfilePicture = this.page.getByTestId('avatarBlock');
        this.userProfileDropdown = this.page.locator("div[class*='ProfileDropdownMenu_container_']");;
        this.userDropdownEmail = this.page.locator("div[class*='ProfileDropdownMenu_email_']");
        this.userDropdownMyProfileBtn = this.page.getByTestId('profile');
        this.userDropdownLogoutBtn = this.page.getByTestId('logout');
        this.userDropdownMyUnitsBtn = this.page.getByTestId('units');
    }

    async clickLoginBtn() {
        await this.loginBtn.click()
    }
    async clickUserProfilePicture() {
        await this.userProfilePicture.click();
    }
    async clickMyProfileBtn() {
        await this.userDropdownMyProfileBtn.click();
    }
    async clickLogoutBtn() {
        await this.userDropdownLogoutBtn.click();
    }
    async clickMyUnitsBtn() {
        await this.userDropdownMyUnitsBtn.click()
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
        await expect(this.userProfileDropdown).toBeVisible();
    }
    async assertUserEmailIsDisplayed(email: string) {
        await expect(this.userDropdownEmail).toHaveText(email);
    }

    async clickSiteLogo() {
        await this.headerLogo.click();
    }
}
