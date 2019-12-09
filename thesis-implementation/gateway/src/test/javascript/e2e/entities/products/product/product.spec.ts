/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ProductComponentsPage, ProductDeleteDialog, ProductUpdatePage } from './product.page-object';

const expect = chai.expect;

describe('Product e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let productUpdatePage: ProductUpdatePage;
  let productComponentsPage: ProductComponentsPage;
  /*let productDeleteDialog: ProductDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Products', async () => {
    await navBarPage.goToEntity('product');
    productComponentsPage = new ProductComponentsPage();
    await browser.wait(ec.visibilityOf(productComponentsPage.title), 5000);
    expect(await productComponentsPage.getTitle()).to.eq('gatewayApp.productsProduct.home.title');
  });

  it('should load create Product page', async () => {
    await productComponentsPage.clickOnCreateButton();
    productUpdatePage = new ProductUpdatePage();
    expect(await productUpdatePage.getPageTitle()).to.eq('gatewayApp.productsProduct.home.createOrEditLabel');
    await productUpdatePage.cancel();
  });

  /* it('should create and save Products', async () => {
        const nbButtonsBeforeCreate = await productComponentsPage.countDeleteButtons();

        await productComponentsPage.clickOnCreateButton();
        await promise.all([
            productUpdatePage.setSourceInput('source'),
            productUpdatePage.setAuthorIdInput('5'),
            productUpdatePage.setDescriptionInput('description'),
            productUpdatePage.setLanguageInput('language'),
            productUpdatePage.basicNutritionDataSelectLastOption(),
            productUpdatePage.subcategorySelectLastOption(),
            // productUpdatePage.suitableDietsSelectLastOption(),
            // productUpdatePage.unsuitableDietsSelectLastOption(),
        ]);
        expect(await productUpdatePage.getSourceInput()).to.eq('source', 'Expected Source value to be equals to source');
        expect(await productUpdatePage.getAuthorIdInput()).to.eq('5', 'Expected authorId value to be equals to 5');
        expect(await productUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
        const selectedIsFinal = productUpdatePage.getIsFinalInput();
        if (await selectedIsFinal.isSelected()) {
            await productUpdatePage.getIsFinalInput().click();
            expect(await productUpdatePage.getIsFinalInput().isSelected(), 'Expected isFinal not to be selected').to.be.false;
        } else {
            await productUpdatePage.getIsFinalInput().click();
            expect(await productUpdatePage.getIsFinalInput().isSelected(), 'Expected isFinal to be selected').to.be.true;
        }
        const selectedIsVerified = productUpdatePage.getIsVerifiedInput();
        if (await selectedIsVerified.isSelected()) {
            await productUpdatePage.getIsVerifiedInput().click();
            expect(await productUpdatePage.getIsVerifiedInput().isSelected(), 'Expected isVerified not to be selected').to.be.false;
        } else {
            await productUpdatePage.getIsVerifiedInput().click();
            expect(await productUpdatePage.getIsVerifiedInput().isSelected(), 'Expected isVerified to be selected').to.be.true;
        }
        expect(await productUpdatePage.getLanguageInput()).to.eq('language', 'Expected Language value to be equals to language');
        await productUpdatePage.save();
        expect(await productUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await productComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last Product', async () => {
        const nbButtonsBeforeDelete = await productComponentsPage.countDeleteButtons();
        await productComponentsPage.clickOnLastDeleteButton();

        productDeleteDialog = new ProductDeleteDialog();
        expect(await productDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.productsProduct.delete.question');
        await productDeleteDialog.clickOnConfirmButton();

        expect(await productComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
