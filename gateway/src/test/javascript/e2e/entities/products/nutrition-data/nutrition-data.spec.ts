/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { NutritionDataComponentsPage, NutritionDataDeleteDialog, NutritionDataUpdatePage } from './nutrition-data.page-object';

const expect = chai.expect;

describe('NutritionData e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let nutritionDataUpdatePage: NutritionDataUpdatePage;
  let nutritionDataComponentsPage: NutritionDataComponentsPage;
  /*let nutritionDataDeleteDialog: NutritionDataDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NutritionData', async () => {
    await navBarPage.goToEntity('nutrition-data');
    nutritionDataComponentsPage = new NutritionDataComponentsPage();
    await browser.wait(ec.visibilityOf(nutritionDataComponentsPage.title), 5000);
    expect(await nutritionDataComponentsPage.getTitle()).to.eq('gatewayApp.productsNutritionData.home.title');
  });

  it('should load create NutritionData page', async () => {
    await nutritionDataComponentsPage.clickOnCreateButton();
    nutritionDataUpdatePage = new NutritionDataUpdatePage();
    expect(await nutritionDataUpdatePage.getPageTitle()).to.eq('gatewayApp.productsNutritionData.home.createOrEditLabel');
    await nutritionDataUpdatePage.cancel();
  });

  /* it('should create and save NutritionData', async () => {
        const nbButtonsBeforeCreate = await nutritionDataComponentsPage.countDeleteButtons();

        await nutritionDataComponentsPage.clickOnCreateButton();
        await promise.all([
            nutritionDataUpdatePage.setNutritionValueInput('5'),
            nutritionDataUpdatePage.nutritionDefinitionSelectLastOption(),
            nutritionDataUpdatePage.productSelectLastOption(),
        ]);
        expect(await nutritionDataUpdatePage.getNutritionValueInput()).to.eq('5', 'Expected nutritionValue value to be equals to 5');
        await nutritionDataUpdatePage.save();
        expect(await nutritionDataUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await nutritionDataComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last NutritionData', async () => {
        const nbButtonsBeforeDelete = await nutritionDataComponentsPage.countDeleteButtons();
        await nutritionDataComponentsPage.clickOnLastDeleteButton();

        nutritionDataDeleteDialog = new NutritionDataDeleteDialog();
        expect(await nutritionDataDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.productsNutritionData.delete.question');
        await nutritionDataDeleteDialog.clickOnConfirmButton();

        expect(await nutritionDataComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
