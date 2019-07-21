/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  MealTypeTranslationComponentsPage,
  MealTypeTranslationDeleteDialog,
  MealTypeTranslationUpdatePage
} from './meal-type-translation.page-object';

const expect = chai.expect;

describe('MealTypeTranslation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mealTypeTranslationUpdatePage: MealTypeTranslationUpdatePage;
  let mealTypeTranslationComponentsPage: MealTypeTranslationComponentsPage;
  /*let mealTypeTranslationDeleteDialog: MealTypeTranslationDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MealTypeTranslations', async () => {
    await navBarPage.goToEntity('meal-type-translation');
    mealTypeTranslationComponentsPage = new MealTypeTranslationComponentsPage();
    await browser.wait(ec.visibilityOf(mealTypeTranslationComponentsPage.title), 5000);
    expect(await mealTypeTranslationComponentsPage.getTitle()).to.eq('gatewayApp.recipesMealTypeTranslation.home.title');
  });

  it('should load create MealTypeTranslation page', async () => {
    await mealTypeTranslationComponentsPage.clickOnCreateButton();
    mealTypeTranslationUpdatePage = new MealTypeTranslationUpdatePage();
    expect(await mealTypeTranslationUpdatePage.getPageTitle()).to.eq('gatewayApp.recipesMealTypeTranslation.home.createOrEditLabel');
    await mealTypeTranslationUpdatePage.cancel();
  });

  /* it('should create and save MealTypeTranslations', async () => {
        const nbButtonsBeforeCreate = await mealTypeTranslationComponentsPage.countDeleteButtons();

        await mealTypeTranslationComponentsPage.clickOnCreateButton();
        await promise.all([
            mealTypeTranslationUpdatePage.setTranslationInput('translation'),
            mealTypeTranslationUpdatePage.setLanguageInput('language'),
            mealTypeTranslationUpdatePage.mealTypeSelectLastOption(),
        ]);
        expect(await mealTypeTranslationUpdatePage.getTranslationInput()).to.eq('translation', 'Expected Translation value to be equals to translation');
        expect(await mealTypeTranslationUpdatePage.getLanguageInput()).to.eq('language', 'Expected Language value to be equals to language');
        await mealTypeTranslationUpdatePage.save();
        expect(await mealTypeTranslationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await mealTypeTranslationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last MealTypeTranslation', async () => {
        const nbButtonsBeforeDelete = await mealTypeTranslationComponentsPage.countDeleteButtons();
        await mealTypeTranslationComponentsPage.clickOnLastDeleteButton();

        mealTypeTranslationDeleteDialog = new MealTypeTranslationDeleteDialog();
        expect(await mealTypeTranslationDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.recipesMealTypeTranslation.delete.question');
        await mealTypeTranslationDeleteDialog.clickOnConfirmButton();

        expect(await mealTypeTranslationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
