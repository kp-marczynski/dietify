/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  MealPlanSuitableForDietComponentsPage,
  MealPlanSuitableForDietDeleteDialog,
  MealPlanSuitableForDietUpdatePage
} from './meal-plan-suitable-for-diet.page-object';

const expect = chai.expect;

describe('MealPlanSuitableForDiet e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mealPlanSuitableForDietUpdatePage: MealPlanSuitableForDietUpdatePage;
  let mealPlanSuitableForDietComponentsPage: MealPlanSuitableForDietComponentsPage;
  /*let mealPlanSuitableForDietDeleteDialog: MealPlanSuitableForDietDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MealPlanSuitableForDiets', async () => {
    await navBarPage.goToEntity('meal-plan-suitable-for-diet');
    mealPlanSuitableForDietComponentsPage = new MealPlanSuitableForDietComponentsPage();
    await browser.wait(ec.visibilityOf(mealPlanSuitableForDietComponentsPage.title), 5000);
    expect(await mealPlanSuitableForDietComponentsPage.getTitle()).to.eq('gatewayApp.mealplansMealPlanSuitableForDiet.home.title');
  });

  it('should load create MealPlanSuitableForDiet page', async () => {
    await mealPlanSuitableForDietComponentsPage.clickOnCreateButton();
    mealPlanSuitableForDietUpdatePage = new MealPlanSuitableForDietUpdatePage();
    expect(await mealPlanSuitableForDietUpdatePage.getPageTitle()).to.eq(
      'gatewayApp.mealplansMealPlanSuitableForDiet.home.createOrEditLabel'
    );
    await mealPlanSuitableForDietUpdatePage.cancel();
  });

  /* it('should create and save MealPlanSuitableForDiets', async () => {
        const nbButtonsBeforeCreate = await mealPlanSuitableForDietComponentsPage.countDeleteButtons();

        await mealPlanSuitableForDietComponentsPage.clickOnCreateButton();
        await promise.all([
            mealPlanSuitableForDietUpdatePage.setDietTypeIdInput('5'),
            mealPlanSuitableForDietUpdatePage.mealPlanSelectLastOption(),
        ]);
        expect(await mealPlanSuitableForDietUpdatePage.getDietTypeIdInput()).to.eq('5', 'Expected dietTypeId value to be equals to 5');
        await mealPlanSuitableForDietUpdatePage.save();
        expect(await mealPlanSuitableForDietUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await mealPlanSuitableForDietComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last MealPlanSuitableForDiet', async () => {
        const nbButtonsBeforeDelete = await mealPlanSuitableForDietComponentsPage.countDeleteButtons();
        await mealPlanSuitableForDietComponentsPage.clickOnLastDeleteButton();

        mealPlanSuitableForDietDeleteDialog = new MealPlanSuitableForDietDeleteDialog();
        expect(await mealPlanSuitableForDietDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.mealplansMealPlanSuitableForDiet.delete.question');
        await mealPlanSuitableForDietDeleteDialog.clickOnConfirmButton();

        expect(await mealPlanSuitableForDietComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
