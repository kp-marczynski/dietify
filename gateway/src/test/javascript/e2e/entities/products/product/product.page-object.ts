import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ProductComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-product div table .btn-danger'));
  title = element.all(by.css('jhi-product div h2#page-heading span')).first();

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

export class ProductUpdatePage {
  pageTitle = element(by.id('jhi-product-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  sourceInput = element(by.id('field_source'));
  authorIdInput = element(by.id('field_authorId'));
  descriptionInput = element(by.id('field_description'));
  isFinalInput = element(by.id('field_isFinal'));
  isVerifiedInput = element(by.id('field_isVerified'));
  languageInput = element(by.id('field_language'));
  subcategorySelect = element(by.id('field_subcategory'));
  suitableDietsSelect = element(by.id('field_suitableDiets'));
  unsuitableDietsSelect = element(by.id('field_unsuitableDiets'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSourceInput(source) {
    await this.sourceInput.sendKeys(source);
  }

  async getSourceInput() {
    return await this.sourceInput.getAttribute('value');
  }

  async setAuthorIdInput(authorId) {
    await this.authorIdInput.sendKeys(authorId);
  }

  async getAuthorIdInput() {
    return await this.authorIdInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  getIsFinalInput(timeout?: number) {
    return this.isFinalInput;
  }
  getIsVerifiedInput(timeout?: number) {
    return this.isVerifiedInput;
  }
  async setLanguageInput(language) {
    await this.languageInput.sendKeys(language);
  }

  async getLanguageInput() {
    return await this.languageInput.getAttribute('value');
  }

  async subcategorySelectLastOption(timeout?: number) {
    await this.subcategorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async subcategorySelectOption(option) {
    await this.subcategorySelect.sendKeys(option);
  }

  getSubcategorySelect(): ElementFinder {
    return this.subcategorySelect;
  }

  async getSubcategorySelectedOption() {
    return await this.subcategorySelect.element(by.css('option:checked')).getText();
  }

  async suitableDietsSelectLastOption(timeout?: number) {
    await this.suitableDietsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async suitableDietsSelectOption(option) {
    await this.suitableDietsSelect.sendKeys(option);
  }

  getSuitableDietsSelect(): ElementFinder {
    return this.suitableDietsSelect;
  }

  async getSuitableDietsSelectedOption() {
    return await this.suitableDietsSelect.element(by.css('option:checked')).getText();
  }

  async unsuitableDietsSelectLastOption(timeout?: number) {
    await this.unsuitableDietsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async unsuitableDietsSelectOption(option) {
    await this.unsuitableDietsSelect.sendKeys(option);
  }

  getUnsuitableDietsSelect(): ElementFinder {
    return this.unsuitableDietsSelect;
  }

  async getUnsuitableDietsSelectedOption() {
    return await this.unsuitableDietsSelect.element(by.css('option:checked')).getText();
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

export class ProductDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-product-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-product'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
