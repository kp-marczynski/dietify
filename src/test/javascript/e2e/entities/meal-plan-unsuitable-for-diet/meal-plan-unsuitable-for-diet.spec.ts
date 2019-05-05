/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    MealPlanUnsuitableForDietComponentsPage,
    MealPlanUnsuitableForDietDeleteDialog,
    MealPlanUnsuitableForDietUpdatePage
} from './meal-plan-unsuitable-for-diet.page-object';

const expect = chai.expect;

describe('MealPlanUnsuitableForDiet e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let mealPlanUnsuitableForDietUpdatePage: MealPlanUnsuitableForDietUpdatePage;
    let mealPlanUnsuitableForDietComponentsPage: MealPlanUnsuitableForDietComponentsPage;
    /*let mealPlanUnsuitableForDietDeleteDialog: MealPlanUnsuitableForDietDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load MealPlanUnsuitableForDiets', async () => {
        await navBarPage.goToEntity('meal-plan-unsuitable-for-diet');
        mealPlanUnsuitableForDietComponentsPage = new MealPlanUnsuitableForDietComponentsPage();
        await browser.wait(ec.visibilityOf(mealPlanUnsuitableForDietComponentsPage.title), 5000);
        expect(await mealPlanUnsuitableForDietComponentsPage.getTitle()).to.eq('Meal Plan Unsuitable For Diets');
    });

    it('should load create MealPlanUnsuitableForDiet page', async () => {
        await mealPlanUnsuitableForDietComponentsPage.clickOnCreateButton();
        mealPlanUnsuitableForDietUpdatePage = new MealPlanUnsuitableForDietUpdatePage();
        expect(await mealPlanUnsuitableForDietUpdatePage.getPageTitle()).to.eq('Create or edit a Meal Plan Unsuitable For Diet');
        await mealPlanUnsuitableForDietUpdatePage.cancel();
    });

    /* it('should create and save MealPlanUnsuitableForDiets', async () => {
        const nbButtonsBeforeCreate = await mealPlanUnsuitableForDietComponentsPage.countDeleteButtons();

        await mealPlanUnsuitableForDietComponentsPage.clickOnCreateButton();
        await promise.all([
            mealPlanUnsuitableForDietUpdatePage.setDietTypeIdInput('5'),
            mealPlanUnsuitableForDietUpdatePage.mealPlanSelectLastOption(),
        ]);
        expect(await mealPlanUnsuitableForDietUpdatePage.getDietTypeIdInput()).to.eq('5');
        await mealPlanUnsuitableForDietUpdatePage.save();
        expect(await mealPlanUnsuitableForDietUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await mealPlanUnsuitableForDietComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last MealPlanUnsuitableForDiet', async () => {
        const nbButtonsBeforeDelete = await mealPlanUnsuitableForDietComponentsPage.countDeleteButtons();
        await mealPlanUnsuitableForDietComponentsPage.clickOnLastDeleteButton();

        mealPlanUnsuitableForDietDeleteDialog = new MealPlanUnsuitableForDietDeleteDialog();
        expect(await mealPlanUnsuitableForDietDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Meal Plan Unsuitable For Diet?');
        await mealPlanUnsuitableForDietDeleteDialog.clickOnConfirmButton();

        expect(await mealPlanUnsuitableForDietComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
