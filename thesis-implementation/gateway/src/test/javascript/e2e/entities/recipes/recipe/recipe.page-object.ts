import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class RecipeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-recipe div table .btn-danger'));
  title = element.all(by.css('jhi-recipe div h2#page-heading span')).first();

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

export class RecipeUpdatePage {
  pageTitle = element(by.id('jhi-recipe-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  preparationTimeMinutesInput = element(by.id('field_preparationTimeMinutes'));
  numberOfPortionsInput = element(by.id('field_numberOfPortions'));
  imageInput = element(by.id('file_image'));
  authorIdInput = element(by.id('field_authorId'));
  creationDateInput = element(by.id('field_creationDate'));
  lastEditDateInput = element(by.id('field_lastEditDate'));
  isVisibleInput = element(by.id('field_isVisible'));
  languageInput = element(by.id('field_language'));
  totalGramsWeightInput = element(by.id('field_totalGramsWeight'));
  basicNutritionDataSelect = element(by.id('field_basicNutritionData'));
  sourceRecipeSelect = element(by.id('field_sourceRecipe'));
  kitchenAppliancesSelect = element(by.id('field_kitchenAppliances'));
  dishTypesSelect = element(by.id('field_dishTypes'));
  mealTypesSelect = element(by.id('field_mealTypes'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setPreparationTimeMinutesInput(preparationTimeMinutes) {
    await this.preparationTimeMinutesInput.sendKeys(preparationTimeMinutes);
  }

  async getPreparationTimeMinutesInput() {
    return await this.preparationTimeMinutesInput.getAttribute('value');
  }

  async setNumberOfPortionsInput(numberOfPortions) {
    await this.numberOfPortionsInput.sendKeys(numberOfPortions);
  }

  async getNumberOfPortionsInput() {
    return await this.numberOfPortionsInput.getAttribute('value');
  }

  async setImageInput(image) {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput() {
    return await this.imageInput.getAttribute('value');
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

  async setLastEditDateInput(lastEditDate) {
    await this.lastEditDateInput.sendKeys(lastEditDate);
  }

  async getLastEditDateInput() {
    return await this.lastEditDateInput.getAttribute('value');
  }

  getIsVisibleInput(timeout?: number) {
    return this.isVisibleInput;
  }
  async setLanguageInput(language) {
    await this.languageInput.sendKeys(language);
  }

  async getLanguageInput() {
    return await this.languageInput.getAttribute('value');
  }

  async setTotalGramsWeightInput(totalGramsWeight) {
    await this.totalGramsWeightInput.sendKeys(totalGramsWeight);
  }

  async getTotalGramsWeightInput() {
    return await this.totalGramsWeightInput.getAttribute('value');
  }

  async basicNutritionDataSelectLastOption(timeout?: number) {
    await this.basicNutritionDataSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async basicNutritionDataSelectOption(option) {
    await this.basicNutritionDataSelect.sendKeys(option);
  }

  getBasicNutritionDataSelect(): ElementFinder {
    return this.basicNutritionDataSelect;
  }

  async getBasicNutritionDataSelectedOption() {
    return await this.basicNutritionDataSelect.element(by.css('option:checked')).getText();
  }

  async sourceRecipeSelectLastOption(timeout?: number) {
    await this.sourceRecipeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async sourceRecipeSelectOption(option) {
    await this.sourceRecipeSelect.sendKeys(option);
  }

  getSourceRecipeSelect(): ElementFinder {
    return this.sourceRecipeSelect;
  }

  async getSourceRecipeSelectedOption() {
    return await this.sourceRecipeSelect.element(by.css('option:checked')).getText();
  }

  async kitchenAppliancesSelectLastOption(timeout?: number) {
    await this.kitchenAppliancesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async kitchenAppliancesSelectOption(option) {
    await this.kitchenAppliancesSelect.sendKeys(option);
  }

  getKitchenAppliancesSelect(): ElementFinder {
    return this.kitchenAppliancesSelect;
  }

  async getKitchenAppliancesSelectedOption() {
    return await this.kitchenAppliancesSelect.element(by.css('option:checked')).getText();
  }

  async dishTypesSelectLastOption(timeout?: number) {
    await this.dishTypesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async dishTypesSelectOption(option) {
    await this.dishTypesSelect.sendKeys(option);
  }

  getDishTypesSelect(): ElementFinder {
    return this.dishTypesSelect;
  }

  async getDishTypesSelectedOption() {
    return await this.dishTypesSelect.element(by.css('option:checked')).getText();
  }

  async mealTypesSelectLastOption(timeout?: number) {
    await this.mealTypesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async mealTypesSelectOption(option) {
    await this.mealTypesSelect.sendKeys(option);
  }

  getMealTypesSelect(): ElementFinder {
    return this.mealTypesSelect;
  }

  async getMealTypesSelectedOption() {
    return await this.mealTypesSelect.element(by.css('option:checked')).getText();
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

export class RecipeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-recipe-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-recipe'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
