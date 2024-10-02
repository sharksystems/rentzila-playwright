import { expect, Locator, Page } from '@playwright/test';

export default class LoginPopup {
    protected page: Page;
    private readonly emailOrPhoneNumberField: Locator;
    private readonly passwordField: Locator;
    private readonly emailOrPhoneNumberErrorState: Locator;
    private readonly passwordErrorState: Locator;
    private readonly emailOrPhoneErrorMsg: Locator;
    private readonly passwordErrorMsg: Locator;
    private readonly loginSubmitBtn: Locator;
    private readonly loginPopup: Locator;
    private readonly showPasswordBtn: Locator;
    private readonly loginCredentialsErrorMsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailOrPhoneNumberField = this.page.locator('#email');
        this.passwordField = this.page.locator('#password');
        this.emailOrPhoneNumberErrorState = this.page.locator("#email[class*='CustomReactHookInput_error_input_']");
        this.passwordErrorState = this.page.locator("#password[class*='CustomReactHookInput_error_input_']");
        this.emailOrPhoneErrorMsg = this.page.locator("div[class*='CustomReactHookInput_input_wrapper_']:has(#email)~p");
        this.passwordErrorMsg = this.page.locator("div[class*='CustomReactHookInput_input_wrapper_']:has(#password)~p");
        this.loginSubmitBtn = this.page.locator("button[class*='ItemButtons_darkBlueRoundBtn_']").first();
        this.loginPopup = this.page.getByTestId('authorizationContainer');
        this.showPasswordBtn = this.page.locator("div[class*='CustomReactHookInput_icon_']");
        this.loginCredentialsErrorMsg = this.page.getByTestId('errorMessage');
    }

    async enterEmailOrPhone(value: string) {
        await this.emailOrPhoneNumberField.fill(value);
    }
    async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }
    async login(login: string, password: string) {
        await this.enterEmailOrPhone(login);
        await this.enterPassword(password);
        await this.clickLoginSubmitBtn();
    }

    async verifyPasswordVisibility() {
        await this.showPasswordBtn.click();
        await expect(this.passwordField).toHaveAttribute('type', 'text');
        await this.showPasswordBtn.click();
        await expect(this.passwordField).toHaveAttribute('type', 'password');
    }
    async assertLoginCredentialsErrorMsg(message: string) {
        await expect(this.loginCredentialsErrorMsg).toHaveText(message);
    }
    async assertEmailOrPhoneInputErrorStateNotVisible() {
        await expect(this.emailOrPhoneNumberErrorState).not.toBeVisible();
    }
    async assertPasswordInputErrorStateNotVisible() {
        await expect(this.passwordErrorState).not.toBeVisible();
    }
    async assertEmailOrPhoneErrorVisibleWithText(message: string) {
        await expect(this.emailOrPhoneNumberErrorState).toBeVisible();
        await expect(this.emailOrPhoneErrorMsg).toHaveText(message);
    }
    async assertPasswordErrorVisibleWithText(message: string) {
        await expect(this.passwordErrorState).toBeVisible();
        await expect(this.passwordErrorMsg).toHaveText(message);
    }
    async assertLoginPopupVisible() {
        await expect(this.loginPopup).toBeVisible();
    }
    async clickLoginSubmitBtn() {
        await this.loginSubmitBtn.click();
    }
}