/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { MealRecipeComponentsPage, MealRecipeDeleteDialog, MealRecipeUpdatePage } from './meal-recipe.page-object';

const expect = chai.expect;

describe('MealRecipe e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mealRecipeUpdatePage: MealRecipeUpdatePage;
  let mealRecipeComponentsPage: MealRecipeComponentsPage;
  /*let mealRecipeDeleteDialog: MealRecipeDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MealRecipes', async () => {
    await navBarPage.goToEntity('meal-recipe');
    mealRecipeComponentsPage = new MealRecipeComponentsPage();
    await browser.wait(ec.visibilityOf(mealRecipeComponentsPage.title), 5000);
    expect(await mealRecipeComponentsPage.getTitle()).to.eq('gatewayApp.mealplansMealRecipe.home.title');
  });

  it('should load create MealRecipe page', async () => {
    await mealRecipeComponentsPage.clickOnCreateButton();
    mealRecipeUpdatePage = new MealRecipeUpdatePage();
    expect(await mealRecipeUpdatePage.getPageTitle()).to.eq('gatewayApp.mealplansMealRecipe.home.createOrEditLabel');
    await mealRecipeUpdatePage.cancel();
  });

  /* it('should create and save MealRecipes', async () => {
        const nbButtonsBeforeCreate = await mealRecipeComponentsPage.countDeleteButtons();

        await mealRecipeComponentsPage.clickOnCreateButton();
        await promise.all([
            mealRecipeUpdatePage.setRecipeIdInput('5'),
            mealRecipeUpdatePage.setAmountInput('5'),
            mealRecipeUpdatePage.mealSelectLastOption(),
        ]);
        expect(await mealRecipeUpdatePage.getRecipeIdInput()).to.eq('5', 'Expected recipeId value to be equals to 5');
        expect(await mealRecipeUpdatePage.getAmountInput()).to.eq('5', 'Expected amount value to be equals to 5');
        await mealRecipeUpdatePage.save();
        expect(await mealRecipeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await mealRecipeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last MealRecipe', async () => {
        const nbButtonsBeforeDelete = await mealRecipeComponentsPage.countDeleteButtons();
        await mealRecipeComponentsPage.clickOnLastDeleteButton();

        mealRecipeDeleteDialog = new MealRecipeDeleteDialog();
        expect(await mealRecipeDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.mealplansMealRecipe.delete.question');
        await mealRecipeDeleteDialog.clickOnConfirmButton();

        expect(await mealRecipeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
