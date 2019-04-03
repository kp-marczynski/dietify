/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RecipeComponentsPage, RecipeDeleteDialog, RecipeUpdatePage } from './recipe.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Recipe e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let recipeUpdatePage: RecipeUpdatePage;
    let recipeComponentsPage: RecipeComponentsPage;
    /*let recipeDeleteDialog: RecipeDeleteDialog;*/
    const fileNameToUpload = 'logo-jhipster.png';
    const fileToUpload = '../../../../../main/webapp/content/images/' + fileNameToUpload;
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        // await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Recipes', async () => {
        await navBarPage.goToEntity('recipe');
        recipeComponentsPage = new RecipeComponentsPage();
        await browser.wait(ec.visibilityOf(recipeComponentsPage.title), 5000);
        expect(await recipeComponentsPage.getTitle()).to.eq('Recipes');
    });

    it('should load create Recipe page', async () => {
        await recipeComponentsPage.clickOnCreateButton();
        recipeUpdatePage = new RecipeUpdatePage();
        expect(await recipeUpdatePage.getPageTitle()).to.eq('Create or edit a Recipe');
        await recipeUpdatePage.cancel();
    });

    /* it('should create and save Recipes', async () => {
        const nbButtonsBeforeCreate = await recipeComponentsPage.countDeleteButtons();

        await recipeComponentsPage.clickOnCreateButton();
        await promise.all([
            recipeUpdatePage.setNameInput('name'),
            recipeUpdatePage.setPreparationTimeMinutesInput('5'),
            recipeUpdatePage.setNumberOfPortionsInput('5'),
            recipeUpdatePage.setImageInput(absolutePath),
            recipeUpdatePage.setAuthorIdInput('5'),
            recipeUpdatePage.setCreationDateInput('2000-12-31'),
            recipeUpdatePage.setLastEditDateInput('2000-12-31'),
            recipeUpdatePage.setLanguageIdInput('5'),
            recipeUpdatePage.sourceRecipeSelectLastOption(),
            // recipeUpdatePage.kitchenAppliancesSelectLastOption(),
            // recipeUpdatePage.dishTypeSelectLastOption(),
            // recipeUpdatePage.mealTypeSelectLastOption(),
        ]);
        expect(await recipeUpdatePage.getNameInput()).to.eq('name');
        expect(await recipeUpdatePage.getPreparationTimeMinutesInput()).to.eq('5');
        expect(await recipeUpdatePage.getNumberOfPortionsInput()).to.eq('5');
        expect(await recipeUpdatePage.getImageInput()).to.endsWith(fileNameToUpload);
        expect(await recipeUpdatePage.getAuthorIdInput()).to.eq('5');
        expect(await recipeUpdatePage.getCreationDateInput()).to.eq('2000-12-31');
        expect(await recipeUpdatePage.getLastEditDateInput()).to.eq('2000-12-31');
        const selectedIsVisible = recipeUpdatePage.getIsVisibleInput();
        if (await selectedIsVisible.isSelected()) {
            await recipeUpdatePage.getIsVisibleInput().click();
            expect(await recipeUpdatePage.getIsVisibleInput().isSelected()).to.be.false;
        } else {
            await recipeUpdatePage.getIsVisibleInput().click();
            expect(await recipeUpdatePage.getIsVisibleInput().isSelected()).to.be.true;
        }
        const selectedIsLocked = recipeUpdatePage.getIsLockedInput();
        if (await selectedIsLocked.isSelected()) {
            await recipeUpdatePage.getIsLockedInput().click();
            expect(await recipeUpdatePage.getIsLockedInput().isSelected()).to.be.false;
        } else {
            await recipeUpdatePage.getIsLockedInput().click();
            expect(await recipeUpdatePage.getIsLockedInput().isSelected()).to.be.true;
        }
        expect(await recipeUpdatePage.getLanguageIdInput()).to.eq('5');
        await recipeUpdatePage.save();
        expect(await recipeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await recipeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last Recipe', async () => {
        const nbButtonsBeforeDelete = await recipeComponentsPage.countDeleteButtons();
        await recipeComponentsPage.clickOnLastDeleteButton();

        recipeDeleteDialog = new RecipeDeleteDialog();
        expect(await recipeDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Recipe?');
        await recipeDeleteDialog.clickOnConfirmButton();

        expect(await recipeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
