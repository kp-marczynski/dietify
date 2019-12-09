/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { AssignedMealPlanComponentsPage, AssignedMealPlanDeleteDialog, AssignedMealPlanUpdatePage } from './assigned-meal-plan.page-object';

const expect = chai.expect;

describe('AssignedMealPlan e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let assignedMealPlanUpdatePage: AssignedMealPlanUpdatePage;
  let assignedMealPlanComponentsPage: AssignedMealPlanComponentsPage;
  /*let assignedMealPlanDeleteDialog: AssignedMealPlanDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AssignedMealPlans', async () => {
    await navBarPage.goToEntity('assigned-meal-plan');
    assignedMealPlanComponentsPage = new AssignedMealPlanComponentsPage();
    await browser.wait(ec.visibilityOf(assignedMealPlanComponentsPage.title), 5000);
    expect(await assignedMealPlanComponentsPage.getTitle()).to.eq('gatewayApp.appointmentsAssignedMealPlan.home.title');
  });

  it('should load create AssignedMealPlan page', async () => {
    await assignedMealPlanComponentsPage.clickOnCreateButton();
    assignedMealPlanUpdatePage = new AssignedMealPlanUpdatePage();
    expect(await assignedMealPlanUpdatePage.getPageTitle()).to.eq('gatewayApp.appointmentsAssignedMealPlan.home.createOrEditLabel');
    await assignedMealPlanUpdatePage.cancel();
  });

  /* it('should create and save AssignedMealPlans', async () => {
        const nbButtonsBeforeCreate = await assignedMealPlanComponentsPage.countDeleteButtons();

        await assignedMealPlanComponentsPage.clickOnCreateButton();
        await promise.all([
            assignedMealPlanUpdatePage.setMealPlanIdInput('5'),
            assignedMealPlanUpdatePage.appointmentSelectLastOption(),
        ]);
        expect(await assignedMealPlanUpdatePage.getMealPlanIdInput()).to.eq('5', 'Expected mealPlanId value to be equals to 5');
        await assignedMealPlanUpdatePage.save();
        expect(await assignedMealPlanUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await assignedMealPlanComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last AssignedMealPlan', async () => {
        const nbButtonsBeforeDelete = await assignedMealPlanComponentsPage.countDeleteButtons();
        await assignedMealPlanComponentsPage.clickOnLastDeleteButton();

        assignedMealPlanDeleteDialog = new AssignedMealPlanDeleteDialog();
        expect(await assignedMealPlanDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.appointmentsAssignedMealPlan.delete.question');
        await assignedMealPlanDeleteDialog.clickOnConfirmButton();

        expect(await assignedMealPlanComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
