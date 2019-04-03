/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { KitchenApplianceComponentsPage, KitchenApplianceDeleteDialog, KitchenApplianceUpdatePage } from './kitchen-appliance.page-object';

const expect = chai.expect;

describe('KitchenAppliance e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let kitchenApplianceUpdatePage: KitchenApplianceUpdatePage;
    let kitchenApplianceComponentsPage: KitchenApplianceComponentsPage;
    let kitchenApplianceDeleteDialog: KitchenApplianceDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load KitchenAppliances', async () => {
        await navBarPage.goToEntity('kitchen-appliance');
        kitchenApplianceComponentsPage = new KitchenApplianceComponentsPage();
        await browser.wait(ec.visibilityOf(kitchenApplianceComponentsPage.title), 5000);
        expect(await kitchenApplianceComponentsPage.getTitle()).to.eq('Kitchen Appliances');
    });

    it('should load create KitchenAppliance page', async () => {
        await kitchenApplianceComponentsPage.clickOnCreateButton();
        kitchenApplianceUpdatePage = new KitchenApplianceUpdatePage();
        expect(await kitchenApplianceUpdatePage.getPageTitle()).to.eq('Create or edit a Kitchen Appliance');
        await kitchenApplianceUpdatePage.cancel();
    });

    it('should create and save KitchenAppliances', async () => {
        const nbButtonsBeforeCreate = await kitchenApplianceComponentsPage.countDeleteButtons();

        await kitchenApplianceComponentsPage.clickOnCreateButton();
        await promise.all([
            kitchenApplianceUpdatePage.setNamePolishInput('namePolish'),
            kitchenApplianceUpdatePage.setNameEnglishInput('nameEnglish')
        ]);
        expect(await kitchenApplianceUpdatePage.getNamePolishInput()).to.eq('namePolish');
        expect(await kitchenApplianceUpdatePage.getNameEnglishInput()).to.eq('nameEnglish');
        await kitchenApplianceUpdatePage.save();
        expect(await kitchenApplianceUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await kitchenApplianceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last KitchenAppliance', async () => {
        const nbButtonsBeforeDelete = await kitchenApplianceComponentsPage.countDeleteButtons();
        await kitchenApplianceComponentsPage.clickOnLastDeleteButton();

        kitchenApplianceDeleteDialog = new KitchenApplianceDeleteDialog();
        expect(await kitchenApplianceDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Kitchen Appliance?');
        await kitchenApplianceDeleteDialog.clickOnConfirmButton();

        expect(await kitchenApplianceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
