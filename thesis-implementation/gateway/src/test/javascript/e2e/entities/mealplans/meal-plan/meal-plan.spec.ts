/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { MealPlanComponentsPage, MealPlanDeleteDialog, MealPlanUpdatePage } from './meal-plan.page-object';

const expect = chai.expect;

describe('MealPlan e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mealPlanUpdatePage: MealPlanUpdatePage;
  let mealPlanComponentsPage: MealPlanComponentsPage;
  let mealPlanDeleteDialog: MealPlanDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MealPlans', async () => {
    await navBarPage.goToEntity('meal-plan');
    mealPlanComponentsPage = new MealPlanComponentsPage();
    await browser.wait(ec.visibilityOf(mealPlanComponentsPage.title), 5000);
    expect(await mealPlanComponentsPage.getTitle()).to.eq('gatewayApp.mealplansMealPlan.home.title');
  });

  it('should load create MealPlan page', async () => {
    await mealPlanComponentsPage.clickOnCreateButton();
    mealPlanUpdatePage = new MealPlanUpdatePage();
    expect(await mealPlanUpdatePage.getPageTitle()).to.eq('gatewayApp.mealplansMealPlan.home.createOrEditLabel');
    await mealPlanUpdatePage.cancel();
  });

  it('should create and save MealPlans', async () => {
    const nbButtonsBeforeCreate = await mealPlanComponentsPage.countDeleteButtons();

    await mealPlanComponentsPage.clickOnCreateButton();
    await promise.all([
      mealPlanUpdatePage.setAuthorIdInput('5'),
      mealPlanUpdatePage.setCreationDateInput('2000-12-31'),
      mealPlanUpdatePage.setNameInput('name'),
      mealPlanUpdatePage.setLanguageInput('language'),
      mealPlanUpdatePage.setNumberOfDaysInput('5'),
      mealPlanUpdatePage.setNumberOfMealsPerDayInput('5'),
      mealPlanUpdatePage.setTotalDailyEnergyInput('5'),
      mealPlanUpdatePage.setPercentOfProteinInput('5'),
      mealPlanUpdatePage.setPercentOfFatInput('5'),
      mealPlanUpdatePage.setPercentOfCarbohydratesInput('5')
    ]);
    expect(await mealPlanUpdatePage.getAuthorIdInput()).to.eq('5', 'Expected authorId value to be equals to 5');
    expect(await mealPlanUpdatePage.getCreationDateInput()).to.eq('2000-12-31', 'Expected creationDate value to be equals to 2000-12-31');
    expect(await mealPlanUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    const selectedIsVisible = mealPlanUpdatePage.getIsVisibleInput();
    if (await selectedIsVisible.isSelected()) {
      await mealPlanUpdatePage.getIsVisibleInput().click();
      expect(await mealPlanUpdatePage.getIsVisibleInput().isSelected(), 'Expected isVisible not to be selected').to.be.false;
    } else {
      await mealPlanUpdatePage.getIsVisibleInput().click();
      expect(await mealPlanUpdatePage.getIsVisibleInput().isSelected(), 'Expected isVisible to be selected').to.be.true;
    }
    const selectedIsLocked = mealPlanUpdatePage.getIsLockedInput();
    if (await selectedIsLocked.isSelected()) {
      await mealPlanUpdatePage.getIsLockedInput().click();
      expect(await mealPlanUpdatePage.getIsLockedInput().isSelected(), 'Expected isLocked not to be selected').to.be.false;
    } else {
      await mealPlanUpdatePage.getIsLockedInput().click();
      expect(await mealPlanUpdatePage.getIsLockedInput().isSelected(), 'Expected isLocked to be selected').to.be.true;
    }
    expect(await mealPlanUpdatePage.getLanguageInput()).to.eq('language', 'Expected Language value to be equals to language');
    expect(await mealPlanUpdatePage.getNumberOfDaysInput()).to.eq('5', 'Expected numberOfDays value to be equals to 5');
    expect(await mealPlanUpdatePage.getNumberOfMealsPerDayInput()).to.eq('5', 'Expected numberOfMealsPerDay value to be equals to 5');
    expect(await mealPlanUpdatePage.getTotalDailyEnergyInput()).to.eq('5', 'Expected totalDailyEnergy value to be equals to 5');
    expect(await mealPlanUpdatePage.getPercentOfProteinInput()).to.eq('5', 'Expected percentOfProtein value to be equals to 5');
    expect(await mealPlanUpdatePage.getPercentOfFatInput()).to.eq('5', 'Expected percentOfFat value to be equals to 5');
    expect(await mealPlanUpdatePage.getPercentOfCarbohydratesInput()).to.eq('5', 'Expected percentOfCarbohydrates value to be equals to 5');
    await mealPlanUpdatePage.save();
    expect(await mealPlanUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await mealPlanComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last MealPlan', async () => {
    const nbButtonsBeforeDelete = await mealPlanComponentsPage.countDeleteButtons();
    await mealPlanComponentsPage.clickOnLastDeleteButton();

    mealPlanDeleteDialog = new MealPlanDeleteDialog();
    expect(await mealPlanDeleteDialog.getDialogTitle()).to.eq('gatewayApp.mealplansMealPlan.delete.question');
    await mealPlanDeleteDialog.clickOnConfirmButton();

    expect(await mealPlanComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
