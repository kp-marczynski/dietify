/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MealPlanDayComponentsPage, MealPlanDayDeleteDialog, MealPlanDayUpdatePage } from './meal-plan-day.page-object';

const expect = chai.expect;

describe('MealPlanDay e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let mealPlanDayUpdatePage: MealPlanDayUpdatePage;
    let mealPlanDayComponentsPage: MealPlanDayComponentsPage;
    /*let mealPlanDayDeleteDialog: MealPlanDayDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load MealPlanDays', async () => {
        await navBarPage.goToEntity('meal-plan-day');
        mealPlanDayComponentsPage = new MealPlanDayComponentsPage();
        await browser.wait(ec.visibilityOf(mealPlanDayComponentsPage.title), 5000);
        expect(await mealPlanDayComponentsPage.getTitle()).to.eq('Meal Plan Days');
    });

    it('should load create MealPlanDay page', async () => {
        await mealPlanDayComponentsPage.clickOnCreateButton();
        mealPlanDayUpdatePage = new MealPlanDayUpdatePage();
        expect(await mealPlanDayUpdatePage.getPageTitle()).to.eq('Create or edit a Meal Plan Day');
        await mealPlanDayUpdatePage.cancel();
    });

    /* it('should create and save MealPlanDays', async () => {
        const nbButtonsBeforeCreate = await mealPlanDayComponentsPage.countDeleteButtons();

        await mealPlanDayComponentsPage.clickOnCreateButton();
        await promise.all([
            mealPlanDayUpdatePage.setOrdinalNumberInput('5'),
            mealPlanDayUpdatePage.mealPlanSelectLastOption(),
        ]);
        expect(await mealPlanDayUpdatePage.getOrdinalNumberInput()).to.eq('5');
        await mealPlanDayUpdatePage.save();
        expect(await mealPlanDayUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await mealPlanDayComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last MealPlanDay', async () => {
        const nbButtonsBeforeDelete = await mealPlanDayComponentsPage.countDeleteButtons();
        await mealPlanDayComponentsPage.clickOnLastDeleteButton();

        mealPlanDayDeleteDialog = new MealPlanDayDeleteDialog();
        expect(await mealPlanDayDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Meal Plan Day?');
        await mealPlanDayDeleteDialog.clickOnConfirmButton();

        expect(await mealPlanDayComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
