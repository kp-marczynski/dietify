import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class KitchenApplianceTranslationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-kitchen-appliance-translation div table .btn-danger'));
  title = element.all(by.css('jhi-kitchen-appliance-translation div h2#page-heading span')).first();

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

export class KitchenApplianceTranslationUpdatePage {
  pageTitle = element(by.id('jhi-kitchen-appliance-translation-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  translationInput = element(by.id('field_translation'));
  languageInput = element(by.id('field_language'));
  kitchenApplianceSelect = element(by.id('field_kitchenAppliance'));

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

  async kitchenApplianceSelectLastOption(timeout?: number) {
    await this.kitchenApplianceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async kitchenApplianceSelectOption(option) {
    await this.kitchenApplianceSelect.sendKeys(option);
  }

  getKitchenApplianceSelect(): ElementFinder {
    return this.kitchenApplianceSelect;
  }

  async getKitchenApplianceSelectedOption() {
    return await this.kitchenApplianceSelect.element(by.css('option:checked')).getText();
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

export class KitchenApplianceTranslationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-kitchenApplianceTranslation-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-kitchenApplianceTranslation'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
