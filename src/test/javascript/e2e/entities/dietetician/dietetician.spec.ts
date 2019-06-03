/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DieteticianComponentsPage, DieteticianDeleteDialog, DieteticianUpdatePage } from './dietetician.page-object';

const expect = chai.expect;

describe('Dietetician e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let dieteticianUpdatePage: DieteticianUpdatePage;
    let dieteticianComponentsPage: DieteticianComponentsPage;
    let dieteticianDeleteDialog: DieteticianDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Dieteticians', async () => {
        await navBarPage.goToEntity('dietetician');
        dieteticianComponentsPage = new DieteticianComponentsPage();
        await browser.wait(ec.visibilityOf(dieteticianComponentsPage.title), 5000);
        expect(await dieteticianComponentsPage.getTitle()).to.eq('Dieteticians');
    });

    it('should load create Dietetician page', async () => {
        await dieteticianComponentsPage.clickOnCreateButton();
        dieteticianUpdatePage = new DieteticianUpdatePage();
        expect(await dieteticianUpdatePage.getPageTitle()).to.eq('Create or edit a Dietetician');
        await dieteticianUpdatePage.cancel();
    });

    it('should create and save Dieteticians', async () => {
        const nbButtonsBeforeCreate = await dieteticianComponentsPage.countDeleteButtons();

        await dieteticianComponentsPage.clickOnCreateButton();
        await promise.all([dieteticianUpdatePage.setUserIdInput('5')]);
        expect(await dieteticianUpdatePage.getUserIdInput()).to.eq('5');
        await dieteticianUpdatePage.save();
        expect(await dieteticianUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await dieteticianComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Dietetician', async () => {
        const nbButtonsBeforeDelete = await dieteticianComponentsPage.countDeleteButtons();
        await dieteticianComponentsPage.clickOnLastDeleteButton();

        dieteticianDeleteDialog = new DieteticianDeleteDialog();
        expect(await dieteticianDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Dietetician?');
        await dieteticianDeleteDialog.clickOnConfirmButton();

        expect(await dieteticianComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
