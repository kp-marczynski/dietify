/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

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
        expect(await productPortionComponentsPage.getTitle()).to.eq('Product Portions');
    });

    it('should load create ProductPortion page', async () => {
        await productPortionComponentsPage.clickOnCreateButton();
        productPortionUpdatePage = new ProductPortionUpdatePage();
        expect(await productPortionUpdatePage.getPageTitle()).to.eq('Create or edit a Product Portion');
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
        expect(await productPortionUpdatePage.getAmountInput()).to.eq('5');
        expect(await productPortionUpdatePage.getProductIdInput()).to.eq('5');
        expect(await productPortionUpdatePage.getHouseholdMeasureIdInput()).to.eq('5');
        await productPortionUpdatePage.save();
        expect(await productPortionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await productPortionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last ProductPortion', async () => {
        const nbButtonsBeforeDelete = await productPortionComponentsPage.countDeleteButtons();
        await productPortionComponentsPage.clickOnLastDeleteButton();

        productPortionDeleteDialog = new ProductPortionDeleteDialog();
        expect(await productPortionDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Product Portion?');
        await productPortionDeleteDialog.clickOnConfirmButton();

        expect(await productPortionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
