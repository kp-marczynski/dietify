/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  DishTypeTranslationComponentsPage,
  DishTypeTranslationDeleteDialog,
  DishTypeTranslationUpdatePage
} from './dish-type-translation.page-object';

const expect = chai.expect;

describe('DishTypeTranslation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let dishTypeTranslationUpdatePage: DishTypeTranslationUpdatePage;
  let dishTypeTranslationComponentsPage: DishTypeTranslationComponentsPage;
  /*let dishTypeTranslationDeleteDialog: DishTypeTranslationDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DishTypeTranslations', async () => {
    await navBarPage.goToEntity('dish-type-translation');
    dishTypeTranslationComponentsPage = new DishTypeTranslationComponentsPage();
    await browser.wait(ec.visibilityOf(dishTypeTranslationComponentsPage.title), 5000);
    expect(await dishTypeTranslationComponentsPage.getTitle()).to.eq('gatewayApp.recipesDishTypeTranslation.home.title');
  });

  it('should load create DishTypeTranslation page', async () => {
    await dishTypeTranslationComponentsPage.clickOnCreateButton();
    dishTypeTranslationUpdatePage = new DishTypeTranslationUpdatePage();
    expect(await dishTypeTranslationUpdatePage.getPageTitle()).to.eq('gatewayApp.recipesDishTypeTranslation.home.createOrEditLabel');
    await dishTypeTranslationUpdatePage.cancel();
  });

  /* it('should create and save DishTypeTranslations', async () => {
        const nbButtonsBeforeCreate = await dishTypeTranslationComponentsPage.countDeleteButtons();

        await dishTypeTranslationComponentsPage.clickOnCreateButton();
        await promise.all([
            dishTypeTranslationUpdatePage.setTranslationInput('translation'),
            dishTypeTranslationUpdatePage.setLanguageInput('language'),
            dishTypeTranslationUpdatePage.dishTypeSelectLastOption(),
        ]);
        expect(await dishTypeTranslationUpdatePage.getTranslationInput()).to.eq('translation', 'Expected Translation value to be equals to translation');
        expect(await dishTypeTranslationUpdatePage.getLanguageInput()).to.eq('language', 'Expected Language value to be equals to language');
        await dishTypeTranslationUpdatePage.save();
        expect(await dishTypeTranslationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await dishTypeTranslationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last DishTypeTranslation', async () => {
        const nbButtonsBeforeDelete = await dishTypeTranslationComponentsPage.countDeleteButtons();
        await dishTypeTranslationComponentsPage.clickOnLastDeleteButton();

        dishTypeTranslationDeleteDialog = new DishTypeTranslationDeleteDialog();
        expect(await dishTypeTranslationDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.recipesDishTypeTranslation.delete.question');
        await dishTypeTranslationDeleteDialog.clickOnConfirmButton();

        expect(await dishTypeTranslationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
