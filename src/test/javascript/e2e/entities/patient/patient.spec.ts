/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PatientComponentsPage, PatientDeleteDialog, PatientUpdatePage } from './patient.page-object';

const expect = chai.expect;

describe('Patient e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let patientUpdatePage: PatientUpdatePage;
    let patientComponentsPage: PatientComponentsPage;
    let patientDeleteDialog: PatientDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Patients', async () => {
        await navBarPage.goToEntity('patient');
        patientComponentsPage = new PatientComponentsPage();
        await browser.wait(ec.visibilityOf(patientComponentsPage.title), 5000);
        expect(await patientComponentsPage.getTitle()).to.eq('Patients');
    });

    it('should load create Patient page', async () => {
        await patientComponentsPage.clickOnCreateButton();
        patientUpdatePage = new PatientUpdatePage();
        expect(await patientUpdatePage.getPageTitle()).to.eq('Create or edit a Patient');
        await patientUpdatePage.cancel();
    });

    it('should create and save Patients', async () => {
        const nbButtonsBeforeCreate = await patientComponentsPage.countDeleteButtons();

        await patientComponentsPage.clickOnCreateButton();
        await promise.all([
            patientUpdatePage.setUserIdInput('5'),
            patientUpdatePage.genderSelectLastOption(),
            patientUpdatePage.setDateOfBirthInput('2000-12-31'),
            patientUpdatePage.setPreferableLanguageIdInput('5')
        ]);
        expect(await patientUpdatePage.getUserIdInput()).to.eq('5');
        expect(await patientUpdatePage.getDateOfBirthInput()).to.eq('2000-12-31');
        expect(await patientUpdatePage.getPreferableLanguageIdInput()).to.eq('5');
        await patientUpdatePage.save();
        expect(await patientUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await patientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Patient', async () => {
        const nbButtonsBeforeDelete = await patientComponentsPage.countDeleteButtons();
        await patientComponentsPage.clickOnLastDeleteButton();

        patientDeleteDialog = new PatientDeleteDialog();
        expect(await patientDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Patient?');
        await patientDeleteDialog.clickOnConfirmButton();

        expect(await patientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
