/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  DietTypeTranslationComponentsPage,
  DietTypeTranslationDeleteDialog,
  DietTypeTranslationUpdatePage
} from './diet-type-translation.page-object';

const expect = chai.expect;

describe('DietTypeTranslation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let dietTypeTranslationUpdatePage: DietTypeTranslationUpdatePage;
  let dietTypeTranslationComponentsPage: DietTypeTranslationComponentsPage;
  /*let dietTypeTranslationDeleteDialog: DietTypeTranslationDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DietTypeTranslations', async () => {
    await navBarPage.goToEntity('diet-type-translation');
    dietTypeTranslationComponentsPage = new DietTypeTranslationComponentsPage();
    await browser.wait(ec.visibilityOf(dietTypeTranslationComponentsPage.title), 5000);
    expect(await dietTypeTranslationComponentsPage.getTitle()).to.eq('gatewayApp.productsDietTypeTranslation.home.title');
  });

  it('should load create DietTypeTranslation page', async () => {
    await dietTypeTranslationComponentsPage.clickOnCreateButton();
    dietTypeTranslationUpdatePage = new DietTypeTranslationUpdatePage();
    expect(await dietTypeTranslationUpdatePage.getPageTitle()).to.eq('gatewayApp.productsDietTypeTranslation.home.createOrEditLabel');
    await dietTypeTranslationUpdatePage.cancel();
  });

  /* it('should create and save DietTypeTranslations', async () => {
        const nbButtonsBeforeCreate = await dietTypeTranslationComponentsPage.countDeleteButtons();

        await dietTypeTranslationComponentsPage.clickOnCreateButton();
        await promise.all([
            dietTypeTranslationUpdatePage.setTranslationInput('translation'),
            dietTypeTranslationUpdatePage.setLanguageInput('language'),
            dietTypeTranslationUpdatePage.dietTypeSelectLastOption(),
        ]);
        expect(await dietTypeTranslationUpdatePage.getTranslationInput()).to.eq('translation', 'Expected Translation value to be equals to translation');
        expect(await dietTypeTranslationUpdatePage.getLanguageInput()).to.eq('language', 'Expected Language value to be equals to language');
        await dietTypeTranslationUpdatePage.save();
        expect(await dietTypeTranslationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await dietTypeTranslationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last DietTypeTranslation', async () => {
        const nbButtonsBeforeDelete = await dietTypeTranslationComponentsPage.countDeleteButtons();
        await dietTypeTranslationComponentsPage.clickOnLastDeleteButton();

        dietTypeTranslationDeleteDialog = new DietTypeTranslationDeleteDialog();
        expect(await dietTypeTranslationDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.productsDietTypeTranslation.delete.question');
        await dietTypeTranslationDeleteDialog.clickOnConfirmButton();

        expect(await dietTypeTranslationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
