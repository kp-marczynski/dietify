/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MealComponentsPage, MealDeleteDialog, MealUpdatePage } from './meal.page-object';

const expect = chai.expect;

describe('Meal e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let mealUpdatePage: MealUpdatePage;
    let mealComponentsPage: MealComponentsPage;
    /*let mealDeleteDialog: MealDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Meals', async () => {
        await navBarPage.goToEntity('meal');
        mealComponentsPage = new MealComponentsPage();
        await browser.wait(ec.visibilityOf(mealComponentsPage.title), 5000);
        expect(await mealComponentsPage.getTitle()).to.eq('Meals');
    });

    it('should load create Meal page', async () => {
        await mealComponentsPage.clickOnCreateButton();
        mealUpdatePage = new MealUpdatePage();
        expect(await mealUpdatePage.getPageTitle()).to.eq('Create or edit a Meal');
        await mealUpdatePage.cancel();
    });

    /* it('should create and save Meals', async () => {
        const nbButtonsBeforeCreate = await mealComponentsPage.countDeleteButtons();

        await mealComponentsPage.clickOnCreateButton();
        await promise.all([
            mealUpdatePage.setOrdinalNumberInput('5'),
            mealUpdatePage.daySelectLastOption(),
        ]);
        expect(await mealUpdatePage.getOrdinalNumberInput()).to.eq('5');
        await mealUpdatePage.save();
        expect(await mealUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await mealComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last Meal', async () => {
        const nbButtonsBeforeDelete = await mealComponentsPage.countDeleteButtons();
        await mealComponentsPage.clickOnLastDeleteButton();

        mealDeleteDialog = new MealDeleteDialog();
        expect(await mealDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Meal?');
        await mealDeleteDialog.clickOnConfirmButton();

        expect(await mealComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
