/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MealPlanComponentsPage, MealPlanDeleteDialog, MealPlanUpdatePage } from './meal-plan.page-object';

const expect = chai.expect;

describe('MealPlan e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let mealPlanUpdatePage: MealPlanUpdatePage;
    let mealPlanComponentsPage: MealPlanComponentsPage;
    /*let mealPlanDeleteDialog: MealPlanDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load MealPlans', async () => {
        await navBarPage.goToEntity('meal-plan');
        mealPlanComponentsPage = new MealPlanComponentsPage();
        await browser.wait(ec.visibilityOf(mealPlanComponentsPage.title), 5000);
        expect(await mealPlanComponentsPage.getTitle()).to.eq('Meal Plans');
    });

    it('should load create MealPlan page', async () => {
        await mealPlanComponentsPage.clickOnCreateButton();
        mealPlanUpdatePage = new MealPlanUpdatePage();
        expect(await mealPlanUpdatePage.getPageTitle()).to.eq('Create or edit a Meal Plan');
        await mealPlanUpdatePage.cancel();
    });

    /* it('should create and save MealPlans', async () => {
        const nbButtonsBeforeCreate = await mealPlanComponentsPage.countDeleteButtons();

        await mealPlanComponentsPage.clickOnCreateButton();
        await promise.all([
            mealPlanUpdatePage.setAuthorIdInput('5'),
            mealPlanUpdatePage.setCreationDateInput('2000-12-31'),
            mealPlanUpdatePage.setNameInput('name'),
            mealPlanUpdatePage.setLanguageIdInput('5'),
            mealPlanUpdatePage.setNumberOfDaysInput('5'),
            mealPlanUpdatePage.setNumberOfMealsPerDayInput('5'),
            mealPlanUpdatePage.setTotalDailyEnergyKcalInput('5'),
            mealPlanUpdatePage.setPercentOfProteinInput('5'),
            mealPlanUpdatePage.setPercentOfFatInput('5'),
            mealPlanUpdatePage.setPercentOfCarbohydratesInput('5'),
        ]);
        expect(await mealPlanUpdatePage.getAuthorIdInput()).to.eq('5');
        expect(await mealPlanUpdatePage.getCreationDateInput()).to.eq('2000-12-31');
        expect(await mealPlanUpdatePage.getNameInput()).to.eq('name');
        const selectedIsVisible = mealPlanUpdatePage.getIsVisibleInput();
        if (await selectedIsVisible.isSelected()) {
            await mealPlanUpdatePage.getIsVisibleInput().click();
            expect(await mealPlanUpdatePage.getIsVisibleInput().isSelected()).to.be.false;
        } else {
            await mealPlanUpdatePage.getIsVisibleInput().click();
            expect(await mealPlanUpdatePage.getIsVisibleInput().isSelected()).to.be.true;
        }
        const selectedIsLocked = mealPlanUpdatePage.getIsLockedInput();
        if (await selectedIsLocked.isSelected()) {
            await mealPlanUpdatePage.getIsLockedInput().click();
            expect(await mealPlanUpdatePage.getIsLockedInput().isSelected()).to.be.false;
        } else {
            await mealPlanUpdatePage.getIsLockedInput().click();
            expect(await mealPlanUpdatePage.getIsLockedInput().isSelected()).to.be.true;
        }
        expect(await mealPlanUpdatePage.getLanguageIdInput()).to.eq('5');
        expect(await mealPlanUpdatePage.getNumberOfDaysInput()).to.eq('5');
        expect(await mealPlanUpdatePage.getNumberOfMealsPerDayInput()).to.eq('5');
        expect(await mealPlanUpdatePage.getTotalDailyEnergyKcalInput()).to.eq('5');
        expect(await mealPlanUpdatePage.getPercentOfProteinInput()).to.eq('5');
        expect(await mealPlanUpdatePage.getPercentOfFatInput()).to.eq('5');
        expect(await mealPlanUpdatePage.getPercentOfCarbohydratesInput()).to.eq('5');
        await mealPlanUpdatePage.save();
        expect(await mealPlanUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await mealPlanComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last MealPlan', async () => {
        const nbButtonsBeforeDelete = await mealPlanComponentsPage.countDeleteButtons();
        await mealPlanComponentsPage.clickOnLastDeleteButton();

        mealPlanDeleteDialog = new MealPlanDeleteDialog();
        expect(await mealPlanDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Meal Plan?');
        await mealPlanDeleteDialog.clickOnConfirmButton();

        expect(await mealPlanComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
