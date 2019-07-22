import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class RecipeBasicNutritionDataComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-recipe-basic-nutrition-data div table .btn-danger'));
  title = element.all(by.css('jhi-recipe-basic-nutrition-data div h2#page-heading span')).first();

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

export class RecipeBasicNutritionDataUpdatePage {
  pageTitle = element(by.id('jhi-recipe-basic-nutrition-data-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  energyInput = element(by.id('field_energy'));
  proteinInput = element(by.id('field_protein'));
  fatInput = element(by.id('field_fat'));
  carbohydratesInput = element(by.id('field_carbohydrates'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setEnergyInput(energy) {
    await this.energyInput.sendKeys(energy);
  }

  async getEnergyInput() {
    return await this.energyInput.getAttribute('value');
  }

  async setProteinInput(protein) {
    await this.proteinInput.sendKeys(protein);
  }

  async getProteinInput() {
    return await this.proteinInput.getAttribute('value');
  }

  async setFatInput(fat) {
    await this.fatInput.sendKeys(fat);
  }

  async getFatInput() {
    return await this.fatInput.getAttribute('value');
  }

  async setCarbohydratesInput(carbohydrates) {
    await this.carbohydratesInput.sendKeys(carbohydrates);
  }

  async getCarbohydratesInput() {
    return await this.carbohydratesInput.getAttribute('value');
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

export class RecipeBasicNutritionDataDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-recipeBasicNutritionData-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-recipeBasicNutritionData'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
