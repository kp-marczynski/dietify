/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { RecipeComponentsPage, RecipeDeleteDialog, RecipeUpdatePage } from './recipe.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Recipe e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let recipeUpdatePage: RecipeUpdatePage;
  let recipeComponentsPage: RecipeComponentsPage;
  /*let recipeDeleteDialog: RecipeDeleteDialog;*/
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Recipes', async () => {
    await navBarPage.goToEntity('recipe');
    recipeComponentsPage = new RecipeComponentsPage();
    await browser.wait(ec.visibilityOf(recipeComponentsPage.title), 5000);
    expect(await recipeComponentsPage.getTitle()).to.eq('gatewayApp.recipesRecipe.home.title');
  });

  it('should load create Recipe page', async () => {
    await recipeComponentsPage.clickOnCreateButton();
    recipeUpdatePage = new RecipeUpdatePage();
    expect(await recipeUpdatePage.getPageTitle()).to.eq('gatewayApp.recipesRecipe.home.createOrEditLabel');
    await recipeUpdatePage.cancel();
  });

  /* it('should create and save Recipes', async () => {
        const nbButtonsBeforeCreate = await recipeComponentsPage.countDeleteButtons();

        await recipeComponentsPage.clickOnCreateButton();
        await promise.all([
            recipeUpdatePage.setNameInput('name'),
            recipeUpdatePage.setPreparationTimeMinutesInput('5'),
            recipeUpdatePage.setNumberOfPortionsInput('5'),
            recipeUpdatePage.setImageInput(absolutePath),
            recipeUpdatePage.setAuthorIdInput('5'),
            recipeUpdatePage.setCreationDateInput('2000-12-31'),
            recipeUpdatePage.setLastEditDateInput('2000-12-31'),
            recipeUpdatePage.setLanguageInput('language'),
            recipeUpdatePage.setTotalGramsWeightInput('5'),
            recipeUpdatePage.basicNutritionDataSelectLastOption(),
            recipeUpdatePage.sourceRecipeSelectLastOption(),
            // recipeUpdatePage.kitchenAppliancesSelectLastOption(),
            // recipeUpdatePage.dishTypesSelectLastOption(),
            // recipeUpdatePage.mealTypesSelectLastOption(),
        ]);
        expect(await recipeUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
        expect(await recipeUpdatePage.getPreparationTimeMinutesInput()).to.eq('5', 'Expected preparationTimeMinutes value to be equals to 5');
        expect(await recipeUpdatePage.getNumberOfPortionsInput()).to.eq('5', 'Expected numberOfPortions value to be equals to 5');
        expect(await recipeUpdatePage.getImageInput()).to.endsWith(fileNameToUpload, 'Expected Image value to be end with ' + fileNameToUpload);
        expect(await recipeUpdatePage.getAuthorIdInput()).to.eq('5', 'Expected authorId value to be equals to 5');
        expect(await recipeUpdatePage.getCreationDateInput()).to.eq('2000-12-31', 'Expected creationDate value to be equals to 2000-12-31');
        expect(await recipeUpdatePage.getLastEditDateInput()).to.eq('2000-12-31', 'Expected lastEditDate value to be equals to 2000-12-31');
        const selectedIsVisible = recipeUpdatePage.getIsVisibleInput();
        if (await selectedIsVisible.isSelected()) {
            await recipeUpdatePage.getIsVisibleInput().click();
            expect(await recipeUpdatePage.getIsVisibleInput().isSelected(), 'Expected isVisible not to be selected').to.be.false;
        } else {
            await recipeUpdatePage.getIsVisibleInput().click();
            expect(await recipeUpdatePage.getIsVisibleInput().isSelected(), 'Expected isVisible to be selected').to.be.true;
        }
        expect(await recipeUpdatePage.getLanguageInput()).to.eq('language', 'Expected Language value to be equals to language');
        expect(await recipeUpdatePage.getTotalGramsWeightInput()).to.eq('5', 'Expected totalGramsWeight value to be equals to 5');
        await recipeUpdatePage.save();
        expect(await recipeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await recipeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last Recipe', async () => {
        const nbButtonsBeforeDelete = await recipeComponentsPage.countDeleteButtons();
        await recipeComponentsPage.clickOnLastDeleteButton();

        recipeDeleteDialog = new RecipeDeleteDialog();
        expect(await recipeDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.recipesRecipe.delete.question');
        await recipeDeleteDialog.clickOnConfirmButton();

        expect(await recipeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
