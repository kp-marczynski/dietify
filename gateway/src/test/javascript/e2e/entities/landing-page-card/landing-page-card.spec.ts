/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LandingPageCardComponentsPage, LandingPageCardDeleteDialog, LandingPageCardUpdatePage } from './landing-page-card.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('LandingPageCard e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let landingPageCardUpdatePage: LandingPageCardUpdatePage;
  let landingPageCardComponentsPage: LandingPageCardComponentsPage;
  let landingPageCardDeleteDialog: LandingPageCardDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LandingPageCards', async () => {
    await navBarPage.goToEntity('landing-page-card');
    landingPageCardComponentsPage = new LandingPageCardComponentsPage();
    await browser.wait(ec.visibilityOf(landingPageCardComponentsPage.title), 5000);
    expect(await landingPageCardComponentsPage.getTitle()).to.eq('gatewayApp.landingPageCard.home.title');
  });

  it('should load create LandingPageCard page', async () => {
    await landingPageCardComponentsPage.clickOnCreateButton();
    landingPageCardUpdatePage = new LandingPageCardUpdatePage();
    expect(await landingPageCardUpdatePage.getPageTitle()).to.eq('gatewayApp.landingPageCard.home.createOrEditLabel');
    await landingPageCardUpdatePage.cancel();
  });

  it('should create and save LandingPageCards', async () => {
    const nbButtonsBeforeCreate = await landingPageCardComponentsPage.countDeleteButtons();

    await landingPageCardComponentsPage.clickOnCreateButton();
    await promise.all([
      landingPageCardUpdatePage.setOrdinalNumberInput('5'),
      landingPageCardUpdatePage.setHtmlContentInput('htmlContent'),
      landingPageCardUpdatePage.setCardImageInput(absolutePath)
    ]);
    expect(await landingPageCardUpdatePage.getOrdinalNumberInput()).to.eq('5', 'Expected ordinalNumber value to be equals to 5');
    expect(await landingPageCardUpdatePage.getHtmlContentInput()).to.eq(
      'htmlContent',
      'Expected HtmlContent value to be equals to htmlContent'
    );
    expect(await landingPageCardUpdatePage.getCardImageInput()).to.endsWith(
      fileNameToUpload,
      'Expected CardImage value to be end with ' + fileNameToUpload
    );
    await landingPageCardUpdatePage.save();
    expect(await landingPageCardUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await landingPageCardComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last LandingPageCard', async () => {
    const nbButtonsBeforeDelete = await landingPageCardComponentsPage.countDeleteButtons();
    await landingPageCardComponentsPage.clickOnLastDeleteButton();

    landingPageCardDeleteDialog = new LandingPageCardDeleteDialog();
    expect(await landingPageCardDeleteDialog.getDialogTitle()).to.eq('gatewayApp.landingPageCard.delete.question');
    await landingPageCardDeleteDialog.clickOnConfirmButton();

    expect(await landingPageCardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
