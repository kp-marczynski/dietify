/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  OwnedKitchenApplianceComponentsPage,
  OwnedKitchenApplianceDeleteDialog,
  OwnedKitchenApplianceUpdatePage
} from './owned-kitchen-appliance.page-object';

const expect = chai.expect;

describe('OwnedKitchenAppliance e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ownedKitchenApplianceUpdatePage: OwnedKitchenApplianceUpdatePage;
  let ownedKitchenApplianceComponentsPage: OwnedKitchenApplianceComponentsPage;
  /*let ownedKitchenApplianceDeleteDialog: OwnedKitchenApplianceDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load OwnedKitchenAppliances', async () => {
    await navBarPage.goToEntity('owned-kitchen-appliance');
    ownedKitchenApplianceComponentsPage = new OwnedKitchenApplianceComponentsPage();
    await browser.wait(ec.visibilityOf(ownedKitchenApplianceComponentsPage.title), 5000);
    expect(await ownedKitchenApplianceComponentsPage.getTitle()).to.eq('gatewayApp.appointmentsOwnedKitchenAppliance.home.title');
  });

  it('should load create OwnedKitchenAppliance page', async () => {
    await ownedKitchenApplianceComponentsPage.clickOnCreateButton();
    ownedKitchenApplianceUpdatePage = new OwnedKitchenApplianceUpdatePage();
    expect(await ownedKitchenApplianceUpdatePage.getPageTitle()).to.eq(
      'gatewayApp.appointmentsOwnedKitchenAppliance.home.createOrEditLabel'
    );
    await ownedKitchenApplianceUpdatePage.cancel();
  });

  /* it('should create and save OwnedKitchenAppliances', async () => {
        const nbButtonsBeforeCreate = await ownedKitchenApplianceComponentsPage.countDeleteButtons();

        await ownedKitchenApplianceComponentsPage.clickOnCreateButton();
        await promise.all([
            ownedKitchenApplianceUpdatePage.setKitchenApplianceIdInput('5'),
            ownedKitchenApplianceUpdatePage.nutritionalInterviewSelectLastOption(),
        ]);
        expect(await ownedKitchenApplianceUpdatePage.getKitchenApplianceIdInput()).to.eq('5', 'Expected kitchenApplianceId value to be equals to 5');
        await ownedKitchenApplianceUpdatePage.save();
        expect(await ownedKitchenApplianceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await ownedKitchenApplianceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last OwnedKitchenAppliance', async () => {
        const nbButtonsBeforeDelete = await ownedKitchenApplianceComponentsPage.countDeleteButtons();
        await ownedKitchenApplianceComponentsPage.clickOnLastDeleteButton();

        ownedKitchenApplianceDeleteDialog = new OwnedKitchenApplianceDeleteDialog();
        expect(await ownedKitchenApplianceDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.appointmentsOwnedKitchenAppliance.delete.question');
        await ownedKitchenApplianceDeleteDialog.clickOnConfirmButton();

        expect(await ownedKitchenApplianceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
