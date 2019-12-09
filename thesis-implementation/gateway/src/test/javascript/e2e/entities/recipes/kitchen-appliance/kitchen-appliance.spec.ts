/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

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
    expect(await kitchenApplianceComponentsPage.getTitle()).to.eq('gatewayApp.recipesKitchenAppliance.home.title');
  });

  it('should load create KitchenAppliance page', async () => {
    await kitchenApplianceComponentsPage.clickOnCreateButton();
    kitchenApplianceUpdatePage = new KitchenApplianceUpdatePage();
    expect(await kitchenApplianceUpdatePage.getPageTitle()).to.eq('gatewayApp.recipesKitchenAppliance.home.createOrEditLabel');
    await kitchenApplianceUpdatePage.cancel();
  });

  it('should create and save KitchenAppliances', async () => {
    const nbButtonsBeforeCreate = await kitchenApplianceComponentsPage.countDeleteButtons();

    await kitchenApplianceComponentsPage.clickOnCreateButton();
    await promise.all([kitchenApplianceUpdatePage.setNameInput('name')]);
    expect(await kitchenApplianceUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    await kitchenApplianceUpdatePage.save();
    expect(await kitchenApplianceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await kitchenApplianceComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last KitchenAppliance', async () => {
    const nbButtonsBeforeDelete = await kitchenApplianceComponentsPage.countDeleteButtons();
    await kitchenApplianceComponentsPage.clickOnLastDeleteButton();

    kitchenApplianceDeleteDialog = new KitchenApplianceDeleteDialog();
    expect(await kitchenApplianceDeleteDialog.getDialogTitle()).to.eq('gatewayApp.recipesKitchenAppliance.delete.question');
    await kitchenApplianceDeleteDialog.clickOnConfirmButton();

    expect(await kitchenApplianceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
