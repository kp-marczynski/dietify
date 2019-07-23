/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  ProductSubcategoryComponentsPage,
  ProductSubcategoryDeleteDialog,
  ProductSubcategoryUpdatePage
} from './product-subcategory.page-object';

const expect = chai.expect;

describe('ProductSubcategory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let productSubcategoryUpdatePage: ProductSubcategoryUpdatePage;
  let productSubcategoryComponentsPage: ProductSubcategoryComponentsPage;
  /*let productSubcategoryDeleteDialog: ProductSubcategoryDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProductSubcategories', async () => {
    await navBarPage.goToEntity('product-subcategory');
    productSubcategoryComponentsPage = new ProductSubcategoryComponentsPage();
    await browser.wait(ec.visibilityOf(productSubcategoryComponentsPage.title), 5000);
    expect(await productSubcategoryComponentsPage.getTitle()).to.eq('gatewayApp.productsProductSubcategory.home.title');
  });

  it('should load create ProductSubcategory page', async () => {
    await productSubcategoryComponentsPage.clickOnCreateButton();
    productSubcategoryUpdatePage = new ProductSubcategoryUpdatePage();
    expect(await productSubcategoryUpdatePage.getPageTitle()).to.eq('gatewayApp.productsProductSubcategory.home.createOrEditLabel');
    await productSubcategoryUpdatePage.cancel();
  });

  /* it('should create and save ProductSubcategories', async () => {
        const nbButtonsBeforeCreate = await productSubcategoryComponentsPage.countDeleteButtons();

        await productSubcategoryComponentsPage.clickOnCreateButton();
        await promise.all([
            productSubcategoryUpdatePage.setDescriptionInput('description'),
            productSubcategoryUpdatePage.categorySelectLastOption(),
        ]);
        expect(await productSubcategoryUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
        await productSubcategoryUpdatePage.save();
        expect(await productSubcategoryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await productSubcategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last ProductSubcategory', async () => {
        const nbButtonsBeforeDelete = await productSubcategoryComponentsPage.countDeleteButtons();
        await productSubcategoryComponentsPage.clickOnLastDeleteButton();

        productSubcategoryDeleteDialog = new ProductSubcategoryDeleteDialog();
        expect(await productSubcategoryDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.productsProductSubcategory.delete.question');
        await productSubcategoryDeleteDialog.clickOnConfirmButton();

        expect(await productSubcategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
