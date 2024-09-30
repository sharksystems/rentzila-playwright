import { expect, Page } from '@playwright/test';

export default class FooterElements {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private footerLogo() { return this.page.getByTestId('logo').nth(1); }
    private privacyPolicyLink() { return this.page.getByTestId('politika-konfidenciinosti'); }
    private cookiesPolicyLink() { return this.page.getByTestId('pravila-vikoristannya-failiv-cookie'); }
    private termsOfServiceLink() { return this.page.getByTestId('umovi-dostupu-ta-koristuvannya'); }
    private footerListingsLink() { return this.page.locator("a[href='/products/']").nth(1); }
    private footerTendersLink() { return this.page.locator("a[href='/tenders-map/']").nth(1); }
    private footerJobRequestsLink() { return this.page.locator("a[href='/requests-map/']").nth(1); }
    private footerEmailLink() { return this.page.locator("a[href='mailto:info@rentzila.com.ua']"); }

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
}