import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class RecipeSectionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-recipe-section div table .btn-danger'));
  title = element.all(by.css('jhi-recipe-section div h2#page-heading span')).first();

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

export class RecipeSectionUpdatePage {
  pageTitle = element(by.id('jhi-recipe-section-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  sectionNameInput = element(by.id('field_sectionName'));
  recipeSelect = element(by.id('field_recipe'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSectionNameInput(sectionName) {
    await this.sectionNameInput.sendKeys(sectionName);
  }

  async getSectionNameInput() {
    return await this.sectionNameInput.getAttribute('value');
  }

  async recipeSelectLastOption(timeout?: number) {
    await this.recipeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async recipeSelectOption(option) {
    await this.recipeSelect.sendKeys(option);
  }

  getRecipeSelect(): ElementFinder {
    return this.recipeSelect;
  }

  async getRecipeSelectedOption() {
    return await this.recipeSelect.element(by.css('option:checked')).getText();
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

export class RecipeSectionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-recipeSection-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-recipeSection'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
