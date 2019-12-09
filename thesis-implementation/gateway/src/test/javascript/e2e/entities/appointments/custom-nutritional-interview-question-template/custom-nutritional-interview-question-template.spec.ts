/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  CustomNutritionalInterviewQuestionTemplateComponentsPage,
  CustomNutritionalInterviewQuestionTemplateDeleteDialog,
  CustomNutritionalInterviewQuestionTemplateUpdatePage
} from './custom-nutritional-interview-question-template.page-object';

const expect = chai.expect;

describe('CustomNutritionalInterviewQuestionTemplate e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let customNutritionalInterviewQuestionTemplateUpdatePage: CustomNutritionalInterviewQuestionTemplateUpdatePage;
  let customNutritionalInterviewQuestionTemplateComponentsPage: CustomNutritionalInterviewQuestionTemplateComponentsPage;
  let customNutritionalInterviewQuestionTemplateDeleteDialog: CustomNutritionalInterviewQuestionTemplateDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load CustomNutritionalInterviewQuestionTemplates', async () => {
    await navBarPage.goToEntity('custom-nutritional-interview-question-template');
    customNutritionalInterviewQuestionTemplateComponentsPage = new CustomNutritionalInterviewQuestionTemplateComponentsPage();
    await browser.wait(ec.visibilityOf(customNutritionalInterviewQuestionTemplateComponentsPage.title), 5000);
    expect(await customNutritionalInterviewQuestionTemplateComponentsPage.getTitle()).to.eq(
      'gatewayApp.appointmentsCustomNutritionalInterviewQuestionTemplate.home.title'
    );
  });

  it('should load create CustomNutritionalInterviewQuestionTemplate page', async () => {
    await customNutritionalInterviewQuestionTemplateComponentsPage.clickOnCreateButton();
    customNutritionalInterviewQuestionTemplateUpdatePage = new CustomNutritionalInterviewQuestionTemplateUpdatePage();
    expect(await customNutritionalInterviewQuestionTemplateUpdatePage.getPageTitle()).to.eq(
      'gatewayApp.appointmentsCustomNutritionalInterviewQuestionTemplate.home.createOrEditLabel'
    );
    await customNutritionalInterviewQuestionTemplateUpdatePage.cancel();
  });

  it('should create and save CustomNutritionalInterviewQuestionTemplates', async () => {
    const nbButtonsBeforeCreate = await customNutritionalInterviewQuestionTemplateComponentsPage.countDeleteButtons();

    await customNutritionalInterviewQuestionTemplateComponentsPage.clickOnCreateButton();
    await promise.all([
      customNutritionalInterviewQuestionTemplateUpdatePage.setOwnerIdInput('5'),
      customNutritionalInterviewQuestionTemplateUpdatePage.setQuestionInput('question'),
      customNutritionalInterviewQuestionTemplateUpdatePage.setLanguageInput('language')
    ]);
    expect(await customNutritionalInterviewQuestionTemplateUpdatePage.getOwnerIdInput()).to.eq(
      '5',
      'Expected ownerId value to be equals to 5'
    );
    expect(await customNutritionalInterviewQuestionTemplateUpdatePage.getQuestionInput()).to.eq(
      'question',
      'Expected Question value to be equals to question'
    );
    expect(await customNutritionalInterviewQuestionTemplateUpdatePage.getLanguageInput()).to.eq(
      'language',
      'Expected Language value to be equals to language'
    );
    await customNutritionalInterviewQuestionTemplateUpdatePage.save();
    expect(await customNutritionalInterviewQuestionTemplateUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be
      .false;

    expect(await customNutritionalInterviewQuestionTemplateComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last CustomNutritionalInterviewQuestionTemplate', async () => {
    const nbButtonsBeforeDelete = await customNutritionalInterviewQuestionTemplateComponentsPage.countDeleteButtons();
    await customNutritionalInterviewQuestionTemplateComponentsPage.clickOnLastDeleteButton();

    customNutritionalInterviewQuestionTemplateDeleteDialog = new CustomNutritionalInterviewQuestionTemplateDeleteDialog();
    expect(await customNutritionalInterviewQuestionTemplateDeleteDialog.getDialogTitle()).to.eq(
      'gatewayApp.appointmentsCustomNutritionalInterviewQuestionTemplate.delete.question'
    );
    await customNutritionalInterviewQuestionTemplateDeleteDialog.clickOnConfirmButton();

    expect(await customNutritionalInterviewQuestionTemplateComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
