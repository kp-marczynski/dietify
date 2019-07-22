/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { AppointmentComponentsPage, AppointmentDeleteDialog, AppointmentUpdatePage } from './appointment.page-object';

const expect = chai.expect;

describe('Appointment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let appointmentUpdatePage: AppointmentUpdatePage;
  let appointmentComponentsPage: AppointmentComponentsPage;
  /*let appointmentDeleteDialog: AppointmentDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Appointments', async () => {
    await navBarPage.goToEntity('appointment');
    appointmentComponentsPage = new AppointmentComponentsPage();
    await browser.wait(ec.visibilityOf(appointmentComponentsPage.title), 5000);
    expect(await appointmentComponentsPage.getTitle()).to.eq('gatewayApp.appointmentsAppointment.home.title');
  });

  it('should load create Appointment page', async () => {
    await appointmentComponentsPage.clickOnCreateButton();
    appointmentUpdatePage = new AppointmentUpdatePage();
    expect(await appointmentUpdatePage.getPageTitle()).to.eq('gatewayApp.appointmentsAppointment.home.createOrEditLabel');
    await appointmentUpdatePage.cancel();
  });

  /* it('should create and save Appointments', async () => {
        const nbButtonsBeforeCreate = await appointmentComponentsPage.countDeleteButtons();

        await appointmentComponentsPage.clickOnCreateButton();
        await promise.all([
            appointmentUpdatePage.setAppointmentDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            appointmentUpdatePage.appointmentStateSelectLastOption(),
            appointmentUpdatePage.setMealPlanIdInput('5'),
            appointmentUpdatePage.setGeneralAdviceInput('generalAdvice'),
            appointmentUpdatePage.bodyMeasurementSelectLastOption(),
            appointmentUpdatePage.nutritionalInterviewSelectLastOption(),
            appointmentUpdatePage.patientCardSelectLastOption(),
        ]);
        expect(await appointmentUpdatePage.getAppointmentDateInput()).to.contain('2001-01-01T02:30', 'Expected appointmentDate value to be equals to 2000-12-31');
        expect(await appointmentUpdatePage.getMealPlanIdInput()).to.eq('5', 'Expected mealPlanId value to be equals to 5');
        expect(await appointmentUpdatePage.getGeneralAdviceInput()).to.eq('generalAdvice', 'Expected GeneralAdvice value to be equals to generalAdvice');
        await appointmentUpdatePage.save();
        expect(await appointmentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await appointmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last Appointment', async () => {
        const nbButtonsBeforeDelete = await appointmentComponentsPage.countDeleteButtons();
        await appointmentComponentsPage.clickOnLastDeleteButton();

        appointmentDeleteDialog = new AppointmentDeleteDialog();
        expect(await appointmentDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.appointmentsAppointment.delete.question');
        await appointmentDeleteDialog.clickOnConfirmButton();

        expect(await appointmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
