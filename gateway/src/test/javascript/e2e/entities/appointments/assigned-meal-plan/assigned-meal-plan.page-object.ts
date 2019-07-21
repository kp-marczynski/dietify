import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class AssignedMealPlanComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-assigned-meal-plan div table .btn-danger'));
  title = element.all(by.css('jhi-assigned-meal-plan div h2#page-heading span')).first();

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

export class AssignedMealPlanUpdatePage {
  pageTitle = element(by.id('jhi-assigned-meal-plan-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  mealPlanIdInput = element(by.id('field_mealPlanId'));
  appointmentSelect = element(by.id('field_appointment'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setMealPlanIdInput(mealPlanId) {
    await this.mealPlanIdInput.sendKeys(mealPlanId);
  }

  async getMealPlanIdInput() {
    return await this.mealPlanIdInput.getAttribute('value');
  }

  async appointmentSelectLastOption(timeout?: number) {
    await this.appointmentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async appointmentSelectOption(option) {
    await this.appointmentSelect.sendKeys(option);
  }

  getAppointmentSelect(): ElementFinder {
    return this.appointmentSelect;
  }

  async getAppointmentSelectedOption() {
    return await this.appointmentSelect.element(by.css('option:checked')).getText();
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

export class AssignedMealPlanDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-assignedMealPlan-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-assignedMealPlan'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
