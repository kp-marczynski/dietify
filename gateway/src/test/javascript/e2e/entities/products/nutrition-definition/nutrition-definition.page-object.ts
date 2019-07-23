import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class NutritionDefinitionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-nutrition-definition div table .btn-danger'));
  title = element.all(by.css('jhi-nutrition-definition div h2#page-heading span')).first();

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

export class NutritionDefinitionUpdatePage {
  pageTitle = element(by.id('jhi-nutrition-definition-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  tagInput = element(by.id('field_tag'));
  descriptionInput = element(by.id('field_description'));
  unitsInput = element(by.id('field_units'));
  decimalPlacesInput = element(by.id('field_decimalPlaces'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTagInput(tag) {
    await this.tagInput.sendKeys(tag);
  }

  async getTagInput() {
    return await this.tagInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async setUnitsInput(units) {
    await this.unitsInput.sendKeys(units);
  }

  async getUnitsInput() {
    return await this.unitsInput.getAttribute('value');
  }

  async setDecimalPlacesInput(decimalPlaces) {
    await this.decimalPlacesInput.sendKeys(decimalPlaces);
  }

  async getDecimalPlacesInput() {
    return await this.decimalPlacesInput.getAttribute('value');
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

export class NutritionDefinitionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-nutritionDefinition-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-nutritionDefinition'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
