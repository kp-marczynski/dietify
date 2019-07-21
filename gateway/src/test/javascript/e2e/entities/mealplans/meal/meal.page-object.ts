import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class MealComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-meal div table .btn-danger'));
  title = element.all(by.css('jhi-meal div h2#page-heading span')).first();

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

export class MealUpdatePage {
  pageTitle = element(by.id('jhi-meal-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  ordinalNumberInput = element(by.id('field_ordinalNumber'));
  mealPlanDaySelect = element(by.id('field_mealPlanDay'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setOrdinalNumberInput(ordinalNumber) {
    await this.ordinalNumberInput.sendKeys(ordinalNumber);
  }

  async getOrdinalNumberInput() {
    return await this.ordinalNumberInput.getAttribute('value');
  }

  async mealPlanDaySelectLastOption(timeout?: number) {
    await this.mealPlanDaySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async mealPlanDaySelectOption(option) {
    await this.mealPlanDaySelect.sendKeys(option);
  }

  getMealPlanDaySelect(): ElementFinder {
    return this.mealPlanDaySelect;
  }

  async getMealPlanDaySelectedOption() {
    return await this.mealPlanDaySelect.element(by.css('option:checked')).getText();
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

export class MealDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-meal-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-meal'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
