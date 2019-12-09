import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class AppointmentEvaluationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-appointment-evaluation div table .btn-danger'));
  title = element.all(by.css('jhi-appointment-evaluation div h2#page-heading span')).first();

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

export class AppointmentEvaluationUpdatePage {
  pageTitle = element(by.id('jhi-appointment-evaluation-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  overallSatisfactionSelect = element(by.id('field_overallSatisfaction'));
  dietitianServiceSatisfactionSelect = element(by.id('field_dietitianServiceSatisfaction'));
  mealPlanOverallSatisfactionSelect = element(by.id('field_mealPlanOverallSatisfaction'));
  mealCostSatisfactionSelect = element(by.id('field_mealCostSatisfaction'));
  mealPreparationTimeSatisfactionSelect = element(by.id('field_mealPreparationTimeSatisfaction'));
  mealComplexityLevelSatisfactionSelect = element(by.id('field_mealComplexityLevelSatisfaction'));
  mealTastefulnessSatisfactionSelect = element(by.id('field_mealTastefulnessSatisfaction'));
  dietaryResultSatisfactionSelect = element(by.id('field_dietaryResultSatisfaction'));
  commentInput = element(by.id('field_comment'));
  appointmentSelect = element(by.id('field_appointment'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setOverallSatisfactionSelect(overallSatisfaction) {
    await this.overallSatisfactionSelect.sendKeys(overallSatisfaction);
  }

  async getOverallSatisfactionSelect() {
    return await this.overallSatisfactionSelect.element(by.css('option:checked')).getText();
  }

  async overallSatisfactionSelectLastOption(timeout?: number) {
    await this.overallSatisfactionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setDietitianServiceSatisfactionSelect(dietitianServiceSatisfaction) {
    await this.dietitianServiceSatisfactionSelect.sendKeys(dietitianServiceSatisfaction);
  }

  async getDietitianServiceSatisfactionSelect() {
    return await this.dietitianServiceSatisfactionSelect.element(by.css('option:checked')).getText();
  }

  async dietitianServiceSatisfactionSelectLastOption(timeout?: number) {
    await this.dietitianServiceSatisfactionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setMealPlanOverallSatisfactionSelect(mealPlanOverallSatisfaction) {
    await this.mealPlanOverallSatisfactionSelect.sendKeys(mealPlanOverallSatisfaction);
  }

  async getMealPlanOverallSatisfactionSelect() {
    return await this.mealPlanOverallSatisfactionSelect.element(by.css('option:checked')).getText();
  }

  async mealPlanOverallSatisfactionSelectLastOption(timeout?: number) {
    await this.mealPlanOverallSatisfactionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setMealCostSatisfactionSelect(mealCostSatisfaction) {
    await this.mealCostSatisfactionSelect.sendKeys(mealCostSatisfaction);
  }

  async getMealCostSatisfactionSelect() {
    return await this.mealCostSatisfactionSelect.element(by.css('option:checked')).getText();
  }

  async mealCostSatisfactionSelectLastOption(timeout?: number) {
    await this.mealCostSatisfactionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setMealPreparationTimeSatisfactionSelect(mealPreparationTimeSatisfaction) {
    await this.mealPreparationTimeSatisfactionSelect.sendKeys(mealPreparationTimeSatisfaction);
  }

  async getMealPreparationTimeSatisfactionSelect() {
    return await this.mealPreparationTimeSatisfactionSelect.element(by.css('option:checked')).getText();
  }

  async mealPreparationTimeSatisfactionSelectLastOption(timeout?: number) {
    await this.mealPreparationTimeSatisfactionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setMealComplexityLevelSatisfactionSelect(mealComplexityLevelSatisfaction) {
    await this.mealComplexityLevelSatisfactionSelect.sendKeys(mealComplexityLevelSatisfaction);
  }

  async getMealComplexityLevelSatisfactionSelect() {
    return await this.mealComplexityLevelSatisfactionSelect.element(by.css('option:checked')).getText();
  }

  async mealComplexityLevelSatisfactionSelectLastOption(timeout?: number) {
    await this.mealComplexityLevelSatisfactionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setMealTastefulnessSatisfactionSelect(mealTastefulnessSatisfaction) {
    await this.mealTastefulnessSatisfactionSelect.sendKeys(mealTastefulnessSatisfaction);
  }

  async getMealTastefulnessSatisfactionSelect() {
    return await this.mealTastefulnessSatisfactionSelect.element(by.css('option:checked')).getText();
  }

  async mealTastefulnessSatisfactionSelectLastOption(timeout?: number) {
    await this.mealTastefulnessSatisfactionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setDietaryResultSatisfactionSelect(dietaryResultSatisfaction) {
    await this.dietaryResultSatisfactionSelect.sendKeys(dietaryResultSatisfaction);
  }

  async getDietaryResultSatisfactionSelect() {
    return await this.dietaryResultSatisfactionSelect.element(by.css('option:checked')).getText();
  }

  async dietaryResultSatisfactionSelectLastOption(timeout?: number) {
    await this.dietaryResultSatisfactionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setCommentInput(comment) {
    await this.commentInput.sendKeys(comment);
  }

  async getCommentInput() {
    return await this.commentInput.getAttribute('value');
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

export class AppointmentEvaluationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-appointmentEvaluation-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-appointmentEvaluation'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
