import {browser, element, by, ExpectedConditions as ec} from 'protractor';

import {NavBarPage, SignInPage} from '../page-objects/jhi-page-objects';

const expect = chai.expect;

describe('administration', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage(true);
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.adminMenu), 5000);
    });

    beforeEach(async () => {
        await navBarPage.clickOnAdminMenu();
    });

    it('should load user management', async () => {
        await navBarPage.clickOnUserManagement();
        const expect1 = 'Users';
        const value1 = await element(by.id('user-management-page-heading')).getText();
        expect(value1).to.eq(expect1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
