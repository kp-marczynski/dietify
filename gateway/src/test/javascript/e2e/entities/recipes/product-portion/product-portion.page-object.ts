import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ProductPortionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-product-portion div table .btn-danger'));
  title = element.all(by.css('jhi-product-portion div h2#page-heading span')).first();

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

export class ProductPortionUpdatePage {
  pageTitle = element(by.id('jhi-product-portion-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  amountInput = element(by.id('field_amount'));
  productIdInput = element(by.id('field_productId'));
  householdMeasureIdInput = element(by.id('field_householdMeasureId'));
  recipeSectionSelect = element(by.id('field_recipeSection'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setAmountInput(amount) {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput() {
    return await this.amountInput.getAttribute('value');
  }

  async setProductIdInput(productId) {
    await this.productIdInput.sendKeys(productId);
  }

  async getProductIdInput() {
    return await this.productIdInput.getAttribute('value');
  }

  async setHouseholdMeasureIdInput(householdMeasureId) {
    await this.householdMeasureIdInput.sendKeys(householdMeasureId);
  }

  async getHouseholdMeasureIdInput() {
    return await this.householdMeasureIdInput.getAttribute('value');
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

export class ProductPortionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-productPortion-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-productPortion'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
