/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RecipeSectionComponentsPage, RecipeSectionDeleteDialog, RecipeSectionUpdatePage } from './recipe-section.page-object';

const expect = chai.expect;

describe('RecipeSection e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let recipeSectionUpdatePage: RecipeSectionUpdatePage;
    let recipeSectionComponentsPage: RecipeSectionComponentsPage;
    /*let recipeSectionDeleteDialog: RecipeSectionDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load RecipeSections', async () => {
        await navBarPage.goToEntity('recipe-section');
        recipeSectionComponentsPage = new RecipeSectionComponentsPage();
        await browser.wait(ec.visibilityOf(recipeSectionComponentsPage.title), 5000);
        expect(await recipeSectionComponentsPage.getTitle()).to.eq('Recipe Sections');
    });

    it('should load create RecipeSection page', async () => {
        await recipeSectionComponentsPage.clickOnCreateButton();
        recipeSectionUpdatePage = new RecipeSectionUpdatePage();
        expect(await recipeSectionUpdatePage.getPageTitle()).to.eq('Create or edit a Recipe Section');
        await recipeSectionUpdatePage.cancel();
    });

    /* it('should create and save RecipeSections', async () => {
        const nbButtonsBeforeCreate = await recipeSectionComponentsPage.countDeleteButtons();

        await recipeSectionComponentsPage.clickOnCreateButton();
        await promise.all([
            recipeSectionUpdatePage.setSectionNameInput('sectionName'),
            recipeSectionUpdatePage.recipeSelectLastOption(),
        ]);
        expect(await recipeSectionUpdatePage.getSectionNameInput()).to.eq('sectionName');
        await recipeSectionUpdatePage.save();
        expect(await recipeSectionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await recipeSectionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last RecipeSection', async () => {
        const nbButtonsBeforeDelete = await recipeSectionComponentsPage.countDeleteButtons();
        await recipeSectionComponentsPage.clickOnLastDeleteButton();

        recipeSectionDeleteDialog = new RecipeSectionDeleteDialog();
        expect(await recipeSectionDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Recipe Section?');
        await recipeSectionDeleteDialog.clickOnConfirmButton();

        expect(await recipeSectionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
