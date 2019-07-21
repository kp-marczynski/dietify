/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  NutritionDefinitionComponentsPage,
  NutritionDefinitionDeleteDialog,
  NutritionDefinitionUpdatePage
} from './nutrition-definition.page-object';

const expect = chai.expect;

describe('NutritionDefinition e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let nutritionDefinitionUpdatePage: NutritionDefinitionUpdatePage;
  let nutritionDefinitionComponentsPage: NutritionDefinitionComponentsPage;
  let nutritionDefinitionDeleteDialog: NutritionDefinitionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NutritionDefinitions', async () => {
    await navBarPage.goToEntity('nutrition-definition');
    nutritionDefinitionComponentsPage = new NutritionDefinitionComponentsPage();
    await browser.wait(ec.visibilityOf(nutritionDefinitionComponentsPage.title), 5000);
    expect(await nutritionDefinitionComponentsPage.getTitle()).to.eq('gatewayApp.productsNutritionDefinition.home.title');
  });

  it('should load create NutritionDefinition page', async () => {
    await nutritionDefinitionComponentsPage.clickOnCreateButton();
    nutritionDefinitionUpdatePage = new NutritionDefinitionUpdatePage();
    expect(await nutritionDefinitionUpdatePage.getPageTitle()).to.eq('gatewayApp.productsNutritionDefinition.home.createOrEditLabel');
    await nutritionDefinitionUpdatePage.cancel();
  });

  it('should create and save NutritionDefinitions', async () => {
    const nbButtonsBeforeCreate = await nutritionDefinitionComponentsPage.countDeleteButtons();

    await nutritionDefinitionComponentsPage.clickOnCreateButton();
    await promise.all([
      nutritionDefinitionUpdatePage.setTagInput('tag'),
      nutritionDefinitionUpdatePage.setDescriptionInput('description'),
      nutritionDefinitionUpdatePage.setUnitsInput('units'),
      nutritionDefinitionUpdatePage.setDecimalPlacesInput('5')
    ]);
    expect(await nutritionDefinitionUpdatePage.getTagInput()).to.eq('tag', 'Expected Tag value to be equals to tag');
    expect(await nutritionDefinitionUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    expect(await nutritionDefinitionUpdatePage.getUnitsInput()).to.eq('units', 'Expected Units value to be equals to units');
    expect(await nutritionDefinitionUpdatePage.getDecimalPlacesInput()).to.eq('5', 'Expected decimalPlaces value to be equals to 5');
    await nutritionDefinitionUpdatePage.save();
    expect(await nutritionDefinitionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await nutritionDefinitionComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last NutritionDefinition', async () => {
    const nbButtonsBeforeDelete = await nutritionDefinitionComponentsPage.countDeleteButtons();
    await nutritionDefinitionComponentsPage.clickOnLastDeleteButton();

    nutritionDefinitionDeleteDialog = new NutritionDefinitionDeleteDialog();
    expect(await nutritionDefinitionDeleteDialog.getDialogTitle()).to.eq('gatewayApp.productsNutritionDefinition.delete.question');
    await nutritionDefinitionDeleteDialog.clickOnConfirmButton();

    expect(await nutritionDefinitionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
