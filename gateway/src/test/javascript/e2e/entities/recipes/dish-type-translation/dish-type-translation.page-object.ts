import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class DishTypeTranslationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-dish-type-translation div table .btn-danger'));
  title = element.all(by.css('jhi-dish-type-translation div h2#page-heading span')).first();

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

export class DishTypeTranslationUpdatePage {
  pageTitle = element(by.id('jhi-dish-type-translation-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  translationInput = element(by.id('field_translation'));
  languageInput = element(by.id('field_language'));
  dishTypeSelect = element(by.id('field_dishType'));

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

  async dishTypeSelectLastOption(timeout?: number) {
    await this.dishTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async dishTypeSelectOption(option) {
    await this.dishTypeSelect.sendKeys(option);
  }

  getDishTypeSelect(): ElementFinder {
    return this.dishTypeSelect;
  }

  async getDishTypeSelectedOption() {
    return await this.dishTypeSelect.element(by.css('option:checked')).getText();
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

export class DishTypeTranslationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-dishTypeTranslation-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-dishTypeTranslation'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
