import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class NutritionalInterviewComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-nutritional-interview div table .btn-danger'));
  title = element.all(by.css('jhi-nutritional-interview div h2#page-heading span')).first();

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

export class NutritionalInterviewUpdatePage {
  pageTitle = element(by.id('jhi-nutritional-interview-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  completionDateInput = element(by.id('field_completionDate'));
  targetWeightInput = element(by.id('field_targetWeight'));
  advicePurposeInput = element(by.id('field_advicePurpose'));
  physicalActivitySelect = element(by.id('field_physicalActivity'));
  diseasesInput = element(by.id('field_diseases'));
  medicinesInput = element(by.id('field_medicines'));
  jobTypeSelect = element(by.id('field_jobType'));
  likedProductsInput = element(by.id('field_likedProducts'));
  dislikedProductsInput = element(by.id('field_dislikedProducts'));
  foodAllergiesInput = element(by.id('field_foodAllergies'));
  foodIntolerancesInput = element(by.id('field_foodIntolerances'));
  appointmentSelect = element(by.id('field_appointment'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCompletionDateInput(completionDate) {
    await this.completionDateInput.sendKeys(completionDate);
  }

  async getCompletionDateInput() {
    return await this.completionDateInput.getAttribute('value');
  }

  async setTargetWeightInput(targetWeight) {
    await this.targetWeightInput.sendKeys(targetWeight);
  }

  async getTargetWeightInput() {
    return await this.targetWeightInput.getAttribute('value');
  }

  async setAdvicePurposeInput(advicePurpose) {
    await this.advicePurposeInput.sendKeys(advicePurpose);
  }

  async getAdvicePurposeInput() {
    return await this.advicePurposeInput.getAttribute('value');
  }

  async setPhysicalActivitySelect(physicalActivity) {
    await this.physicalActivitySelect.sendKeys(physicalActivity);
  }

  async getPhysicalActivitySelect() {
    return await this.physicalActivitySelect.element(by.css('option:checked')).getText();
  }

  async physicalActivitySelectLastOption(timeout?: number) {
    await this.physicalActivitySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setDiseasesInput(diseases) {
    await this.diseasesInput.sendKeys(diseases);
  }

  async getDiseasesInput() {
    return await this.diseasesInput.getAttribute('value');
  }

  async setMedicinesInput(medicines) {
    await this.medicinesInput.sendKeys(medicines);
  }

  async getMedicinesInput() {
    return await this.medicinesInput.getAttribute('value');
  }

  async setJobTypeSelect(jobType) {
    await this.jobTypeSelect.sendKeys(jobType);
  }

  async getJobTypeSelect() {
    return await this.jobTypeSelect.element(by.css('option:checked')).getText();
  }

  async jobTypeSelectLastOption(timeout?: number) {
    await this.jobTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setLikedProductsInput(likedProducts) {
    await this.likedProductsInput.sendKeys(likedProducts);
  }

  async getLikedProductsInput() {
    return await this.likedProductsInput.getAttribute('value');
  }

  async setDislikedProductsInput(dislikedProducts) {
    await this.dislikedProductsInput.sendKeys(dislikedProducts);
  }

  async getDislikedProductsInput() {
    return await this.dislikedProductsInput.getAttribute('value');
  }

  async setFoodAllergiesInput(foodAllergies) {
    await this.foodAllergiesInput.sendKeys(foodAllergies);
  }

  async getFoodAllergiesInput() {
    return await this.foodAllergiesInput.getAttribute('value');
  }

  async setFoodIntolerancesInput(foodIntolerances) {
    await this.foodIntolerancesInput.sendKeys(foodIntolerances);
  }

  async getFoodIntolerancesInput() {
    return await this.foodIntolerancesInput.getAttribute('value');
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

export class NutritionalInterviewDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-nutritionalInterview-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-nutritionalInterview'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
