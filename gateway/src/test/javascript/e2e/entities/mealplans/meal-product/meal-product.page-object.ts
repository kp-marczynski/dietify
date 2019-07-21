import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class MealProductComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-meal-product div table .btn-danger'));
  title = element.all(by.css('jhi-meal-product div h2#page-heading span')).first();

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

export class MealProductUpdatePage {
  pageTitle = element(by.id('jhi-meal-product-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  productIdInput = element(by.id('field_productId'));
  householdMeasureIdInput = element(by.id('field_householdMeasureId'));
  amountInput = element(by.id('field_amount'));
  mealSelect = element(by.id('field_meal'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setProductIdInput(productId) {
    await this.productIdInput.sendKeys(productId);
  }

  async getProductIdInput() {
    return await this.productIdInput.getAttribute('value');
  }

  async setHouseholdMeasureIdInput(householdMeasureId) {
    await this.householdMeasureIdInput.sendKeys(householdMeasureId);
  }

  async getHouseholdMeasureIdInput() {
    return await this.householdMeasureIdInput.getAttribute('value');
  }

  async setAmountInput(amount) {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput() {
    return await this.amountInput.getAttribute('value');
  }

  async mealSelectLastOption(timeout?: number) {
    await this.mealSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async mealSelectOption(option) {
    await this.mealSelect.sendKeys(option);
  }

  getMealSelect(): ElementFinder {
    return this.mealSelect;
  }

  async getMealSelectedOption() {
    return await this.mealSelect.element(by.css('option:checked')).getText();
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

export class MealProductDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-mealProduct-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-mealProduct'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
