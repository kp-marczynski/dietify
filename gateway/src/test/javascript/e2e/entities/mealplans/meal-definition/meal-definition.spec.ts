/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { MealDefinitionComponentsPage, MealDefinitionDeleteDialog, MealDefinitionUpdatePage } from './meal-definition.page-object';

const expect = chai.expect;

describe('MealDefinition e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mealDefinitionUpdatePage: MealDefinitionUpdatePage;
  let mealDefinitionComponentsPage: MealDefinitionComponentsPage;
  /*let mealDefinitionDeleteDialog: MealDefinitionDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MealDefinitions', async () => {
    await navBarPage.goToEntity('meal-definition');
    mealDefinitionComponentsPage = new MealDefinitionComponentsPage();
    await browser.wait(ec.visibilityOf(mealDefinitionComponentsPage.title), 5000);
    expect(await mealDefinitionComponentsPage.getTitle()).to.eq('gatewayApp.mealplansMealDefinition.home.title');
  });

  it('should load create MealDefinition page', async () => {
    await mealDefinitionComponentsPage.clickOnCreateButton();
    mealDefinitionUpdatePage = new MealDefinitionUpdatePage();
    expect(await mealDefinitionUpdatePage.getPageTitle()).to.eq('gatewayApp.mealplansMealDefinition.home.createOrEditLabel');
    await mealDefinitionUpdatePage.cancel();
  });

  /* it('should create and save MealDefinitions', async () => {
        const nbButtonsBeforeCreate = await mealDefinitionComponentsPage.countDeleteButtons();

        await mealDefinitionComponentsPage.clickOnCreateButton();
        await promise.all([
            mealDefinitionUpdatePage.setOrdinalNumberInput('5'),
            mealDefinitionUpdatePage.setMealTypeIdInput('5'),
            mealDefinitionUpdatePage.setTimeOfMealInput('timeOfMeal'),
            mealDefinitionUpdatePage.setPercentOfEnergyInput('5'),
            mealDefinitionUpdatePage.mealPlanSelectLastOption(),
        ]);
        expect(await mealDefinitionUpdatePage.getOrdinalNumberInput()).to.eq('5', 'Expected ordinalNumber value to be equals to 5');
        expect(await mealDefinitionUpdatePage.getMealTypeIdInput()).to.eq('5', 'Expected mealTypeId value to be equals to 5');
        expect(await mealDefinitionUpdatePage.getTimeOfMealInput()).to.eq('timeOfMeal', 'Expected TimeOfMeal value to be equals to timeOfMeal');
        expect(await mealDefinitionUpdatePage.getPercentOfEnergyInput()).to.eq('5', 'Expected percentOfEnergy value to be equals to 5');
        await mealDefinitionUpdatePage.save();
        expect(await mealDefinitionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await mealDefinitionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last MealDefinition', async () => {
        const nbButtonsBeforeDelete = await mealDefinitionComponentsPage.countDeleteButtons();
        await mealDefinitionComponentsPage.clickOnLastDeleteButton();

        mealDefinitionDeleteDialog = new MealDefinitionDeleteDialog();
        expect(await mealDefinitionDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.mealplansMealDefinition.delete.question');
        await mealDefinitionDeleteDialog.clickOnConfirmButton();

        expect(await mealDefinitionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
