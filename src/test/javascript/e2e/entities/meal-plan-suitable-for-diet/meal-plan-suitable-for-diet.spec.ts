/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    MealPlanSuitableForDietComponentsPage,
    MealPlanSuitableForDietDeleteDialog,
    MealPlanSuitableForDietUpdatePage
} from './meal-plan-suitable-for-diet.page-object';

const expect = chai.expect;

describe('MealPlanSuitableForDiet e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let mealPlanSuitableForDietUpdatePage: MealPlanSuitableForDietUpdatePage;
    let mealPlanSuitableForDietComponentsPage: MealPlanSuitableForDietComponentsPage;
    /*let mealPlanSuitableForDietDeleteDialog: MealPlanSuitableForDietDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load MealPlanSuitableForDiets', async () => {
        await navBarPage.goToEntity('meal-plan-suitable-for-diet');
        mealPlanSuitableForDietComponentsPage = new MealPlanSuitableForDietComponentsPage();
        await browser.wait(ec.visibilityOf(mealPlanSuitableForDietComponentsPage.title), 5000);
        expect(await mealPlanSuitableForDietComponentsPage.getTitle()).to.eq('Meal Plan Suitable For Diets');
    });

    it('should load create MealPlanSuitableForDiet page', async () => {
        await mealPlanSuitableForDietComponentsPage.clickOnCreateButton();
        mealPlanSuitableForDietUpdatePage = new MealPlanSuitableForDietUpdatePage();
        expect(await mealPlanSuitableForDietUpdatePage.getPageTitle()).to.eq('Create or edit a Meal Plan Suitable For Diet');
        await mealPlanSuitableForDietUpdatePage.cancel();
    });

    /* it('should create and save MealPlanSuitableForDiets', async () => {
        const nbButtonsBeforeCreate = await mealPlanSuitableForDietComponentsPage.countDeleteButtons();

        await mealPlanSuitableForDietComponentsPage.clickOnCreateButton();
        await promise.all([
            mealPlanSuitableForDietUpdatePage.setDietTypeIdInput('5'),
            mealPlanSuitableForDietUpdatePage.mealPlanSelectLastOption(),
        ]);
        expect(await mealPlanSuitableForDietUpdatePage.getDietTypeIdInput()).to.eq('5');
        await mealPlanSuitableForDietUpdatePage.save();
        expect(await mealPlanSuitableForDietUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await mealPlanSuitableForDietComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last MealPlanSuitableForDiet', async () => {
        const nbButtonsBeforeDelete = await mealPlanSuitableForDietComponentsPage.countDeleteButtons();
        await mealPlanSuitableForDietComponentsPage.clickOnLastDeleteButton();

        mealPlanSuitableForDietDeleteDialog = new MealPlanSuitableForDietDeleteDialog();
        expect(await mealPlanSuitableForDietDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Meal Plan Suitable For Diet?');
        await mealPlanSuitableForDietDeleteDialog.clickOnConfirmButton();

        expect(await mealPlanSuitableForDietComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
