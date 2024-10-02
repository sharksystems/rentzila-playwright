import { test } from '../fixtures';
import { ErrorMessages } from '../data/ErrorMessages';
import { StaticData } from '../data/StaticData';
import { expect } from '@playwright/test';


test.describe('Smoke Test', () => {

  test('C214 - Verify Footer Links', async ({ homePage, footerElements, headerElements, unitListingsPage, privacyPolicyPage, cookiesPolicyPage, termsOfServicePage, tendersPage, jobRequestsPage }) => {
    await footerElements.assertFooterElementsVisible();

    await footerElements.clickPrivacyPolicyLink();
    await privacyPolicyPage.assertUserIsOnPrivacyPolicyPage();
    await footerElements.clickCookiesPolicyLink();
    await cookiesPolicyPage.assertUserIsOnCookiesPolicyPage();

    await footerElements.clickTermsOfServiceLink();
    await termsOfServicePage.assertUserIsOnTermsOfServicePage();

    await footerElements.clickFooterListingsLink();
    await unitListingsPage.assertUserIsOnUnitListingsPage();
    await headerElements.clickSiteLogo();

    await footerElements.clickFooterTendersLink();
    await tendersPage.assertUserIsOnTendersPage();
    await headerElements.clickSiteLogo();

    await footerElements.clickFooterJobRequestsLink();
    await jobRequestsPage.assertUserIsOnJobRequestsPage();
  });
  test('C226 - Verify Callback Request Form', async ({ homePage, randomData, apiHelper }) => {
    await homePage.clickFormSubmitBtn();
    await homePage.assertNameErrorVisibleWithText(ErrorMessages.fieldEmpty);
    await homePage.assertPhoneErrorVisibleWithText(ErrorMessages.fieldEmpty);

    await homePage.enterName(StaticData.name);
    await homePage.assertNameInputErrorStateNotVisible();
    await homePage.assertPhoneErrorVisibleWithText(ErrorMessages.fieldEmpty);

    await homePage.clickPhoneInputField();
    await homePage.assertPhoneNumberExtentionPrefilled();
    await homePage.enterPhoneNumber(StaticData.phone);
    await homePage.enterName("");
    await homePage.clickFormSubmitBtn();
    await homePage.assertNameErrorVisibleWithText(ErrorMessages.fieldEmpty);
    await homePage.assertPhoneInputErrorStateNotVisible();

    await homePage.enterName(randomData.getRandomName);
    await homePage.enterPhoneNumber(StaticData.invalidPhone);
    await homePage.clickFormSubmitBtn();
    await homePage.assertNameInputErrorStateNotVisible();
    await homePage.assertPhoneErrorVisibleWithText(ErrorMessages.phoneInvalid);

    await homePage.enterPhoneNumber(StaticData.invalidPhone2);
    await homePage.clickFormSubmitBtn();
    await homePage.assertNameInputErrorStateNotVisible();
    await homePage.assertPhoneErrorVisibleWithText(ErrorMessages.phoneInvalid);

    await homePage.enterPhoneNumber(randomData.getRandomPhone);
    await homePage.verifyContactFormSuccessMsg();

    let accessToken = await apiHelper.createAdminAccessToken();
    let submission = await apiHelper.getCallBackFormSubmission(accessToken, randomData.getRandomName, randomData.getRandomPhone);
    expect(submission.name).toEqual(randomData.getRandomName);
    expect(submission.phone).toEqual(randomData.getRandomPhone);
    apiHelper.deleteCallbackFormSubmission(accessToken, submission.id)
  });

});