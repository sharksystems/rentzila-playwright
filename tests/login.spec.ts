import { test } from '../fixtures';
import { ErrorMessages } from '../data/ErrorMessages';

test.describe('Login Tests', () => {
    test.beforeEach(async ({ homePage, headerElements }) => {
        await headerElements.clickLoginBtn();
    });
    
    test('C200.1 - Login with email missing', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.clickLoginSubmitBtn();
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.fieldEmpty);
        await loginPopup.assertPasswordErrorVisibleWithText(ErrorMessages.fieldEmpty);
        await loginPopup.enterPassword(loginData.getValidPassword);
        await loginPopup.assertPasswordInputErrorStateNotVisible();
        await loginPopup.clickLoginSubmitBtn();
        await loginPopup.assertLoginPopupVisible();
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.fieldEmpty);
    });
    test('C200.2 - Login with password missing', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.enterEmailOrPhone(loginData.getValidEmail);
        await loginPopup.clickLoginSubmitBtn();
        await loginPopup.assertEmailOrPhoneInputErrorStateNotVisible();
        await loginPopup.assertPasswordErrorVisibleWithText(ErrorMessages.fieldEmpty);
    });
    test('C200.3 - Login with email and password missing', async ({ homePage, loginPopup }) => {
        await loginPopup.clickLoginSubmitBtn();
        await loginPopup.assertLoginPopupVisible();
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.fieldEmpty);
        await loginPopup.assertPasswordErrorVisibleWithText(ErrorMessages.fieldEmpty);
    });

    test('C201 - Login with valid email and password', async ({ homePage, headerElements, loginData, loginPopup }) => {
        await loginPopup.enterEmailOrPhone(loginData.getValidEmail);
        await loginPopup.enterPassword(loginData.getValidPassword);
        await loginPopup.verifyPasswordVisibility();
        await loginPopup.clickLoginSubmitBtn();

        await headerElements.clickUserProfilePicture();
        await headerElements.assertUserDropdownVisible();
        await headerElements.assertUserEmailIsDisplayed(loginData.getValidEmail);
    });

    test('C202.1 - Login using valid phone number and password', async ({ homePage, headerElements, loginData, loginPopup, myProfilePage }) => {
        await loginPopup.login(loginData.getValidPhoneNumber, loginData.getValidPassword);
        await headerElements.goToProfile();
        await myProfilePage.assertUserPhonePrefilledAndVerified(loginData.phoneWithSpaces);
        await headerElements.logout();
    });
    test('C202.2 - Login using valid phone number (without "+") and password', async ({ homePage, headerElements, loginData, loginPopup, myProfilePage }) => {
        await loginPopup.login(loginData.phoneWithoutPlus, loginData.getValidPassword);
        await headerElements.goToProfile();
        await myProfilePage.assertUserPhonePrefilledAndVerified(loginData.phoneWithSpaces);
    });
    test('C202.3 - Login using valid phone number (without "+38") and password', async ({ homePage, headerElements, loginData, loginPopup, myProfilePage }) => {
        await loginPopup.login(loginData.phoneWithoutCountryCode, loginData.getValidPassword);
        await headerElements.goToProfile();
        await myProfilePage.assertUserPhonePrefilledAndVerified(loginData.phoneWithSpaces);
    });

    test('C207.1 - Login with unregistered phone number', async ({ homePage, loginData, randomData, loginPopup }) => {
        await loginPopup.login(randomData.getRandomPhone, loginData.getValidPassword);
        await loginPopup.assertLoginCredentialsErrorMsg(ErrorMessages.wrongPhoneOrPassword);
    });
    test('C207.2 - Login using phone number without extention', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.login(loginData.phoneWithoutExtention, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.emailOrPhoneInvalidFormat);
    });
    test('C207.3 - Login using phone number without last digit', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.login(loginData.phoneWithoutLastDigit, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.emailOrPhoneInvalidFormat);
    });
    test('C207.4 - Login using phone number with dashes', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.login(loginData.phoneWithDashes, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.emailOrPhoneInvalidFormat);
    });
    test('C207.5 - Login using phone number with spaces', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.login(loginData.phoneWithSpaces, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.emailOrPhoneInvalidFormat);
    });
    test('C207.6 - Login using phone number with brackets', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.login(loginData.phoneWithBrackets, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.emailOrPhoneInvalidFormat);
    });
    test('C207.7 - Login using phone number without country code and with brackets', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.login(loginData.phoneWithoutCountryCodeWithBrackets, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.emailOrPhoneInvalidFormat);
    });
    test('C207.8 - Login using phone number with eleven digits', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.login(loginData.phoneWithElevenNumbers, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.emailOrPhoneInvalidFormat);
    });
    test('C207.9 - Login using phone number with a different country code', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.login(loginData.phoneWithDifferentCountryCode, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.emailOrPhoneInvalidFormat);
    });
    test('C207.10 - Login using phone number without "38"', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.login(loginData.phoneWithout38, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.emailOrPhoneInvalidFormat);
    });

    test('576.1 - Login with an unregistered email', async ({ homePage, loginData, randomData, loginPopup }) => {
        await loginPopup.login(randomData.getRandomEmail, loginData.getValidPassword);
        await loginPopup.assertLoginCredentialsErrorMsg(ErrorMessages.wrongEmailOrPassword);
    });
    test('576.2 - Login using email with a space', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.login(loginData.emailWithSpace, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.emailOrPhoneInvalidFormat);
    });
    test('576.3 - Login using email in cyrillic', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.login(loginData.emailInCyrillic, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.emailOrPhoneInvalidFormat);
    });
    test('576.4 - Login using email without "@"', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.login(loginData.emailWithoutAt, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.emailOrPhoneInvalidFormat);
    });
    test('576.5 - Login using email without a dot', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.login(loginData.emailWithoutDot, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.emailOrPhoneInvalidFormat);
    });
    test('576.6 - Login using email without a domain', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.login(loginData.emailWithoutDomain, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.emailOrPhoneInvalidFormat);
    });
    test('576.7 - Login using email without a provider', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.login(loginData.emailWithoutProvider, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.emailOrPhoneInvalidFormat);
    });
    test('576.8 - Login using email with an extra "@"', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.login(loginData.emailWithDoubleAt, loginData.getValidPassword);
        await loginPopup.assertEmailOrPhoneErrorVisibleWithText(ErrorMessages.emailOrPhoneInvalidFormat);
    });

    test('577.1 - Login with a wrong password', async ({ homePage, loginData, randomData, loginPopup }) => {
        await loginPopup.login(loginData.getValidEmail, randomData.getRandomPassword);
        await loginPopup.assertLoginCredentialsErrorMsg(ErrorMessages.wrongEmailOrPassword);
    });
    test('577.2 - Login using password with a leading space', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.login(loginData.getValidEmail, loginData.passwordWithLeadingSpace);
        await loginPopup.assertPasswordErrorVisibleWithText(ErrorMessages.passwordInvalidFormat);
    });
    test('577.3 - Login using password with a trailing space', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.login(loginData.getValidEmail, loginData.passwordWithTrailingSpace);
        await loginPopup.assertPasswordErrorVisibleWithText(ErrorMessages.passwordInvalidFormat);
    });
    test('577.4 - Login using password without lowercase letters', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.login(loginData.getValidEmail, loginData.passwordWithoutLowercase);
        await loginPopup.assertPasswordErrorVisibleWithText(ErrorMessages.passwordInvalidFormat);
    });
    test('577.5 - Login using password without uppercase letters', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.login(loginData.getValidEmail, loginData.passwordWithoutUppercase);
        await loginPopup.assertPasswordErrorVisibleWithText(ErrorMessages.passwordInvalidFormat);
    });
    test('577.6 - Login using password in cyrillic', async ({ homePage, loginData, loginPopup }) => {
        await loginPopup.login(loginData.getValidEmail, loginData.passwordInCyrillic);
        await loginPopup.assertPasswordErrorVisibleWithText(ErrorMessages.passwordInvalidFormat);
    });
});
