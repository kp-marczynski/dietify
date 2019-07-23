/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  ProductCategoryTranslationComponentsPage,
  ProductCategoryTranslationDeleteDialog,
  ProductCategoryTranslationUpdatePage
} from './product-category-translation.page-object';

const expect = chai.expect;

describe('ProductCategoryTranslation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let productCategoryTranslationUpdatePage: ProductCategoryTranslationUpdatePage;
  let productCategoryTranslationComponentsPage: ProductCategoryTranslationComponentsPage;
  /*let productCategoryTranslationDeleteDialog: ProductCategoryTranslationDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProductCategoryTranslations', async () => {
    await navBarPage.goToEntity('product-category-translation');
    productCategoryTranslationComponentsPage = new ProductCategoryTranslationComponentsPage();
    await browser.wait(ec.visibilityOf(productCategoryTranslationComponentsPage.title), 5000);
    expect(await productCategoryTranslationComponentsPage.getTitle()).to.eq('gatewayApp.productsProductCategoryTranslation.home.title');
  });

  it('should load create ProductCategoryTranslation page', async () => {
    await productCategoryTranslationComponentsPage.clickOnCreateButton();
    productCategoryTranslationUpdatePage = new ProductCategoryTranslationUpdatePage();
    expect(await productCategoryTranslationUpdatePage.getPageTitle()).to.eq(
      'gatewayApp.productsProductCategoryTranslation.home.createOrEditLabel'
    );
    await productCategoryTranslationUpdatePage.cancel();
  });

  /* it('should create and save ProductCategoryTranslations', async () => {
        const nbButtonsBeforeCreate = await productCategoryTranslationComponentsPage.countDeleteButtons();

        await productCategoryTranslationComponentsPage.clickOnCreateButton();
        await promise.all([
            productCategoryTranslationUpdatePage.setTranslationInput('translation'),
            productCategoryTranslationUpdatePage.setLanguageInput('language'),
            productCategoryTranslationUpdatePage.productCategorySelectLastOption(),
        ]);
        expect(await productCategoryTranslationUpdatePage.getTranslationInput()).to.eq('translation', 'Expected Translation value to be equals to translation');
        expect(await productCategoryTranslationUpdatePage.getLanguageInput()).to.eq('language', 'Expected Language value to be equals to language');
        await productCategoryTranslationUpdatePage.save();
        expect(await productCategoryTranslationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await productCategoryTranslationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last ProductCategoryTranslation', async () => {
        const nbButtonsBeforeDelete = await productCategoryTranslationComponentsPage.countDeleteButtons();
        await productCategoryTranslationComponentsPage.clickOnLastDeleteButton();

        productCategoryTranslationDeleteDialog = new ProductCategoryTranslationDeleteDialog();
        expect(await productCategoryTranslationDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.productsProductCategoryTranslation.delete.question');
        await productCategoryTranslationDeleteDialog.clickOnConfirmButton();

        expect(await productCategoryTranslationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
