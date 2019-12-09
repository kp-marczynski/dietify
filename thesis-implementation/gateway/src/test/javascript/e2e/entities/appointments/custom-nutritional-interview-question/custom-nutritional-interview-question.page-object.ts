import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class CustomNutritionalInterviewQuestionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-custom-nutritional-interview-question div table .btn-danger'));
  title = element.all(by.css('jhi-custom-nutritional-interview-question div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class CustomNutritionalInterviewQuestionUpdatePage {
  pageTitle = element(by.id('jhi-custom-nutritional-interview-question-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  ordinalNumberInput = element(by.id('field_ordinalNumber'));
  questionInput = element(by.id('field_question'));
  answerInput = element(by.id('field_answer'));
  nutritionalInterviewSelect = element(by.id('field_nutritionalInterview'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setOrdinalNumberInput(ordinalNumber) {
    await this.ordinalNumberInput.sendKeys(ordinalNumber);
  }

  async getOrdinalNumberInput() {
    return await this.ordinalNumberInput.getAttribute('value');
  }

  async setQuestionInput(question) {
    await this.questionInput.sendKeys(question);
  }

  async getQuestionInput() {
    return await this.questionInput.getAttribute('value');
  }

  async setAnswerInput(answer) {
    await this.answerInput.sendKeys(answer);
  }

  async getAnswerInput() {
    return await this.answerInput.getAttribute('value');
  }

  async nutritionalInterviewSelectLastOption(timeout?: number) {
    await this.nutritionalInterviewSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async nutritionalInterviewSelectOption(option) {
    await this.nutritionalInterviewSelect.sendKeys(option);
  }

  getNutritionalInterviewSelect(): ElementFinder {
    return this.nutritionalInterviewSelect;
  }

  async getNutritionalInterviewSelectedOption() {
    return await this.nutritionalInterviewSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class CustomNutritionalInterviewQuestionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-customNutritionalInterviewQuestion-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-customNutritionalInterviewQuestion'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
