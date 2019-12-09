/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  KitchenApplianceTranslationComponentsPage,
  KitchenApplianceTranslationDeleteDialog,
  KitchenApplianceTranslationUpdatePage
} from './kitchen-appliance-translation.page-object';

const expect = chai.expect;

describe('KitchenApplianceTranslation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let kitchenApplianceTranslationUpdatePage: KitchenApplianceTranslationUpdatePage;
  let kitchenApplianceTranslationComponentsPage: KitchenApplianceTranslationComponentsPage;
  /*let kitchenApplianceTranslationDeleteDialog: KitchenApplianceTranslationDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load KitchenApplianceTranslations', async () => {
    await navBarPage.goToEntity('kitchen-appliance-translation');
    kitchenApplianceTranslationComponentsPage = new KitchenApplianceTranslationComponentsPage();
    await browser.wait(ec.visibilityOf(kitchenApplianceTranslationComponentsPage.title), 5000);
    expect(await kitchenApplianceTranslationComponentsPage.getTitle()).to.eq('gatewayApp.recipesKitchenApplianceTranslation.home.title');
  });

  it('should load create KitchenApplianceTranslation page', async () => {
    await kitchenApplianceTranslationComponentsPage.clickOnCreateButton();
    kitchenApplianceTranslationUpdatePage = new KitchenApplianceTranslationUpdatePage();
    expect(await kitchenApplianceTranslationUpdatePage.getPageTitle()).to.eq(
      'gatewayApp.recipesKitchenApplianceTranslation.home.createOrEditLabel'
    );
    await kitchenApplianceTranslationUpdatePage.cancel();
  });

  /* it('should create and save KitchenApplianceTranslations', async () => {
        const nbButtonsBeforeCreate = await kitchenApplianceTranslationComponentsPage.countDeleteButtons();

        await kitchenApplianceTranslationComponentsPage.clickOnCreateButton();
        await promise.all([
            kitchenApplianceTranslationUpdatePage.setTranslationInput('translation'),
            kitchenApplianceTranslationUpdatePage.setLanguageInput('language'),
            kitchenApplianceTranslationUpdatePage.kitchenApplianceSelectLastOption(),
        ]);
        expect(await kitchenApplianceTranslationUpdatePage.getTranslationInput()).to.eq('translation', 'Expected Translation value to be equals to translation');
        expect(await kitchenApplianceTranslationUpdatePage.getLanguageInput()).to.eq('language', 'Expected Language value to be equals to language');
        await kitchenApplianceTranslationUpdatePage.save();
        expect(await kitchenApplianceTranslationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await kitchenApplianceTranslationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last KitchenApplianceTranslation', async () => {
        const nbButtonsBeforeDelete = await kitchenApplianceTranslationComponentsPage.countDeleteButtons();
        await kitchenApplianceTranslationComponentsPage.clickOnLastDeleteButton();

        kitchenApplianceTranslationDeleteDialog = new KitchenApplianceTranslationDeleteDialog();
        expect(await kitchenApplianceTranslationDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.recipesKitchenApplianceTranslation.delete.question');
        await kitchenApplianceTranslationDeleteDialog.clickOnConfirmButton();

        expect(await kitchenApplianceTranslationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
