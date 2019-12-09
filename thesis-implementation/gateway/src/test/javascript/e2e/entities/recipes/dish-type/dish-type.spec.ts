/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { DishTypeComponentsPage, DishTypeDeleteDialog, DishTypeUpdatePage } from './dish-type.page-object';

const expect = chai.expect;

describe('DishType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let dishTypeUpdatePage: DishTypeUpdatePage;
  let dishTypeComponentsPage: DishTypeComponentsPage;
  let dishTypeDeleteDialog: DishTypeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DishTypes', async () => {
    await navBarPage.goToEntity('dish-type');
    dishTypeComponentsPage = new DishTypeComponentsPage();
    await browser.wait(ec.visibilityOf(dishTypeComponentsPage.title), 5000);
    expect(await dishTypeComponentsPage.getTitle()).to.eq('gatewayApp.recipesDishType.home.title');
  });

  it('should load create DishType page', async () => {
    await dishTypeComponentsPage.clickOnCreateButton();
    dishTypeUpdatePage = new DishTypeUpdatePage();
    expect(await dishTypeUpdatePage.getPageTitle()).to.eq('gatewayApp.recipesDishType.home.createOrEditLabel');
    await dishTypeUpdatePage.cancel();
  });

  it('should create and save DishTypes', async () => {
    const nbButtonsBeforeCreate = await dishTypeComponentsPage.countDeleteButtons();

    await dishTypeComponentsPage.clickOnCreateButton();
    await promise.all([dishTypeUpdatePage.setDescriptionInput('description')]);
    expect(await dishTypeUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    await dishTypeUpdatePage.save();
    expect(await dishTypeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await dishTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last DishType', async () => {
    const nbButtonsBeforeDelete = await dishTypeComponentsPage.countDeleteButtons();
    await dishTypeComponentsPage.clickOnLastDeleteButton();

    dishTypeDeleteDialog = new DishTypeDeleteDialog();
    expect(await dishTypeDeleteDialog.getDialogTitle()).to.eq('gatewayApp.recipesDishType.delete.question');
    await dishTypeDeleteDialog.clickOnConfirmButton();

    expect(await dishTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
