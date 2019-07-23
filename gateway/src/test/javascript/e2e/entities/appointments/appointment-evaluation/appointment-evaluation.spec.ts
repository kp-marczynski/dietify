/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  AppointmentEvaluationComponentsPage,
  AppointmentEvaluationDeleteDialog,
  AppointmentEvaluationUpdatePage
} from './appointment-evaluation.page-object';

const expect = chai.expect;

describe('AppointmentEvaluation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let appointmentEvaluationUpdatePage: AppointmentEvaluationUpdatePage;
  let appointmentEvaluationComponentsPage: AppointmentEvaluationComponentsPage;
  /*let appointmentEvaluationDeleteDialog: AppointmentEvaluationDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AppointmentEvaluations', async () => {
    await navBarPage.goToEntity('appointment-evaluation');
    appointmentEvaluationComponentsPage = new AppointmentEvaluationComponentsPage();
    await browser.wait(ec.visibilityOf(appointmentEvaluationComponentsPage.title), 5000);
    expect(await appointmentEvaluationComponentsPage.getTitle()).to.eq('gatewayApp.appointmentsAppointmentEvaluation.home.title');
  });

  it('should load create AppointmentEvaluation page', async () => {
    await appointmentEvaluationComponentsPage.clickOnCreateButton();
    appointmentEvaluationUpdatePage = new AppointmentEvaluationUpdatePage();
    expect(await appointmentEvaluationUpdatePage.getPageTitle()).to.eq(
      'gatewayApp.appointmentsAppointmentEvaluation.home.createOrEditLabel'
    );
    await appointmentEvaluationUpdatePage.cancel();
  });

  /* it('should create and save AppointmentEvaluations', async () => {
        const nbButtonsBeforeCreate = await appointmentEvaluationComponentsPage.countDeleteButtons();

        await appointmentEvaluationComponentsPage.clickOnCreateButton();
        await promise.all([
            appointmentEvaluationUpdatePage.overallSatisfactionSelectLastOption(),
            appointmentEvaluationUpdatePage.dietitianServiceSatisfactionSelectLastOption(),
            appointmentEvaluationUpdatePage.mealPlanOverallSatisfactionSelectLastOption(),
            appointmentEvaluationUpdatePage.mealCostSatisfactionSelectLastOption(),
            appointmentEvaluationUpdatePage.mealPreparationTimeSatisfactionSelectLastOption(),
            appointmentEvaluationUpdatePage.mealComplexityLevelSatisfactionSelectLastOption(),
            appointmentEvaluationUpdatePage.mealTastefulnessSatisfactionSelectLastOption(),
            appointmentEvaluationUpdatePage.dietaryResultSatisfactionSelectLastOption(),
            appointmentEvaluationUpdatePage.setCommentInput('comment'),
            appointmentEvaluationUpdatePage.appointmentSelectLastOption(),
        ]);
        expect(await appointmentEvaluationUpdatePage.getCommentInput()).to.eq('comment', 'Expected Comment value to be equals to comment');
        await appointmentEvaluationUpdatePage.save();
        expect(await appointmentEvaluationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await appointmentEvaluationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last AppointmentEvaluation', async () => {
        const nbButtonsBeforeDelete = await appointmentEvaluationComponentsPage.countDeleteButtons();
        await appointmentEvaluationComponentsPage.clickOnLastDeleteButton();

        appointmentEvaluationDeleteDialog = new AppointmentEvaluationDeleteDialog();
        expect(await appointmentEvaluationDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.appointmentsAppointmentEvaluation.delete.question');
        await appointmentEvaluationDeleteDialog.clickOnConfirmButton();

        expect(await appointmentEvaluationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
