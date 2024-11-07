import { test as baseTest, request, APIRequestContext, Page } from '@playwright/test';
import HomePage from './pages/HomePage';
import UnitListingsPage from './pages/UnitListingsPage';
import SingleUnitPage from './pages/SingleUnitPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiesPolicyPage from './pages/CookiesPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import TendersPage from './pages/TendersPage';
import JobRequestsPage from './pages/JobRequestsPage';
import RandomData from './data/RandomData';
import { ApiHelper } from './helpers/ApiHelper';
import closePopupIfVisible from './helpers/popupHelper';
import LoginPopup from './page_elements/LoginPopup';
import LoginData from './data/LoginData';
import MyProfilePage from './pages/MyProfilePage';
import HeaderElements from './page_elements/headerElements';
import FooterElements from './page_elements/footerElements';
import MyUnitsPage from './pages/MyUnitsPage';
import UnitCreationPage from './pages/UnitCreationPage';
import UnitCreationForm from './page_elements/UnitCreationForm';
import EditUnitPage from './pages/EditUnitPage';

type TestFixtures = {
    page: Page;
    apiHelper: ApiHelper;
    homePage: HomePage;
    unitListingsPage: UnitListingsPage;
    singleUnitPage: SingleUnitPage;
    privacyPolicyPage: PrivacyPolicyPage;
    cookiesPolicyPage: CookiesPolicyPage;
    termsOfServicePage: TermsOfServicePage;
    tendersPage: TendersPage;
    jobRequestsPage: JobRequestsPage;
    randomData: RandomData;
    loginData: LoginData;
    loginPopup: LoginPopup;
    myProfilePage: MyProfilePage;
    headerElements: HeaderElements;
    footerElements: FooterElements;
    myUnitsPage: MyUnitsPage;
    unitCreationPage: UnitCreationPage;
    unitCreationForm: UnitCreationForm;
    editUnitPage: EditUnitPage;
};

export const test = baseTest.extend<TestFixtures>({

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.open();
        await closePopupIfVisible(page);
        await use(homePage);
    },

    apiHelper: async ({ }, use) => {
        const apiRequestContext: APIRequestContext = await request.newContext();
        const apiHelper = new ApiHelper(apiRequestContext);
        await use(apiHelper);
    },

    headerElements: async ({ page }, use) => {
        const headerElements = new HeaderElements(page);
        await use(headerElements);
    },

    footerElements: async ({ page }, use) => {
        const footerElements = new FooterElements(page);
        await use(footerElements);
    },

    unitListingsPage: async ({ page }, use) => {
        const unitListingsPage = new UnitListingsPage(page);
        await use(unitListingsPage);
    },

    singleUnitPage: async ({ page }, use) => {
        const singleUnitPage = new SingleUnitPage(page);
        await use(singleUnitPage);
    },

    privacyPolicyPage: async ({ page }, use) => {
        const privacyPolicyPage = new PrivacyPolicyPage(page);
        await use(privacyPolicyPage);
    },

    cookiesPolicyPage: async ({ page }, use) => {
        const cookiesPolicyPage = new CookiesPolicyPage(page);
        await use(cookiesPolicyPage);
    },

    termsOfServicePage: async ({ page }, use) => {
        const termsOfServicePage = new TermsOfServicePage(page);
        await use(termsOfServicePage);
    },

    tendersPage: async ({ page }, use) => {
        const tendersPage = new TendersPage(page);
        await use(tendersPage);
    },

    jobRequestsPage: async ({ page }, use) => {
        const jobRequestsPage = new JobRequestsPage(page);
        await use(jobRequestsPage);
    },

    randomData: async ({ }, use) => {
        const randomData = new RandomData();
        await use(randomData);
    },

    loginData: async ({ }, use) => {
        const loginData = new LoginData();
        await use(loginData);
    },

    loginPopup: async ({ page }, use) => {
        const loginPopup = new LoginPopup(page);
        await use(loginPopup);
    },

    myProfilePage: async ({ page }, use) => {
        const myProfilePage = new MyProfilePage(page);
        await use(myProfilePage);
    },

    myUnitsPage: async ({ page }, use) => {
        const myUnitsPage = new MyUnitsPage(page);
        await use(myUnitsPage);
    },

    unitCreationPage: async ({ page }, use) => {
        const unitCreationPage = new UnitCreationPage(page);
        await use(unitCreationPage);
    },

    unitCreationForm: async ({ page }, use) => {
        const unitCreationForm = new UnitCreationForm(page);
        await use(unitCreationForm);
    },

    editUnitPage: async ({ page }, use) => {
        const editUnitPage = new EditUnitPage(page);
        await use(editUnitPage);
    },
});
