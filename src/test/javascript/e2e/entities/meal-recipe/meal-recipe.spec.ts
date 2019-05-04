/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MealRecipeComponentsPage, MealRecipeDeleteDialog, MealRecipeUpdatePage } from './meal-recipe.page-object';

const expect = chai.expect;

describe('MealRecipe e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let mealRecipeUpdatePage: MealRecipeUpdatePage;
    let mealRecipeComponentsPage: MealRecipeComponentsPage;
    /*let mealRecipeDeleteDialog: MealRecipeDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load MealRecipes', async () => {
        await navBarPage.goToEntity('meal-recipe');
        mealRecipeComponentsPage = new MealRecipeComponentsPage();
        await browser.wait(ec.visibilityOf(mealRecipeComponentsPage.title), 5000);
        expect(await mealRecipeComponentsPage.getTitle()).to.eq('Meal Recipes');
    });

    it('should load create MealRecipe page', async () => {
        await mealRecipeComponentsPage.clickOnCreateButton();
        mealRecipeUpdatePage = new MealRecipeUpdatePage();
        expect(await mealRecipeUpdatePage.getPageTitle()).to.eq('Create or edit a Meal Recipe');
        await mealRecipeUpdatePage.cancel();
    });

    /* it('should create and save MealRecipes', async () => {
        const nbButtonsBeforeCreate = await mealRecipeComponentsPage.countDeleteButtons();

        await mealRecipeComponentsPage.clickOnCreateButton();
        await promise.all([
            mealRecipeUpdatePage.setRecipeIdInput('5'),
            mealRecipeUpdatePage.setAmountInput('5'),
            mealRecipeUpdatePage.mealSelectLastOption(),
        ]);
        expect(await mealRecipeUpdatePage.getRecipeIdInput()).to.eq('5');
        expect(await mealRecipeUpdatePage.getAmountInput()).to.eq('5');
        await mealRecipeUpdatePage.save();
        expect(await mealRecipeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await mealRecipeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last MealRecipe', async () => {
        const nbButtonsBeforeDelete = await mealRecipeComponentsPage.countDeleteButtons();
        await mealRecipeComponentsPage.clickOnLastDeleteButton();

        mealRecipeDeleteDialog = new MealRecipeDeleteDialog();
        expect(await mealRecipeDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Meal Recipe?');
        await mealRecipeDeleteDialog.clickOnConfirmButton();

        expect(await mealRecipeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
