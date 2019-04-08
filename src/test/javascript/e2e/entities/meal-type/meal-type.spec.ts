/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MealTypeComponentsPage, MealTypeDeleteDialog, MealTypeUpdatePage } from './meal-type.page-object';

const expect = chai.expect;

describe('MealType e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let mealTypeUpdatePage: MealTypeUpdatePage;
    let mealTypeComponentsPage: MealTypeComponentsPage;
    let mealTypeDeleteDialog: MealTypeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        // await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load MealTypes', async () => {
        await navBarPage.goToEntity('meal-type');
        mealTypeComponentsPage = new MealTypeComponentsPage();
        await browser.wait(ec.visibilityOf(mealTypeComponentsPage.title), 5000);
        expect(await mealTypeComponentsPage.getTitle()).to.eq('Meal Types');
    });

    it('should load create MealType page', async () => {
        await mealTypeComponentsPage.clickOnCreateButton();
        mealTypeUpdatePage = new MealTypeUpdatePage();
        expect(await mealTypeUpdatePage.getPageTitle()).to.eq('Create or edit a Meal Type');
        await mealTypeUpdatePage.cancel();
    });

    it('should create and save MealTypes', async () => {
        const nbButtonsBeforeCreate = await mealTypeComponentsPage.countDeleteButtons();

        await mealTypeComponentsPage.clickOnCreateButton();
        await promise.all([mealTypeUpdatePage.setNamePolishInput('namePolish'), mealTypeUpdatePage.setNameEnglishInput('nameEnglish')]);
        expect(await mealTypeUpdatePage.getNamePolishInput()).to.eq('namePolish');
        expect(await mealTypeUpdatePage.getNameEnglishInput()).to.eq('nameEnglish');
        await mealTypeUpdatePage.save();
        expect(await mealTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await mealTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last MealType', async () => {
        const nbButtonsBeforeDelete = await mealTypeComponentsPage.countDeleteButtons();
        await mealTypeComponentsPage.clickOnLastDeleteButton();

        mealTypeDeleteDialog = new MealTypeDeleteDialog();
        expect(await mealTypeDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Meal Type?');
        await mealTypeDeleteDialog.clickOnConfirmButton();

        expect(await mealTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
