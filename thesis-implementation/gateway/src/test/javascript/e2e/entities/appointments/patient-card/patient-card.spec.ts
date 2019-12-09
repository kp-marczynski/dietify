/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { PatientCardComponentsPage, PatientCardDeleteDialog, PatientCardUpdatePage } from './patient-card.page-object';

const expect = chai.expect;

describe('PatientCard e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let patientCardUpdatePage: PatientCardUpdatePage;
  let patientCardComponentsPage: PatientCardComponentsPage;
  let patientCardDeleteDialog: PatientCardDeleteDialog;

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
    expect(await patientCardComponentsPage.getTitle()).to.eq('gatewayApp.appointmentsPatientCard.home.title');
  });

  it('should load create PatientCard page', async () => {
    await patientCardComponentsPage.clickOnCreateButton();
    patientCardUpdatePage = new PatientCardUpdatePage();
    expect(await patientCardUpdatePage.getPageTitle()).to.eq('gatewayApp.appointmentsPatientCard.home.createOrEditLabel');
    await patientCardUpdatePage.cancel();
  });

  it('should create and save PatientCards', async () => {
    const nbButtonsBeforeCreate = await patientCardComponentsPage.countDeleteButtons();

    await patientCardComponentsPage.clickOnCreateButton();
    await promise.all([
      patientCardUpdatePage.setCreationDateInput('2000-12-31'),
      patientCardUpdatePage.setDietitianIdInput('5'),
      patientCardUpdatePage.setPatientIdInput('5')
    ]);
    expect(await patientCardUpdatePage.getCreationDateInput()).to.eq(
      '2000-12-31',
      'Expected creationDate value to be equals to 2000-12-31'
    );
    expect(await patientCardUpdatePage.getDietitianIdInput()).to.eq('5', 'Expected dietitianId value to be equals to 5');
    expect(await patientCardUpdatePage.getPatientIdInput()).to.eq('5', 'Expected patientId value to be equals to 5');
    await patientCardUpdatePage.save();
    expect(await patientCardUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await patientCardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last PatientCard', async () => {
    const nbButtonsBeforeDelete = await patientCardComponentsPage.countDeleteButtons();
    await patientCardComponentsPage.clickOnLastDeleteButton();

    patientCardDeleteDialog = new PatientCardDeleteDialog();
    expect(await patientCardDeleteDialog.getDialogTitle()).to.eq('gatewayApp.appointmentsPatientCard.delete.question');
    await patientCardDeleteDialog.clickOnConfirmButton();

    expect(await patientCardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
