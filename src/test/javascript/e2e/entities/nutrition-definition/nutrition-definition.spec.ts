/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    NutritionDefinitionComponentsPage,
    NutritionDefinitionDeleteDialog,
    NutritionDefinitionUpdatePage
} from './nutrition-definition.page-object';

const expect = chai.expect;

describe('NutritionDefinition e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let nutritionDefinitionUpdatePage: NutritionDefinitionUpdatePage;
    let nutritionDefinitionComponentsPage: NutritionDefinitionComponentsPage;
    let nutritionDefinitionDeleteDialog: NutritionDefinitionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        // await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load NutritionDefinitions', async () => {
        await navBarPage.goToEntity('nutrition-definition');
        nutritionDefinitionComponentsPage = new NutritionDefinitionComponentsPage();
        await browser.wait(ec.visibilityOf(nutritionDefinitionComponentsPage.title), 5000);
        expect(await nutritionDefinitionComponentsPage.getTitle()).to.eq('Nutrition Definitions');
    });

    it('should load create NutritionDefinition page', async () => {
        await nutritionDefinitionComponentsPage.clickOnCreateButton();
        nutritionDefinitionUpdatePage = new NutritionDefinitionUpdatePage();
        expect(await nutritionDefinitionUpdatePage.getPageTitle()).to.eq('Create or edit a Nutrition Definition');
        await nutritionDefinitionUpdatePage.cancel();
    });

    it('should create and save NutritionDefinitions', async () => {
        const nbButtonsBeforeCreate = await nutritionDefinitionComponentsPage.countDeleteButtons();

        await nutritionDefinitionComponentsPage.clickOnCreateButton();
        await promise.all([
            nutritionDefinitionUpdatePage.setTagnameInput('tagname'),
            nutritionDefinitionUpdatePage.setDescriptionPolishInput('descriptionPolish'),
            nutritionDefinitionUpdatePage.setDescriptionEnglishInput('descriptionEnglish'),
            nutritionDefinitionUpdatePage.setUnitsInput('units'),
            nutritionDefinitionUpdatePage.setDecimalPlacesInput('5')
        ]);
        expect(await nutritionDefinitionUpdatePage.getTagnameInput()).to.eq('tagname');
        expect(await nutritionDefinitionUpdatePage.getDescriptionPolishInput()).to.eq('descriptionPolish');
        expect(await nutritionDefinitionUpdatePage.getDescriptionEnglishInput()).to.eq('descriptionEnglish');
        expect(await nutritionDefinitionUpdatePage.getUnitsInput()).to.eq('units');
        expect(await nutritionDefinitionUpdatePage.getDecimalPlacesInput()).to.eq('5');
        await nutritionDefinitionUpdatePage.save();
        expect(await nutritionDefinitionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await nutritionDefinitionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last NutritionDefinition', async () => {
        const nbButtonsBeforeDelete = await nutritionDefinitionComponentsPage.countDeleteButtons();
        await nutritionDefinitionComponentsPage.clickOnLastDeleteButton();

        nutritionDefinitionDeleteDialog = new NutritionDefinitionDeleteDialog();
        expect(await nutritionDefinitionDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Nutrition Definition?');
        await nutritionDefinitionDeleteDialog.clickOnConfirmButton();

        expect(await nutritionDefinitionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
