/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DietTypeComponentsPage, DietTypeDeleteDialog, DietTypeUpdatePage } from './diet-type.page-object';

const expect = chai.expect;

describe('DietType e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let dietTypeUpdatePage: DietTypeUpdatePage;
    let dietTypeComponentsPage: DietTypeComponentsPage;
    let dietTypeDeleteDialog: DietTypeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load DietTypes', async () => {
        await navBarPage.goToEntity('diet-type');
        dietTypeComponentsPage = new DietTypeComponentsPage();
        await browser.wait(ec.visibilityOf(dietTypeComponentsPage.title), 5000);
        expect(await dietTypeComponentsPage.getTitle()).to.eq('Diet Types');
    });

    it('should load create DietType page', async () => {
        await dietTypeComponentsPage.clickOnCreateButton();
        dietTypeUpdatePage = new DietTypeUpdatePage();
        expect(await dietTypeUpdatePage.getPageTitle()).to.eq('Create or edit a Diet Type');
        await dietTypeUpdatePage.cancel();
    });

    it('should create and save DietTypes', async () => {
        const nbButtonsBeforeCreate = await dietTypeComponentsPage.countDeleteButtons();

        await dietTypeComponentsPage.clickOnCreateButton();
        await promise.all([dietTypeUpdatePage.setNamePolishInput('namePolish'), dietTypeUpdatePage.setNameEnglishInput('nameEnglish')]);
        expect(await dietTypeUpdatePage.getNamePolishInput()).to.eq('namePolish');
        expect(await dietTypeUpdatePage.getNameEnglishInput()).to.eq('nameEnglish');
        await dietTypeUpdatePage.save();
        expect(await dietTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await dietTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last DietType', async () => {
        const nbButtonsBeforeDelete = await dietTypeComponentsPage.countDeleteButtons();
        await dietTypeComponentsPage.clickOnLastDeleteButton();

        dietTypeDeleteDialog = new DietTypeDeleteDialog();
        expect(await dietTypeDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Diet Type?');
        await dietTypeDeleteDialog.clickOnConfirmButton();

        expect(await dietTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
