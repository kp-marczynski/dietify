import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class CustomNutritionalInterviewQuestionTemplateComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-custom-nutritional-interview-question-template div table .btn-danger'));
  title = element.all(by.css('jhi-custom-nutritional-interview-question-template div h2#page-heading span')).first();

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

export class CustomNutritionalInterviewQuestionTemplateUpdatePage {
  pageTitle = element(by.id('jhi-custom-nutritional-interview-question-template-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  ownerIdInput = element(by.id('field_ownerId'));
  questionInput = element(by.id('field_question'));
  languageInput = element(by.id('field_language'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setOwnerIdInput(ownerId) {
    await this.ownerIdInput.sendKeys(ownerId);
  }

  async getOwnerIdInput() {
    return await this.ownerIdInput.getAttribute('value');
  }

  async setQuestionInput(question) {
    await this.questionInput.sendKeys(question);
  }

  async getQuestionInput() {
    return await this.questionInput.getAttribute('value');
  }

  async setLanguageInput(language) {
    await this.languageInput.sendKeys(language);
  }

  async getLanguageInput() {
    return await this.languageInput.getAttribute('value');
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

export class CustomNutritionalInterviewQuestionTemplateDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-customNutritionalInterviewQuestionTemplate-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-customNutritionalInterviewQuestionTemplate'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
