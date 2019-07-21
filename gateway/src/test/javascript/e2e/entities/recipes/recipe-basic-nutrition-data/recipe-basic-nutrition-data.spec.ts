/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  RecipeBasicNutritionDataComponentsPage,
  RecipeBasicNutritionDataDeleteDialog,
  RecipeBasicNutritionDataUpdatePage
} from './recipe-basic-nutrition-data.page-object';

const expect = chai.expect;

describe('RecipeBasicNutritionData e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let recipeBasicNutritionDataUpdatePage: RecipeBasicNutritionDataUpdatePage;
  let recipeBasicNutritionDataComponentsPage: RecipeBasicNutritionDataComponentsPage;
  /*let recipeBasicNutritionDataDeleteDialog: RecipeBasicNutritionDataDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RecipeBasicNutritionData', async () => {
    await navBarPage.goToEntity('recipe-basic-nutrition-data');
    recipeBasicNutritionDataComponentsPage = new RecipeBasicNutritionDataComponentsPage();
    await browser.wait(ec.visibilityOf(recipeBasicNutritionDataComponentsPage.title), 5000);
    expect(await recipeBasicNutritionDataComponentsPage.getTitle()).to.eq('gatewayApp.recipesRecipeBasicNutritionData.home.title');
  });

  it('should load create RecipeBasicNutritionData page', async () => {
    await recipeBasicNutritionDataComponentsPage.clickOnCreateButton();
    recipeBasicNutritionDataUpdatePage = new RecipeBasicNutritionDataUpdatePage();
    expect(await recipeBasicNutritionDataUpdatePage.getPageTitle()).to.eq(
      'gatewayApp.recipesRecipeBasicNutritionData.home.createOrEditLabel'
    );
    await recipeBasicNutritionDataUpdatePage.cancel();
  });

  /* it('should create and save RecipeBasicNutritionData', async () => {
        const nbButtonsBeforeCreate = await recipeBasicNutritionDataComponentsPage.countDeleteButtons();

        await recipeBasicNutritionDataComponentsPage.clickOnCreateButton();
        await promise.all([
            recipeBasicNutritionDataUpdatePage.setEnergyInput('5'),
            recipeBasicNutritionDataUpdatePage.setProteinInput('5'),
            recipeBasicNutritionDataUpdatePage.setFatInput('5'),
            recipeBasicNutritionDataUpdatePage.setCarbohydratesInput('5'),
            recipeBasicNutritionDataUpdatePage.recipeSelectLastOption(),
        ]);
        expect(await recipeBasicNutritionDataUpdatePage.getEnergyInput()).to.eq('5', 'Expected energy value to be equals to 5');
        expect(await recipeBasicNutritionDataUpdatePage.getProteinInput()).to.eq('5', 'Expected protein value to be equals to 5');
        expect(await recipeBasicNutritionDataUpdatePage.getFatInput()).to.eq('5', 'Expected fat value to be equals to 5');
        expect(await recipeBasicNutritionDataUpdatePage.getCarbohydratesInput()).to.eq('5', 'Expected carbohydrates value to be equals to 5');
        await recipeBasicNutritionDataUpdatePage.save();
        expect(await recipeBasicNutritionDataUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await recipeBasicNutritionDataComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last RecipeBasicNutritionData', async () => {
        const nbButtonsBeforeDelete = await recipeBasicNutritionDataComponentsPage.countDeleteButtons();
        await recipeBasicNutritionDataComponentsPage.clickOnLastDeleteButton();

        recipeBasicNutritionDataDeleteDialog = new RecipeBasicNutritionDataDeleteDialog();
        expect(await recipeBasicNutritionDataDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.recipesRecipeBasicNutritionData.delete.question');
        await recipeBasicNutritionDataDeleteDialog.clickOnConfirmButton();

        expect(await recipeBasicNutritionDataComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
