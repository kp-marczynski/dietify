/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  NutritionDefinitionTranslationComponentsPage,
  NutritionDefinitionTranslationDeleteDialog,
  NutritionDefinitionTranslationUpdatePage
} from './nutrition-definition-translation.page-object';

const expect = chai.expect;

describe('NutritionDefinitionTranslation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let nutritionDefinitionTranslationUpdatePage: NutritionDefinitionTranslationUpdatePage;
  let nutritionDefinitionTranslationComponentsPage: NutritionDefinitionTranslationComponentsPage;
  /*let nutritionDefinitionTranslationDeleteDialog: NutritionDefinitionTranslationDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NutritionDefinitionTranslations', async () => {
    await navBarPage.goToEntity('nutrition-definition-translation');
    nutritionDefinitionTranslationComponentsPage = new NutritionDefinitionTranslationComponentsPage();
    await browser.wait(ec.visibilityOf(nutritionDefinitionTranslationComponentsPage.title), 5000);
    expect(await nutritionDefinitionTranslationComponentsPage.getTitle()).to.eq(
      'gatewayApp.productsNutritionDefinitionTranslation.home.title'
    );
  });

  it('should load create NutritionDefinitionTranslation page', async () => {
    await nutritionDefinitionTranslationComponentsPage.clickOnCreateButton();
    nutritionDefinitionTranslationUpdatePage = new NutritionDefinitionTranslationUpdatePage();
    expect(await nutritionDefinitionTranslationUpdatePage.getPageTitle()).to.eq(
      'gatewayApp.productsNutritionDefinitionTranslation.home.createOrEditLabel'
    );
    await nutritionDefinitionTranslationUpdatePage.cancel();
  });

  /* it('should create and save NutritionDefinitionTranslations', async () => {
        const nbButtonsBeforeCreate = await nutritionDefinitionTranslationComponentsPage.countDeleteButtons();

        await nutritionDefinitionTranslationComponentsPage.clickOnCreateButton();
        await promise.all([
            nutritionDefinitionTranslationUpdatePage.setTranslationInput('translation'),
            nutritionDefinitionTranslationUpdatePage.setLanguageInput('language'),
            nutritionDefinitionTranslationUpdatePage.nutritionDefinitionSelectLastOption(),
        ]);
        expect(await nutritionDefinitionTranslationUpdatePage.getTranslationInput()).to.eq('translation', 'Expected Translation value to be equals to translation');
        expect(await nutritionDefinitionTranslationUpdatePage.getLanguageInput()).to.eq('language', 'Expected Language value to be equals to language');
        await nutritionDefinitionTranslationUpdatePage.save();
        expect(await nutritionDefinitionTranslationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await nutritionDefinitionTranslationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last NutritionDefinitionTranslation', async () => {
        const nbButtonsBeforeDelete = await nutritionDefinitionTranslationComponentsPage.countDeleteButtons();
        await nutritionDefinitionTranslationComponentsPage.clickOnLastDeleteButton();

        nutritionDefinitionTranslationDeleteDialog = new NutritionDefinitionTranslationDeleteDialog();
        expect(await nutritionDefinitionTranslationDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.productsNutritionDefinitionTranslation.delete.question');
        await nutritionDefinitionTranslationDeleteDialog.clickOnConfirmButton();

        expect(await nutritionDefinitionTranslationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
