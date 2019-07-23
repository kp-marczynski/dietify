import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class MealPlanComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-meal-plan div table .btn-danger'));
  title = element.all(by.css('jhi-meal-plan div h2#page-heading span')).first();

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

export class MealPlanUpdatePage {
  pageTitle = element(by.id('jhi-meal-plan-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  authorIdInput = element(by.id('field_authorId'));
  creationDateInput = element(by.id('field_creationDate'));
  nameInput = element(by.id('field_name'));
  isVisibleInput = element(by.id('field_isVisible'));
  isLockedInput = element(by.id('field_isLocked'));
  languageInput = element(by.id('field_language'));
  numberOfDaysInput = element(by.id('field_numberOfDays'));
  numberOfMealsPerDayInput = element(by.id('field_numberOfMealsPerDay'));
  totalDailyEnergyInput = element(by.id('field_totalDailyEnergy'));
  percentOfProteinInput = element(by.id('field_percentOfProtein'));
  percentOfFatInput = element(by.id('field_percentOfFat'));
  percentOfCarbohydratesInput = element(by.id('field_percentOfCarbohydrates'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setAuthorIdInput(authorId) {
    await this.authorIdInput.sendKeys(authorId);
  }

  async getAuthorIdInput() {
    return await this.authorIdInput.getAttribute('value');
  }

  async setCreationDateInput(creationDate) {
    await this.creationDateInput.sendKeys(creationDate);
  }

  async getCreationDateInput() {
    return await this.creationDateInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  getIsVisibleInput(timeout?: number) {
    return this.isVisibleInput;
  }
  getIsLockedInput(timeout?: number) {
    return this.isLockedInput;
  }
  async setLanguageInput(language) {
    await this.languageInput.sendKeys(language);
  }

  async getLanguageInput() {
    return await this.languageInput.getAttribute('value');
  }

  async setNumberOfDaysInput(numberOfDays) {
    await this.numberOfDaysInput.sendKeys(numberOfDays);
  }

  async getNumberOfDaysInput() {
    return await this.numberOfDaysInput.getAttribute('value');
  }

  async setNumberOfMealsPerDayInput(numberOfMealsPerDay) {
    await this.numberOfMealsPerDayInput.sendKeys(numberOfMealsPerDay);
  }

  async getNumberOfMealsPerDayInput() {
    return await this.numberOfMealsPerDayInput.getAttribute('value');
  }

  async setTotalDailyEnergyInput(totalDailyEnergy) {
    await this.totalDailyEnergyInput.sendKeys(totalDailyEnergy);
  }

  async getTotalDailyEnergyInput() {
    return await this.totalDailyEnergyInput.getAttribute('value');
  }

  async setPercentOfProteinInput(percentOfProtein) {
    await this.percentOfProteinInput.sendKeys(percentOfProtein);
  }

  async getPercentOfProteinInput() {
    return await this.percentOfProteinInput.getAttribute('value');
  }

  async setPercentOfFatInput(percentOfFat) {
    await this.percentOfFatInput.sendKeys(percentOfFat);
  }

  async getPercentOfFatInput() {
    return await this.percentOfFatInput.getAttribute('value');
  }

  async setPercentOfCarbohydratesInput(percentOfCarbohydrates) {
    await this.percentOfCarbohydratesInput.sendKeys(percentOfCarbohydrates);
  }

  async getPercentOfCarbohydratesInput() {
    return await this.percentOfCarbohydratesInput.getAttribute('value');
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

export class MealPlanDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-mealPlan-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-mealPlan'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
