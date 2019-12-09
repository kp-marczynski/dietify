/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  RecipeUnsuitableForDietComponentsPage,
  RecipeUnsuitableForDietDeleteDialog,
  RecipeUnsuitableForDietUpdatePage
} from './recipe-unsuitable-for-diet.page-object';

const expect = chai.expect;

describe('RecipeUnsuitableForDiet e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let recipeUnsuitableForDietUpdatePage: RecipeUnsuitableForDietUpdatePage;
  let recipeUnsuitableForDietComponentsPage: RecipeUnsuitableForDietComponentsPage;
  /*let recipeUnsuitableForDietDeleteDialog: RecipeUnsuitableForDietDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RecipeUnsuitableForDiets', async () => {
    await navBarPage.goToEntity('recipe-unsuitable-for-diet');
    recipeUnsuitableForDietComponentsPage = new RecipeUnsuitableForDietComponentsPage();
    await browser.wait(ec.visibilityOf(recipeUnsuitableForDietComponentsPage.title), 5000);
    expect(await recipeUnsuitableForDietComponentsPage.getTitle()).to.eq('gatewayApp.recipesRecipeUnsuitableForDiet.home.title');
  });

  it('should load create RecipeUnsuitableForDiet page', async () => {
    await recipeUnsuitableForDietComponentsPage.clickOnCreateButton();
    recipeUnsuitableForDietUpdatePage = new RecipeUnsuitableForDietUpdatePage();
    expect(await recipeUnsuitableForDietUpdatePage.getPageTitle()).to.eq(
      'gatewayApp.recipesRecipeUnsuitableForDiet.home.createOrEditLabel'
    );
    await recipeUnsuitableForDietUpdatePage.cancel();
  });

  /* it('should create and save RecipeUnsuitableForDiets', async () => {
        const nbButtonsBeforeCreate = await recipeUnsuitableForDietComponentsPage.countDeleteButtons();

        await recipeUnsuitableForDietComponentsPage.clickOnCreateButton();
        await promise.all([
            recipeUnsuitableForDietUpdatePage.setDietTypeIdInput('5'),
            recipeUnsuitableForDietUpdatePage.recipeSelectLastOption(),
        ]);
        expect(await recipeUnsuitableForDietUpdatePage.getDietTypeIdInput()).to.eq('5', 'Expected dietTypeId value to be equals to 5');
        await recipeUnsuitableForDietUpdatePage.save();
        expect(await recipeUnsuitableForDietUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await recipeUnsuitableForDietComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last RecipeUnsuitableForDiet', async () => {
        const nbButtonsBeforeDelete = await recipeUnsuitableForDietComponentsPage.countDeleteButtons();
        await recipeUnsuitableForDietComponentsPage.clickOnLastDeleteButton();

        recipeUnsuitableForDietDeleteDialog = new RecipeUnsuitableForDietDeleteDialog();
        expect(await recipeUnsuitableForDietDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.recipesRecipeUnsuitableForDiet.delete.question');
        await recipeUnsuitableForDietDeleteDialog.clickOnConfirmButton();

        expect(await recipeUnsuitableForDietComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
