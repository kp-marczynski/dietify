/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MealProductComponentsPage, MealProductDeleteDialog, MealProductUpdatePage } from './meal-product.page-object';

const expect = chai.expect;

describe('MealProduct e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let mealProductUpdatePage: MealProductUpdatePage;
    let mealProductComponentsPage: MealProductComponentsPage;
    /*let mealProductDeleteDialog: MealProductDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load MealProducts', async () => {
        await navBarPage.goToEntity('meal-product');
        mealProductComponentsPage = new MealProductComponentsPage();
        await browser.wait(ec.visibilityOf(mealProductComponentsPage.title), 5000);
        expect(await mealProductComponentsPage.getTitle()).to.eq('Meal Products');
    });

    it('should load create MealProduct page', async () => {
        await mealProductComponentsPage.clickOnCreateButton();
        mealProductUpdatePage = new MealProductUpdatePage();
        expect(await mealProductUpdatePage.getPageTitle()).to.eq('Create or edit a Meal Product');
        await mealProductUpdatePage.cancel();
    });

    /* it('should create and save MealProducts', async () => {
        const nbButtonsBeforeCreate = await mealProductComponentsPage.countDeleteButtons();

        await mealProductComponentsPage.clickOnCreateButton();
        await promise.all([
            mealProductUpdatePage.setProductIdInput('5'),
            mealProductUpdatePage.setHouseholdMeasureIdInput('5'),
            mealProductUpdatePage.setAmountInput('5'),
            mealProductUpdatePage.mealSelectLastOption(),
        ]);
        expect(await mealProductUpdatePage.getProductIdInput()).to.eq('5');
        expect(await mealProductUpdatePage.getHouseholdMeasureIdInput()).to.eq('5');
        expect(await mealProductUpdatePage.getAmountInput()).to.eq('5');
        await mealProductUpdatePage.save();
        expect(await mealProductUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await mealProductComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last MealProduct', async () => {
        const nbButtonsBeforeDelete = await mealProductComponentsPage.countDeleteButtons();
        await mealProductComponentsPage.clickOnLastDeleteButton();

        mealProductDeleteDialog = new MealProductDeleteDialog();
        expect(await mealProductDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Meal Product?');
        await mealProductDeleteDialog.clickOnConfirmButton();

        expect(await mealProductComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
