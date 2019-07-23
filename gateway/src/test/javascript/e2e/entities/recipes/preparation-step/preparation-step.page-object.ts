import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class PreparationStepComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-preparation-step div table .btn-danger'));
  title = element.all(by.css('jhi-preparation-step div h2#page-heading span')).first();

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

export class PreparationStepUpdatePage {
  pageTitle = element(by.id('jhi-preparation-step-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  ordinalNumberInput = element(by.id('field_ordinalNumber'));
  stepDescriptionInput = element(by.id('field_stepDescription'));
  recipeSectionSelect = element(by.id('field_recipeSection'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setOrdinalNumberInput(ordinalNumber) {
    await this.ordinalNumberInput.sendKeys(ordinalNumber);
  }

  async getOrdinalNumberInput() {
    return await this.ordinalNumberInput.getAttribute('value');
  }

  async setStepDescriptionInput(stepDescription) {
    await this.stepDescriptionInput.sendKeys(stepDescription);
  }

  async getStepDescriptionInput() {
    return await this.stepDescriptionInput.getAttribute('value');
  }

  async recipeSectionSelectLastOption(timeout?: number) {
    await this.recipeSectionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async recipeSectionSelectOption(option) {
    await this.recipeSectionSelect.sendKeys(option);
  }

  getRecipeSectionSelect(): ElementFinder {
    return this.recipeSectionSelect;
  }

  async getRecipeSectionSelectedOption() {
    return await this.recipeSectionSelect.element(by.css('option:checked')).getText();
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

export class PreparationStepDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-preparationStep-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-preparationStep'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
