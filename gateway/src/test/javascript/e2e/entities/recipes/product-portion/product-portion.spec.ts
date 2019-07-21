/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ProductPortionComponentsPage, ProductPortionDeleteDialog, ProductPortionUpdatePage } from './product-portion.page-object';

const expect = chai.expect;

describe('ProductPortion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let productPortionUpdatePage: ProductPortionUpdatePage;
  let productPortionComponentsPage: ProductPortionComponentsPage;
  /*let productPortionDeleteDialog: ProductPortionDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProductPortions', async () => {
    await navBarPage.goToEntity('product-portion');
    productPortionComponentsPage = new ProductPortionComponentsPage();
    await browser.wait(ec.visibilityOf(productPortionComponentsPage.title), 5000);
    expect(await productPortionComponentsPage.getTitle()).to.eq('gatewayApp.recipesProductPortion.home.title');
  });

  it('should load create ProductPortion page', async () => {
    await productPortionComponentsPage.clickOnCreateButton();
    productPortionUpdatePage = new ProductPortionUpdatePage();
    expect(await productPortionUpdatePage.getPageTitle()).to.eq('gatewayApp.recipesProductPortion.home.createOrEditLabel');
    await productPortionUpdatePage.cancel();
  });

  /* it('should create and save ProductPortions', async () => {
        const nbButtonsBeforeCreate = await productPortionComponentsPage.countDeleteButtons();

        await productPortionComponentsPage.clickOnCreateButton();
        await promise.all([
            productPortionUpdatePage.setAmountInput('5'),
            productPortionUpdatePage.setProductIdInput('5'),
            productPortionUpdatePage.setHouseholdMeasureIdInput('5'),
            productPortionUpdatePage.recipeSectionSelectLastOption(),
        ]);
        expect(await productPortionUpdatePage.getAmountInput()).to.eq('5', 'Expected amount value to be equals to 5');
        expect(await productPortionUpdatePage.getProductIdInput()).to.eq('5', 'Expected productId value to be equals to 5');
        expect(await productPortionUpdatePage.getHouseholdMeasureIdInput()).to.eq('5', 'Expected householdMeasureId value to be equals to 5');
        await productPortionUpdatePage.save();
        expect(await productPortionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await productPortionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last ProductPortion', async () => {
        const nbButtonsBeforeDelete = await productPortionComponentsPage.countDeleteButtons();
        await productPortionComponentsPage.clickOnLastDeleteButton();

        productPortionDeleteDialog = new ProductPortionDeleteDialog();
        expect(await productPortionDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.recipesProductPortion.delete.question');
        await productPortionDeleteDialog.clickOnConfirmButton();

        expect(await productPortionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
