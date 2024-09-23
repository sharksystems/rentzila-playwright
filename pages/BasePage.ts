import { expect, Page } from '@playwright/test';

export default class BasePage {
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
    private footerLogo() { return this.page.getByTestId('logo').nth(1); }
    private privacyPolicyLink() { return this.page.getByTestId('politika-konfidenciinosti'); }
    private cookiesPolicyLink() { return this.page.getByTestId('pravila-vikoristannya-failiv-cookie'); }
    private termsOfServiceLink() { return this.page.getByTestId('umovi-dostupu-ta-koristuvannya'); }
    private footerListingsLink() { return this.page.locator("a[href='/products/']").nth(1); }
    private footerTendersLink() { return this.page.locator("a[href='/tenders-map/']").nth(1); }
    private footerJobRequestsLink() { return this.page.locator("a[href='/requests-map/']").nth(1); }
    private footerEmailLink() { return this.page.locator("a[href='mailto:info@rentzila.com.ua']"); }

    async clickSiteLogo() {
        await this.headerLogo().click()
    }
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
    async goToProfile() {
        await this.clickUserProfilePicture();
        await this.clickMyProfileBtn();
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
    async clickPrivacyPolicyLink() {
        await this.privacyPolicyLink().click();
    }
    async clickCookiesPolicyLink() {
        await this.cookiesPolicyLink().click();
    }
    async clickTermsOfServiceLink() {
        await this.termsOfServiceLink().click();
    }
    async clickFooterListingsLink() {
        await this.footerListingsLink().click();
    }
    async clickFooterTendersLink() {
        await this.footerTendersLink().click();
    }
    async clickFooterJobRequestsLink() {
        await this.footerJobRequestsLink().click();
    }

    async assertFooterElementsVisible() {
        await this.footerLogo().scrollIntoViewIfNeeded();
        expect(this.footerLogo()).toBeVisible();
        expect(this.privacyPolicyLink()).toBeVisible();
        expect(this.cookiesPolicyLink()).toBeVisible();
        expect(this.termsOfServiceLink()).toBeVisible();
        expect(this.footerListingsLink()).toBeVisible();
        expect(this.footerTendersLink()).toBeVisible();
        expect(this.footerJobRequestsLink()).toBeVisible();
        expect(this.footerEmailLink()).toBeEnabled();
    }
    async open(path: string = '/') {
        await this.page.goto(path);
    }
    async assertURLContains(expectedPath: string) {
        await expect(this.page).toHaveURL(new RegExp(expectedPath));
    }
}