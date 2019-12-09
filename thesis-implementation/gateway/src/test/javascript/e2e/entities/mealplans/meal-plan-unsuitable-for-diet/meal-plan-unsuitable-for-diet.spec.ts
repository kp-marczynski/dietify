/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  MealPlanUnsuitableForDietComponentsPage,
  MealPlanUnsuitableForDietDeleteDialog,
  MealPlanUnsuitableForDietUpdatePage
} from './meal-plan-unsuitable-for-diet.page-object';

const expect = chai.expect;

describe('MealPlanUnsuitableForDiet e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mealPlanUnsuitableForDietUpdatePage: MealPlanUnsuitableForDietUpdatePage;
  let mealPlanUnsuitableForDietComponentsPage: MealPlanUnsuitableForDietComponentsPage;
  /*let mealPlanUnsuitableForDietDeleteDialog: MealPlanUnsuitableForDietDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MealPlanUnsuitableForDiets', async () => {
    await navBarPage.goToEntity('meal-plan-unsuitable-for-diet');
    mealPlanUnsuitableForDietComponentsPage = new MealPlanUnsuitableForDietComponentsPage();
    await browser.wait(ec.visibilityOf(mealPlanUnsuitableForDietComponentsPage.title), 5000);
    expect(await mealPlanUnsuitableForDietComponentsPage.getTitle()).to.eq('gatewayApp.mealplansMealPlanUnsuitableForDiet.home.title');
  });

  it('should load create MealPlanUnsuitableForDiet page', async () => {
    await mealPlanUnsuitableForDietComponentsPage.clickOnCreateButton();
    mealPlanUnsuitableForDietUpdatePage = new MealPlanUnsuitableForDietUpdatePage();
    expect(await mealPlanUnsuitableForDietUpdatePage.getPageTitle()).to.eq(
      'gatewayApp.mealplansMealPlanUnsuitableForDiet.home.createOrEditLabel'
    );
    await mealPlanUnsuitableForDietUpdatePage.cancel();
  });

  /* it('should create and save MealPlanUnsuitableForDiets', async () => {
        const nbButtonsBeforeCreate = await mealPlanUnsuitableForDietComponentsPage.countDeleteButtons();

        await mealPlanUnsuitableForDietComponentsPage.clickOnCreateButton();
        await promise.all([
            mealPlanUnsuitableForDietUpdatePage.setDietTypeIdInput('5'),
            mealPlanUnsuitableForDietUpdatePage.mealPlanSelectLastOption(),
        ]);
        expect(await mealPlanUnsuitableForDietUpdatePage.getDietTypeIdInput()).to.eq('5', 'Expected dietTypeId value to be equals to 5');
        await mealPlanUnsuitableForDietUpdatePage.save();
        expect(await mealPlanUnsuitableForDietUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await mealPlanUnsuitableForDietComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last MealPlanUnsuitableForDiet', async () => {
        const nbButtonsBeforeDelete = await mealPlanUnsuitableForDietComponentsPage.countDeleteButtons();
        await mealPlanUnsuitableForDietComponentsPage.clickOnLastDeleteButton();

        mealPlanUnsuitableForDietDeleteDialog = new MealPlanUnsuitableForDietDeleteDialog();
        expect(await mealPlanUnsuitableForDietDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.mealplansMealPlanUnsuitableForDiet.delete.question');
        await mealPlanUnsuitableForDietDeleteDialog.clickOnConfirmButton();

        expect(await mealPlanUnsuitableForDietComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
