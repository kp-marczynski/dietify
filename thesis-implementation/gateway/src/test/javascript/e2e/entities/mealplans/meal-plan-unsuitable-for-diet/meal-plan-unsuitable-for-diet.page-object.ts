import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class MealPlanUnsuitableForDietComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-meal-plan-unsuitable-for-diet div table .btn-danger'));
  title = element.all(by.css('jhi-meal-plan-unsuitable-for-diet div h2#page-heading span')).first();

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

export class MealPlanUnsuitableForDietUpdatePage {
  pageTitle = element(by.id('jhi-meal-plan-unsuitable-for-diet-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  dietTypeIdInput = element(by.id('field_dietTypeId'));
  mealPlanSelect = element(by.id('field_mealPlan'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDietTypeIdInput(dietTypeId) {
    await this.dietTypeIdInput.sendKeys(dietTypeId);
  }

  async getDietTypeIdInput() {
    return await this.dietTypeIdInput.getAttribute('value');
  }

  async mealPlanSelectLastOption(timeout?: number) {
    await this.mealPlanSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async mealPlanSelectOption(option) {
    await this.mealPlanSelect.sendKeys(option);
  }

  getMealPlanSelect(): ElementFinder {
    return this.mealPlanSelect;
  }

  async getMealPlanSelectedOption() {
    return await this.mealPlanSelect.element(by.css('option:checked')).getText();
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

export class MealPlanUnsuitableForDietDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-mealPlanUnsuitableForDiet-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-mealPlanUnsuitableForDiet'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
