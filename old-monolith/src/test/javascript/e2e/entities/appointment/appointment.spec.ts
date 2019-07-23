/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

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
        expect(await appointmentComponentsPage.getTitle()).to.eq('Appointments');
    });

    it('should load create Appointment page', async () => {
        await appointmentComponentsPage.clickOnCreateButton();
        appointmentUpdatePage = new AppointmentUpdatePage();
        expect(await appointmentUpdatePage.getPageTitle()).to.eq('Create or edit a Appointment');
        await appointmentUpdatePage.cancel();
    });

    /* it('should create and save Appointments', async () => {
        const nbButtonsBeforeCreate = await appointmentComponentsPage.countDeleteButtons();

        await appointmentComponentsPage.clickOnCreateButton();
        await promise.all([
            appointmentUpdatePage.setAppointmentDateInput('2000-12-31'),
            appointmentUpdatePage.appointmentStateSelectLastOption(),
            appointmentUpdatePage.setMealPlanIdInput('5'),
            appointmentUpdatePage.setGeneralAdviceInput('generalAdvice'),
            appointmentUpdatePage.bodyMeasurmentSelectLastOption(),
            appointmentUpdatePage.patientCardSelectLastOption(),
        ]);
        expect(await appointmentUpdatePage.getAppointmentDateInput()).to.eq('2000-12-31');
        expect(await appointmentUpdatePage.getMealPlanIdInput()).to.eq('5');
        expect(await appointmentUpdatePage.getGeneralAdviceInput()).to.eq('generalAdvice');
        await appointmentUpdatePage.save();
        expect(await appointmentUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await appointmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last Appointment', async () => {
        const nbButtonsBeforeDelete = await appointmentComponentsPage.countDeleteButtons();
        await appointmentComponentsPage.clickOnLastDeleteButton();

        appointmentDeleteDialog = new AppointmentDeleteDialog();
        expect(await appointmentDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Appointment?');
        await appointmentDeleteDialog.clickOnConfirmButton();

        expect(await appointmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
