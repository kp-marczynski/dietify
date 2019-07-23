import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class NutritionDataComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-nutrition-data div table .btn-danger'));
  title = element.all(by.css('jhi-nutrition-data div h2#page-heading span')).first();

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

export class NutritionDataUpdatePage {
  pageTitle = element(by.id('jhi-nutrition-data-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nutritionValueInput = element(by.id('field_nutritionValue'));
  nutritionDefinitionSelect = element(by.id('field_nutritionDefinition'));
  productSelect = element(by.id('field_product'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNutritionValueInput(nutritionValue) {
    await this.nutritionValueInput.sendKeys(nutritionValue);
  }

  async getNutritionValueInput() {
    return await this.nutritionValueInput.getAttribute('value');
  }

  async nutritionDefinitionSelectLastOption(timeout?: number) {
    await this.nutritionDefinitionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async nutritionDefinitionSelectOption(option) {
    await this.nutritionDefinitionSelect.sendKeys(option);
  }

  getNutritionDefinitionSelect(): ElementFinder {
    return this.nutritionDefinitionSelect;
  }

  async getNutritionDefinitionSelectedOption() {
    return await this.nutritionDefinitionSelect.element(by.css('option:checked')).getText();
  }

  async productSelectLastOption(timeout?: number) {
    await this.productSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productSelectOption(option) {
    await this.productSelect.sendKeys(option);
  }

  getProductSelect(): ElementFinder {
    return this.productSelect;
  }

  async getProductSelectedOption() {
    return await this.productSelect.element(by.css('option:checked')).getText();
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

export class NutritionDataDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-nutritionData-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-nutritionData'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
