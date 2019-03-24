/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LanguageComponentsPage, LanguageDeleteDialog, LanguageUpdatePage } from './language.page-object';

const expect = chai.expect;

describe('Language e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let languageUpdatePage: LanguageUpdatePage;
    let languageComponentsPage: LanguageComponentsPage;
    let languageDeleteDialog: LanguageDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Languages', async () => {
        await navBarPage.goToEntity('language');
        languageComponentsPage = new LanguageComponentsPage();
        await browser.wait(ec.visibilityOf(languageComponentsPage.title), 5000);
        expect(await languageComponentsPage.getTitle()).to.eq('Languages');
    });

    it('should load create Language page', async () => {
        await languageComponentsPage.clickOnCreateButton();
        languageUpdatePage = new LanguageUpdatePage();
        expect(await languageUpdatePage.getPageTitle()).to.eq('Create or edit a Language');
        await languageUpdatePage.cancel();
    });

    it('should create and save Languages', async () => {
        const nbButtonsBeforeCreate = await languageComponentsPage.countDeleteButtons();

        await languageComponentsPage.clickOnCreateButton();
        await promise.all([languageUpdatePage.setEnglishNameInput('englishName')]);
        expect(await languageUpdatePage.getEnglishNameInput()).to.eq('englishName');
        await languageUpdatePage.save();
        expect(await languageUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await languageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Language', async () => {
        const nbButtonsBeforeDelete = await languageComponentsPage.countDeleteButtons();
        await languageComponentsPage.clickOnLastDeleteButton();

        languageDeleteDialog = new LanguageDeleteDialog();
        expect(await languageDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Language?');
        await languageDeleteDialog.clickOnConfirmButton();

        expect(await languageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
