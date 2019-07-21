/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { DietTypeComponentsPage, DietTypeDeleteDialog, DietTypeUpdatePage } from './diet-type.page-object';

const expect = chai.expect;

describe('DietType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let dietTypeUpdatePage: DietTypeUpdatePage;
  let dietTypeComponentsPage: DietTypeComponentsPage;
  let dietTypeDeleteDialog: DietTypeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DietTypes', async () => {
    await navBarPage.goToEntity('diet-type');
    dietTypeComponentsPage = new DietTypeComponentsPage();
    await browser.wait(ec.visibilityOf(dietTypeComponentsPage.title), 5000);
    expect(await dietTypeComponentsPage.getTitle()).to.eq('gatewayApp.productsDietType.home.title');
  });

  it('should load create DietType page', async () => {
    await dietTypeComponentsPage.clickOnCreateButton();
    dietTypeUpdatePage = new DietTypeUpdatePage();
    expect(await dietTypeUpdatePage.getPageTitle()).to.eq('gatewayApp.productsDietType.home.createOrEditLabel');
    await dietTypeUpdatePage.cancel();
  });

  it('should create and save DietTypes', async () => {
    const nbButtonsBeforeCreate = await dietTypeComponentsPage.countDeleteButtons();

    await dietTypeComponentsPage.clickOnCreateButton();
    await promise.all([dietTypeUpdatePage.setNameInput('name')]);
    expect(await dietTypeUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    await dietTypeUpdatePage.save();
    expect(await dietTypeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await dietTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last DietType', async () => {
    const nbButtonsBeforeDelete = await dietTypeComponentsPage.countDeleteButtons();
    await dietTypeComponentsPage.clickOnLastDeleteButton();

    dietTypeDeleteDialog = new DietTypeDeleteDialog();
    expect(await dietTypeDeleteDialog.getDialogTitle()).to.eq('gatewayApp.productsDietType.delete.question');
    await dietTypeDeleteDialog.clickOnConfirmButton();

    expect(await dietTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
