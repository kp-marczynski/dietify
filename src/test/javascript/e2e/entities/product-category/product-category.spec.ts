/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProductCategoryComponentsPage, ProductCategoryDeleteDialog, ProductCategoryUpdatePage } from './product-category.page-object';

const expect = chai.expect;

describe('ProductCategory e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let productCategoryUpdatePage: ProductCategoryUpdatePage;
    let productCategoryComponentsPage: ProductCategoryComponentsPage;
    let productCategoryDeleteDialog: ProductCategoryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        // await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ProductCategories', async () => {
        await navBarPage.goToEntity('product-category');
        productCategoryComponentsPage = new ProductCategoryComponentsPage();
        await browser.wait(ec.visibilityOf(productCategoryComponentsPage.title), 5000);
        expect(await productCategoryComponentsPage.getTitle()).to.eq('Product Categories');
    });

    it('should load create ProductCategory page', async () => {
        await productCategoryComponentsPage.clickOnCreateButton();
        productCategoryUpdatePage = new ProductCategoryUpdatePage();
        expect(await productCategoryUpdatePage.getPageTitle()).to.eq('Create or edit a Product Category');
        await productCategoryUpdatePage.cancel();
    });

    it('should create and save ProductCategories', async () => {
        const nbButtonsBeforeCreate = await productCategoryComponentsPage.countDeleteButtons();

        await productCategoryComponentsPage.clickOnCreateButton();
        await promise.all([
            productCategoryUpdatePage.setDescriptionPolishInput('descriptionPolish'),
            productCategoryUpdatePage.setDescriptionEnglishInput('descriptionEnglish')
        ]);
        expect(await productCategoryUpdatePage.getDescriptionPolishInput()).to.eq('descriptionPolish');
        expect(await productCategoryUpdatePage.getDescriptionEnglishInput()).to.eq('descriptionEnglish');
        await productCategoryUpdatePage.save();
        expect(await productCategoryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await productCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ProductCategory', async () => {
        const nbButtonsBeforeDelete = await productCategoryComponentsPage.countDeleteButtons();
        await productCategoryComponentsPage.clickOnLastDeleteButton();

        productCategoryDeleteDialog = new ProductCategoryDeleteDialog();
        expect(await productCategoryDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Product Category?');
        await productCategoryDeleteDialog.clickOnConfirmButton();

        expect(await productCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
