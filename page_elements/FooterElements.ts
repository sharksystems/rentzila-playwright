import { expect, Locator, Page } from '@playwright/test';

export default class FooterElements {
    protected page: Page;
    private readonly footerLogo: Locator;
    private readonly privacyPolicyLink: Locator;
    private readonly cookiesPolicyLink: Locator;
    private readonly termsOfServiceLink: Locator;
    private readonly footerListingsLink: Locator;
    private readonly footerTendersLink: Locator;
    private readonly footerJobRequestsLink: Locator;
    private readonly footerEmailLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.footerLogo = this.page.getByTestId('logo').nth(1);
        this.privacyPolicyLink = this.page.getByTestId('politika-konfidenciinosti');;
        this.cookiesPolicyLink = this.page.getByTestId('pravila-vikoristannya-failiv-cookie')
        this.termsOfServiceLink = this.page.getByTestId('umovi-dostupu-ta-koristuvannya');
        this.footerListingsLink = this.page.locator("a[href='/products/']").nth(1);
        this.footerTendersLink = this.page.locator("a[href='/tenders-map/']").nth(1);
        this.footerJobRequestsLink = this.page.locator("a[href='/requests-map/']").nth(1);
        this.footerEmailLink = this.page.locator("a[href='mailto:info@rentzila.com.ua']");
    }

    async clickPrivacyPolicyLink() {
        await this.privacyPolicyLink.click();
    }
    async clickCookiesPolicyLink() {
        await this.cookiesPolicyLink.click();
    }
    async clickTermsOfServiceLink() {
        await this.termsOfServiceLink.click();
    }
    async clickFooterListingsLink() {
        await this.footerListingsLink.click();
    }
    async clickFooterTendersLink() {
        await this.footerTendersLink.click();
    }
    async clickFooterJobRequestsLink() {
        await this.footerJobRequestsLink.click();
    }

    async assertFooterElementsVisible() {
        await this.footerLogo.scrollIntoViewIfNeeded();
        expect(this.footerLogo).toBeVisible();
        expect(this.privacyPolicyLink).toBeVisible();
        expect(this.cookiesPolicyLink).toBeVisible();
        expect(this.termsOfServiceLink).toBeVisible();
        expect(this.footerListingsLink).toBeVisible();
        expect(this.footerTendersLink).toBeVisible();
        expect(this.footerJobRequestsLink).toBeVisible();
        expect(this.footerEmailLink).toBeEnabled();
    }
}