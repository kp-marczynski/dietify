/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PreparationStepComponentsPage, PreparationStepDeleteDialog, PreparationStepUpdatePage } from './preparation-step.page-object';

const expect = chai.expect;

describe('PreparationStep e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let preparationStepUpdatePage: PreparationStepUpdatePage;
    let preparationStepComponentsPage: PreparationStepComponentsPage;
    /*let preparationStepDeleteDialog: PreparationStepDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load PreparationSteps', async () => {
        await navBarPage.goToEntity('preparation-step');
        preparationStepComponentsPage = new PreparationStepComponentsPage();
        await browser.wait(ec.visibilityOf(preparationStepComponentsPage.title), 5000);
        expect(await preparationStepComponentsPage.getTitle()).to.eq('Preparation Steps');
    });

    it('should load create PreparationStep page', async () => {
        await preparationStepComponentsPage.clickOnCreateButton();
        preparationStepUpdatePage = new PreparationStepUpdatePage();
        expect(await preparationStepUpdatePage.getPageTitle()).to.eq('Create or edit a Preparation Step');
        await preparationStepUpdatePage.cancel();
    });

    /* it('should create and save PreparationSteps', async () => {
        const nbButtonsBeforeCreate = await preparationStepComponentsPage.countDeleteButtons();

        await preparationStepComponentsPage.clickOnCreateButton();
        await promise.all([
            preparationStepUpdatePage.setOrdinalNumberInput('5'),
            preparationStepUpdatePage.setStepDescriptionInput('stepDescription'),
            preparationStepUpdatePage.recipeSectionSelectLastOption(),
        ]);
        expect(await preparationStepUpdatePage.getOrdinalNumberInput()).to.eq('5');
        expect(await preparationStepUpdatePage.getStepDescriptionInput()).to.eq('stepDescription');
        await preparationStepUpdatePage.save();
        expect(await preparationStepUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await preparationStepComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last PreparationStep', async () => {
        const nbButtonsBeforeDelete = await preparationStepComponentsPage.countDeleteButtons();
        await preparationStepComponentsPage.clickOnLastDeleteButton();

        preparationStepDeleteDialog = new PreparationStepDeleteDialog();
        expect(await preparationStepDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Preparation Step?');
        await preparationStepDeleteDialog.clickOnConfirmButton();

        expect(await preparationStepComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
