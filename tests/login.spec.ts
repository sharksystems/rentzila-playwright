import { test } from '../fixtures';
import { ErrorMessages } from '../data/ErrorMessages';

test.describe('Login Tests', () => {
    test('Login with email or password missing', async ({ homePage, loginData, loginPopup }) => {
        await homePage.clickLoginBtn();

        await loginPopup.clickLoginSubmitBtn();
        await loginPopup.assertLoginPopupVisible();
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.FIELD_EMPTY);
        await loginPopup.assertPasswordErrorVisibleWithText(ErrorMessages.FIELD_EMPTY);

        await loginPopup.enterEmailOrPhone(loginData.getValidEmail);
        await loginPopup.clickLoginSubmitBtn();
        await loginPopup.assertEmailOrPhoneInputErrorStateNotVisible();
        await loginPopup.assertPasswordErrorVisibleWithText(ErrorMessages.FIELD_EMPTY);

        await loginPopup.enterEmailOrPhone("");
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.FIELD_EMPTY);
        await loginPopup.enterPassword(loginData.getValidPassword);
        await loginPopup.assertPasswordInputErrorStateNotVisible();
        await loginPopup.clickLoginSubmitBtn();
        await loginPopup.assertLoginPopupVisible();
    });
    test('Login with valid email and password', async ({ homePage, loginData, loginPopup }) => {
        await homePage.clickLoginBtn();
        await loginPopup.enterEmailOrPhone(loginData.getValidEmail);
        await loginPopup.enterPassword(loginData.getValidPassword);
        await loginPopup.verifyPasswordVisibility();
        await loginPopup.clickLoginSubmitBtn();

        await homePage.clickUserProfilePicture();
        await homePage.assertUserDropdownVisible();
        await homePage.assertUserEmailIsDisplayed(loginData.getValidEmail);
    });
    test('Login with valid phone number and password', async ({ homePage, loginData, loginPopup, myProfilePage }) => {
        await homePage.clickLoginBtn();
        await loginPopup.login(loginData.getValidPhoneNumber, loginData.getValidPassword);
        await homePage.goToProfile();
        await myProfilePage.assertUserPhonePrefilledAndVerified(loginData.phoneWithSpaces);
        await myProfilePage.logout();

        await homePage.clickLoginBtn();
        await loginPopup.login(loginData.phoneWithoutPlus, loginData.getValidPassword);
        await homePage.goToProfile();
        await myProfilePage.assertUserPhonePrefilledAndVerified(loginData.phoneWithSpaces);
        await myProfilePage.logout();

        await homePage.clickLoginBtn();
        await loginPopup.login(loginData.phoneWithoutCountryCode, loginData.getValidPassword);
        await homePage.goToProfile();
        await myProfilePage.assertUserPhonePrefilledAndVerified(loginData.phoneWithSpaces);
    });
    test('Login with invalid email', async ({ homePage, loginData, randomData, loginPopup }) => {
        await homePage.clickLoginBtn();

        await loginPopup.login(loginData.emailWithSpace, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.EMAIL_OR_PHONE_INVALID_FORMAT);
        await loginPopup.login(loginData.emailInCyrillic, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.EMAIL_OR_PHONE_INVALID_FORMAT);
        await loginPopup.login(loginData.emailWithoutAt, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.EMAIL_OR_PHONE_INVALID_FORMAT);
        await loginPopup.login(loginData.emailWithoutDot, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.EMAIL_OR_PHONE_INVALID_FORMAT);
        await loginPopup.login(loginData.emailWithoutDomain, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.EMAIL_OR_PHONE_INVALID_FORMAT);
        await loginPopup.login(loginData.emailWithoutProvider, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.EMAIL_OR_PHONE_INVALID_FORMAT);
        await loginPopup.login(loginData.emailWithDoubleAt, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.EMAIL_OR_PHONE_INVALID_FORMAT);

        await loginPopup.login(randomData.getRandomEmail, loginData.getValidPassword);
        await loginPopup.assertLoginCredentialsErrorMsg(ErrorMessages.WRONG_EMAIL_OR_PASSWORD);
    });
    test('Login with invalid phone number', async ({ homePage, loginData, randomData, loginPopup }) => {
        await homePage.clickLoginBtn();

        await loginPopup.login(loginData.phoneWithoutExtention, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.EMAIL_OR_PHONE_INVALID_FORMAT);
        await loginPopup.login(loginData.phoneWithoutLastDigit, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.EMAIL_OR_PHONE_INVALID_FORMAT);
        await loginPopup.login(loginData.phoneWithDashes, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.EMAIL_OR_PHONE_INVALID_FORMAT);
        await loginPopup.login(loginData.phoneWithSpaces, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.EMAIL_OR_PHONE_INVALID_FORMAT);
        await loginPopup.login(loginData.phoneWithBrackets, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.EMAIL_OR_PHONE_INVALID_FORMAT);
        await loginPopup.login(loginData.phoneWithoutCountryCodeWithBrackets, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.EMAIL_OR_PHONE_INVALID_FORMAT);
        await loginPopup.login(loginData.phoneWithElevenNumbers, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.EMAIL_OR_PHONE_INVALID_FORMAT);
        await loginPopup.login(loginData.phoneWithDifferentCountryCode, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.EMAIL_OR_PHONE_INVALID_FORMAT);
        await loginPopup.login(loginData.phoneWithout38, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.EMAIL_OR_PHONE_INVALID_FORMAT);

        await loginPopup.login(randomData.getRandomPhone, loginData.getValidPassword);
        await loginPopup.assertLoginCredentialsErrorMsg(ErrorMessages.WRONG_PHONE_OR_PASSWORD);
    });
    test('Login with invalid password', async ({ page, homePage, loginData, randomData, loginPopup }) => {
        await homePage.clickLoginBtn();

        await loginPopup.login(loginData.getValidEmail, loginData.passwordWithLeadingSpace);
        await loginPopup.assertPasswordErrorVisibleWithText(ErrorMessages.PASSWORD_INVALID_FORMAT);
        await loginPopup.login(loginData.getValidEmail, loginData.passwordWithTrailingSpace);
        await loginPopup.assertPasswordErrorVisibleWithText(ErrorMessages.PASSWORD_INVALID_FORMAT);
        await loginPopup.login(loginData.getValidEmail, loginData.passwordWithoutLowercase);
        await loginPopup.assertPasswordErrorVisibleWithText(ErrorMessages.PASSWORD_INVALID_FORMAT);
        await loginPopup.login(loginData.getValidEmail, loginData.passwordWithoutUppercase);
        await loginPopup.assertPasswordErrorVisibleWithText(ErrorMessages.PASSWORD_INVALID_FORMAT);
        await loginPopup.login(loginData.getValidEmail, loginData.passwordInCyrillic);
        await loginPopup.assertPasswordErrorVisibleWithText(ErrorMessages.PASSWORD_INVALID_FORMAT);

        await loginPopup.login(loginData.getValidEmail, randomData.getRandomPassword);
        await loginPopup.assertLoginCredentialsErrorMsg(ErrorMessages.WRONG_EMAIL_OR_PASSWORD);
    });
});
