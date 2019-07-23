import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ProductCategoryTranslationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-product-category-translation div table .btn-danger'));
  title = element.all(by.css('jhi-product-category-translation div h2#page-heading span')).first();

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

export class ProductCategoryTranslationUpdatePage {
  pageTitle = element(by.id('jhi-product-category-translation-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  translationInput = element(by.id('field_translation'));
  languageInput = element(by.id('field_language'));
  productCategorySelect = element(by.id('field_productCategory'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTranslationInput(translation) {
    await this.translationInput.sendKeys(translation);
  }

  async getTranslationInput() {
    return await this.translationInput.getAttribute('value');
  }

  async setLanguageInput(language) {
    await this.languageInput.sendKeys(language);
  }

  async getLanguageInput() {
    return await this.languageInput.getAttribute('value');
  }

  async productCategorySelectLastOption(timeout?: number) {
    await this.productCategorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productCategorySelectOption(option) {
    await this.productCategorySelect.sendKeys(option);
  }

  getProductCategorySelect(): ElementFinder {
    return this.productCategorySelect;
  }

  async getProductCategorySelectedOption() {
    return await this.productCategorySelect.element(by.css('option:checked')).getText();
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

export class ProductCategoryTranslationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-productCategoryTranslation-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-productCategoryTranslation'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
