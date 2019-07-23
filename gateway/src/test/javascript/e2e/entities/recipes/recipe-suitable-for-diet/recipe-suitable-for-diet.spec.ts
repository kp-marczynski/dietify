/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  RecipeSuitableForDietComponentsPage,
  RecipeSuitableForDietDeleteDialog,
  RecipeSuitableForDietUpdatePage
} from './recipe-suitable-for-diet.page-object';

const expect = chai.expect;

describe('RecipeSuitableForDiet e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let recipeSuitableForDietUpdatePage: RecipeSuitableForDietUpdatePage;
  let recipeSuitableForDietComponentsPage: RecipeSuitableForDietComponentsPage;
  /*let recipeSuitableForDietDeleteDialog: RecipeSuitableForDietDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RecipeSuitableForDiets', async () => {
    await navBarPage.goToEntity('recipe-suitable-for-diet');
    recipeSuitableForDietComponentsPage = new RecipeSuitableForDietComponentsPage();
    await browser.wait(ec.visibilityOf(recipeSuitableForDietComponentsPage.title), 5000);
    expect(await recipeSuitableForDietComponentsPage.getTitle()).to.eq('gatewayApp.recipesRecipeSuitableForDiet.home.title');
  });

  it('should load create RecipeSuitableForDiet page', async () => {
    await recipeSuitableForDietComponentsPage.clickOnCreateButton();
    recipeSuitableForDietUpdatePage = new RecipeSuitableForDietUpdatePage();
    expect(await recipeSuitableForDietUpdatePage.getPageTitle()).to.eq('gatewayApp.recipesRecipeSuitableForDiet.home.createOrEditLabel');
    await recipeSuitableForDietUpdatePage.cancel();
  });

  /* it('should create and save RecipeSuitableForDiets', async () => {
        const nbButtonsBeforeCreate = await recipeSuitableForDietComponentsPage.countDeleteButtons();

        await recipeSuitableForDietComponentsPage.clickOnCreateButton();
        await promise.all([
            recipeSuitableForDietUpdatePage.setDietTypeIdInput('5'),
            recipeSuitableForDietUpdatePage.recipeSelectLastOption(),
        ]);
        expect(await recipeSuitableForDietUpdatePage.getDietTypeIdInput()).to.eq('5', 'Expected dietTypeId value to be equals to 5');
        await recipeSuitableForDietUpdatePage.save();
        expect(await recipeSuitableForDietUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await recipeSuitableForDietComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last RecipeSuitableForDiet', async () => {
        const nbButtonsBeforeDelete = await recipeSuitableForDietComponentsPage.countDeleteButtons();
        await recipeSuitableForDietComponentsPage.clickOnLastDeleteButton();

        recipeSuitableForDietDeleteDialog = new RecipeSuitableForDietDeleteDialog();
        expect(await recipeSuitableForDietDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.recipesRecipeSuitableForDiet.delete.question');
        await recipeSuitableForDietDeleteDialog.clickOnConfirmButton();

        expect(await recipeSuitableForDietComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
