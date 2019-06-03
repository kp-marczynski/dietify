/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PatientCardComponentsPage, PatientCardDeleteDialog, PatientCardUpdatePage } from './patient-card.page-object';

const expect = chai.expect;

describe('PatientCard e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let patientCardUpdatePage: PatientCardUpdatePage;
    let patientCardComponentsPage: PatientCardComponentsPage;
    /*let patientCardDeleteDialog: PatientCardDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load PatientCards', async () => {
        await navBarPage.goToEntity('patient-card');
        patientCardComponentsPage = new PatientCardComponentsPage();
        await browser.wait(ec.visibilityOf(patientCardComponentsPage.title), 5000);
        expect(await patientCardComponentsPage.getTitle()).to.eq('Patient Cards');
    });

    it('should load create PatientCard page', async () => {
        await patientCardComponentsPage.clickOnCreateButton();
        patientCardUpdatePage = new PatientCardUpdatePage();
        expect(await patientCardUpdatePage.getPageTitle()).to.eq('Create or edit a Patient Card');
        await patientCardUpdatePage.cancel();
    });

    /* it('should create and save PatientCards', async () => {
        const nbButtonsBeforeCreate = await patientCardComponentsPage.countDeleteButtons();

        await patientCardComponentsPage.clickOnCreateButton();
        await promise.all([
            patientCardUpdatePage.setCreationDateInput('2000-12-31'),
            patientCardUpdatePage.patientSelectLastOption(),
            patientCardUpdatePage.dieteticianSelectLastOption(),
        ]);
        expect(await patientCardUpdatePage.getCreationDateInput()).to.eq('2000-12-31');
        await patientCardUpdatePage.save();
        expect(await patientCardUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await patientCardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last PatientCard', async () => {
        const nbButtonsBeforeDelete = await patientCardComponentsPage.countDeleteButtons();
        await patientCardComponentsPage.clickOnLastDeleteButton();

        patientCardDeleteDialog = new PatientCardDeleteDialog();
        expect(await patientCardDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Patient Card?');
        await patientCardDeleteDialog.clickOnConfirmButton();

        expect(await patientCardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
