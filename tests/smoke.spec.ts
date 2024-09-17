import { test } from '../fixtures';
import { ErrorMessages } from '../data/ErrorMessages';
import { StaticData } from '../data/StaticData';
import { expect } from '@playwright/test';


test.describe('Smoke Test', () => {

  test('Verify Footer Links', async ({ homePage, unitListingsPage, privacyPolicyPage, cookiesPolicyPage, termsOfServicePage, tendersPage, jobRequestsPage }) => {
    await homePage.assertFooterElementsVisible();

    await homePage.clickPrivacyPolicyLink();
    await privacyPolicyPage.assertUserIsOnPrivacyPolicyPage();
    await privacyPolicyPage.clickCookiesPolicyLink();
    await cookiesPolicyPage.assertUserIsOnCookiesPolicyPage();

    await cookiesPolicyPage.clickTermsOfServiceLink();
    await termsOfServicePage.assertUserIsOnTermsOfServicePage();

    await termsOfServicePage.clickFooterListingsLink();
    await unitListingsPage.assertUserIsOnUnitListingsPage();
    await unitListingsPage.clickSiteLogo();

    await homePage.clickFooterTendersLink();
    await tendersPage.assertUserIsOnTendersPage();
    await tendersPage.clickSiteLogo();

    await homePage.clickFooterJobRequestsLink();
    await jobRequestsPage.assertUserIsOnJobRequestsPage();
  });
  test('Verify Callback Request Form', async ({ homePage, randomData, apiHelper }) => {
    await homePage.clickFormSubmitBtn();
    await homePage.assertNameInputErrorStateVisible();
    await homePage.assertPhoneInputErrorStateVisible();
    await homePage.assertNameErrorMsgVisible(ErrorMessages.FIELD_EMPTY);
    await homePage.assertPhoneErrorMsgVisible(ErrorMessages.FIELD_EMPTY);

    await homePage.enterName(StaticData.NAME);
    await homePage.assertNameInputErrorStateNotVisible();
    await homePage.assertPhoneInputErrorStateVisible();

    await homePage.clickPhoneInputField();
    await homePage.assertPhoneNumberExtentionPrefilled();
    await homePage.enterPhoneNumber(StaticData.PHONE);
    await homePage.enterName("");
    await homePage.clickFormSubmitBtn();
    await homePage.assertNameInputErrorStateVisible();
    await homePage.assertPhoneInputErrorStateNotVisible();

    await homePage.enterName(randomData.getRandomName);
    await homePage.enterPhoneNumber(StaticData.INVALID_PHONE_1);
    await homePage.clickFormSubmitBtn();
    await homePage.assertNameInputErrorStateNotVisible();
    await homePage.assertPhoneInputErrorStateVisible();
    await homePage.assertPhoneErrorMsgVisible(ErrorMessages.PHONE_INVALID);

    await homePage.enterPhoneNumber(StaticData.INVALID_PHONE_2);
    await homePage.clickFormSubmitBtn();
    await homePage.assertNameInputErrorStateNotVisible();
    await homePage.assertPhoneInputErrorStateVisible();
    await homePage.assertPhoneErrorMsgVisible(ErrorMessages.PHONE_INVALID);

    await homePage.enterPhoneNumber(randomData.getRandomPhone);
    await homePage.verifyContactFormSuccessMsg();

    let accessToken = await apiHelper.createAdminAccessToken();
    let submission = await apiHelper.getCallBackFormSubmission(accessToken, randomData.getRandomName, randomData.getRandomPhone);
    expect(submission.name).toEqual(randomData.getRandomName);
    expect(submission.phone).toEqual(randomData.getRandomPhone);
    apiHelper.deleteCallbackFormSubmission(accessToken, submission.id)
  });

});