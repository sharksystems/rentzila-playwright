import { expect, Page } from '@playwright/test';

export default class LoginPopup {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private emailOrPhoneNumberField() { return this.page.locator('#email'); }
    private passwordField() { return this.page.locator('#password'); }
    private emailOrPhoneNumberErrorState() { return this.page.locator("#email[class*='CustomReactHookInput_error_input_']") }
    private passwordErrorState() { return this.page.locator("#password[class*='CustomReactHookInput_error_input_']") }
    private emailOrPhoneErrorMsg() { return this.page.locator("div[class*='CustomReactHookInput_input_wrapper_']:has(#email)~p"); }
    private passwordErrorMsg() { return this.page.locator("div[class*='CustomReactHookInput_input_wrapper_']:has(#password)~p"); }
    private loginSubmitBtn() { return this.page.locator("button[class*='ItemButtons_darkBlueRoundBtn_']").first(); }
    private loginPopup() { return this.page.getByTestId('authorizationContainer'); }
    private showPasswordBtn() { return this.page.locator("div[class*='CustomReactHookInput_icon_']") }
    private loginCredentialsErrorMsg() { return this.page.getByTestId('errorMessage'); }

    async enterEmailOrPhone(value: string) {
        await this.emailOrPhoneNumberField().fill(value);
    }
    async enterPassword(password: string) {
        await this.passwordField().fill(password);
    }
    async login(login: string, password: string) {
        await this.enterEmailOrPhone(login);
        await this.enterPassword(password);
        await this.clickLoginSubmitBtn();
    }

    async verifyPasswordVisibility() {
        await this.showPasswordBtn().click();
        await expect(this.passwordField()).toHaveAttribute('type', 'text');
        await this.showPasswordBtn().click();
        await expect(this.passwordField()).toHaveAttribute('type', 'password');
    }

    async assertLoginCredentialsErrorMsg(message: string) {
        await expect(this.loginCredentialsErrorMsg()).toHaveText(message);
    }
    async assertEmailOrPhoneInputErrorStateNotVisible() {
        await expect(this.emailOrPhoneNumberErrorState()).not.toBeVisible();
    }
    async assertPasswordInputErrorStateNotVisible() {
        await expect(this.passwordErrorState()).not.toBeVisible();
    }
    async assertEmailOrPhoneErrorVisibleWithText(message: string) {
        await expect(this.emailOrPhoneNumberErrorState()).toBeVisible();
        await expect(this.emailOrPhoneErrorMsg()).toHaveText(message);
    }
    async assertPasswordErrorVisibleWithText(message: string) {
        await expect(this.passwordErrorState()).toBeVisible();
        await expect(this.passwordErrorMsg()).toHaveText(message);
    }
    async assertLoginPopupVisible() {
        await expect(this.loginPopup()).toBeVisible();
    }

    async clickLoginSubmitBtn() {
        await this.loginSubmitBtn().click();
    }
}