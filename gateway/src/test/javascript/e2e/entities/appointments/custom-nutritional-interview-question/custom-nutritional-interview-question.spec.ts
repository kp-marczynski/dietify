/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  CustomNutritionalInterviewQuestionComponentsPage,
  CustomNutritionalInterviewQuestionDeleteDialog,
  CustomNutritionalInterviewQuestionUpdatePage
} from './custom-nutritional-interview-question.page-object';

const expect = chai.expect;

describe('CustomNutritionalInterviewQuestion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let customNutritionalInterviewQuestionUpdatePage: CustomNutritionalInterviewQuestionUpdatePage;
  let customNutritionalInterviewQuestionComponentsPage: CustomNutritionalInterviewQuestionComponentsPage;
  /*let customNutritionalInterviewQuestionDeleteDialog: CustomNutritionalInterviewQuestionDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load CustomNutritionalInterviewQuestions', async () => {
    await navBarPage.goToEntity('custom-nutritional-interview-question');
    customNutritionalInterviewQuestionComponentsPage = new CustomNutritionalInterviewQuestionComponentsPage();
    await browser.wait(ec.visibilityOf(customNutritionalInterviewQuestionComponentsPage.title), 5000);
    expect(await customNutritionalInterviewQuestionComponentsPage.getTitle()).to.eq(
      'gatewayApp.appointmentsCustomNutritionalInterviewQuestion.home.title'
    );
  });

  it('should load create CustomNutritionalInterviewQuestion page', async () => {
    await customNutritionalInterviewQuestionComponentsPage.clickOnCreateButton();
    customNutritionalInterviewQuestionUpdatePage = new CustomNutritionalInterviewQuestionUpdatePage();
    expect(await customNutritionalInterviewQuestionUpdatePage.getPageTitle()).to.eq(
      'gatewayApp.appointmentsCustomNutritionalInterviewQuestion.home.createOrEditLabel'
    );
    await customNutritionalInterviewQuestionUpdatePage.cancel();
  });

  /* it('should create and save CustomNutritionalInterviewQuestions', async () => {
        const nbButtonsBeforeCreate = await customNutritionalInterviewQuestionComponentsPage.countDeleteButtons();

        await customNutritionalInterviewQuestionComponentsPage.clickOnCreateButton();
        await promise.all([
            customNutritionalInterviewQuestionUpdatePage.setOrdinalNumberInput('5'),
            customNutritionalInterviewQuestionUpdatePage.setQuestionInput('question'),
            customNutritionalInterviewQuestionUpdatePage.setAnswerInput('answer'),
            customNutritionalInterviewQuestionUpdatePage.nutritionalInterviewSelectLastOption(),
        ]);
        expect(await customNutritionalInterviewQuestionUpdatePage.getOrdinalNumberInput()).to.eq('5', 'Expected ordinalNumber value to be equals to 5');
        expect(await customNutritionalInterviewQuestionUpdatePage.getQuestionInput()).to.eq('question', 'Expected Question value to be equals to question');
        expect(await customNutritionalInterviewQuestionUpdatePage.getAnswerInput()).to.eq('answer', 'Expected Answer value to be equals to answer');
        await customNutritionalInterviewQuestionUpdatePage.save();
        expect(await customNutritionalInterviewQuestionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await customNutritionalInterviewQuestionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last CustomNutritionalInterviewQuestion', async () => {
        const nbButtonsBeforeDelete = await customNutritionalInterviewQuestionComponentsPage.countDeleteButtons();
        await customNutritionalInterviewQuestionComponentsPage.clickOnLastDeleteButton();

        customNutritionalInterviewQuestionDeleteDialog = new CustomNutritionalInterviewQuestionDeleteDialog();
        expect(await customNutritionalInterviewQuestionDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.appointmentsCustomNutritionalInterviewQuestion.delete.question');
        await customNutritionalInterviewQuestionDeleteDialog.clickOnConfirmButton();

        expect(await customNutritionalInterviewQuestionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
