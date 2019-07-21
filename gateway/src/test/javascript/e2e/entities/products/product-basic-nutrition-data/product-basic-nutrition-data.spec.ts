/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  ProductBasicNutritionDataComponentsPage,
  ProductBasicNutritionDataDeleteDialog,
  ProductBasicNutritionDataUpdatePage
} from './product-basic-nutrition-data.page-object';

const expect = chai.expect;

describe('ProductBasicNutritionData e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let productBasicNutritionDataUpdatePage: ProductBasicNutritionDataUpdatePage;
  let productBasicNutritionDataComponentsPage: ProductBasicNutritionDataComponentsPage;
  /*let productBasicNutritionDataDeleteDialog: ProductBasicNutritionDataDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProductBasicNutritionData', async () => {
    await navBarPage.goToEntity('product-basic-nutrition-data');
    productBasicNutritionDataComponentsPage = new ProductBasicNutritionDataComponentsPage();
    await browser.wait(ec.visibilityOf(productBasicNutritionDataComponentsPage.title), 5000);
    expect(await productBasicNutritionDataComponentsPage.getTitle()).to.eq('gatewayApp.productsProductBasicNutritionData.home.title');
  });

  it('should load create ProductBasicNutritionData page', async () => {
    await productBasicNutritionDataComponentsPage.clickOnCreateButton();
    productBasicNutritionDataUpdatePage = new ProductBasicNutritionDataUpdatePage();
    expect(await productBasicNutritionDataUpdatePage.getPageTitle()).to.eq(
      'gatewayApp.productsProductBasicNutritionData.home.createOrEditLabel'
    );
    await productBasicNutritionDataUpdatePage.cancel();
  });

  /* it('should create and save ProductBasicNutritionData', async () => {
        const nbButtonsBeforeCreate = await productBasicNutritionDataComponentsPage.countDeleteButtons();

        await productBasicNutritionDataComponentsPage.clickOnCreateButton();
        await promise.all([
            productBasicNutritionDataUpdatePage.setEnergyInput('5'),
            productBasicNutritionDataUpdatePage.setProteinInput('5'),
            productBasicNutritionDataUpdatePage.setFatInput('5'),
            productBasicNutritionDataUpdatePage.setCarbohydratesInput('5'),
            productBasicNutritionDataUpdatePage.productSelectLastOption(),
        ]);
        expect(await productBasicNutritionDataUpdatePage.getEnergyInput()).to.eq('5', 'Expected energy value to be equals to 5');
        expect(await productBasicNutritionDataUpdatePage.getProteinInput()).to.eq('5', 'Expected protein value to be equals to 5');
        expect(await productBasicNutritionDataUpdatePage.getFatInput()).to.eq('5', 'Expected fat value to be equals to 5');
        expect(await productBasicNutritionDataUpdatePage.getCarbohydratesInput()).to.eq('5', 'Expected carbohydrates value to be equals to 5');
        await productBasicNutritionDataUpdatePage.save();
        expect(await productBasicNutritionDataUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await productBasicNutritionDataComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last ProductBasicNutritionData', async () => {
        const nbButtonsBeforeDelete = await productBasicNutritionDataComponentsPage.countDeleteButtons();
        await productBasicNutritionDataComponentsPage.clickOnLastDeleteButton();

        productBasicNutritionDataDeleteDialog = new ProductBasicNutritionDataDeleteDialog();
        expect(await productBasicNutritionDataDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.productsProductBasicNutritionData.delete.question');
        await productBasicNutritionDataDeleteDialog.clickOnConfirmButton();

        expect(await productBasicNutritionDataComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
