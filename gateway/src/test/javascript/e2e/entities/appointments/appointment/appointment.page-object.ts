import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class AppointmentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-appointment div table .btn-danger'));
  title = element.all(by.css('jhi-appointment div h2#page-heading span')).first();

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

export class AppointmentUpdatePage {
  pageTitle = element(by.id('jhi-appointment-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  appointmentDateInput = element(by.id('field_appointmentDate'));
  appointmentStateSelect = element(by.id('field_appointmentState'));
  mealPlanIdInput = element(by.id('field_mealPlanId'));
  generalAdviceInput = element(by.id('field_generalAdvice'));
  bodyMeasurementSelect = element(by.id('field_bodyMeasurement'));
  nutritionalInterviewSelect = element(by.id('field_nutritionalInterview'));
  patientCardSelect = element(by.id('field_patientCard'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setAppointmentDateInput(appointmentDate) {
    await this.appointmentDateInput.sendKeys(appointmentDate);
  }

  async getAppointmentDateInput() {
    return await this.appointmentDateInput.getAttribute('value');
  }

  async setAppointmentStateSelect(appointmentState) {
    await this.appointmentStateSelect.sendKeys(appointmentState);
  }

  async getAppointmentStateSelect() {
    return await this.appointmentStateSelect.element(by.css('option:checked')).getText();
  }

  async appointmentStateSelectLastOption(timeout?: number) {
    await this.appointmentStateSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setMealPlanIdInput(mealPlanId) {
    await this.mealPlanIdInput.sendKeys(mealPlanId);
  }

  async getMealPlanIdInput() {
    return await this.mealPlanIdInput.getAttribute('value');
  }

  async setGeneralAdviceInput(generalAdvice) {
    await this.generalAdviceInput.sendKeys(generalAdvice);
  }

  async getGeneralAdviceInput() {
    return await this.generalAdviceInput.getAttribute('value');
  }

  async bodyMeasurementSelectLastOption(timeout?: number) {
    await this.bodyMeasurementSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async bodyMeasurementSelectOption(option) {
    await this.bodyMeasurementSelect.sendKeys(option);
  }

  getBodyMeasurementSelect(): ElementFinder {
    return this.bodyMeasurementSelect;
  }

  async getBodyMeasurementSelectedOption() {
    return await this.bodyMeasurementSelect.element(by.css('option:checked')).getText();
  }

  async nutritionalInterviewSelectLastOption(timeout?: number) {
    await this.nutritionalInterviewSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async nutritionalInterviewSelectOption(option) {
    await this.nutritionalInterviewSelect.sendKeys(option);
  }

  getNutritionalInterviewSelect(): ElementFinder {
    return this.nutritionalInterviewSelect;
  }

  async getNutritionalInterviewSelectedOption() {
    return await this.nutritionalInterviewSelect.element(by.css('option:checked')).getText();
  }

  async patientCardSelectLastOption(timeout?: number) {
    await this.patientCardSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async patientCardSelectOption(option) {
    await this.patientCardSelect.sendKeys(option);
  }

  getPatientCardSelect(): ElementFinder {
    return this.patientCardSelect;
  }

  async getPatientCardSelectedOption() {
    return await this.patientCardSelect.element(by.css('option:checked')).getText();
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

export class AppointmentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-appointment-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-appointment'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
