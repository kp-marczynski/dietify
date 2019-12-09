import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class OwnedKitchenApplianceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-owned-kitchen-appliance div table .btn-danger'));
  title = element.all(by.css('jhi-owned-kitchen-appliance div h2#page-heading span')).first();

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

export class OwnedKitchenApplianceUpdatePage {
  pageTitle = element(by.id('jhi-owned-kitchen-appliance-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  kitchenApplianceIdInput = element(by.id('field_kitchenApplianceId'));
  nutritionalInterviewSelect = element(by.id('field_nutritionalInterview'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setKitchenApplianceIdInput(kitchenApplianceId) {
    await this.kitchenApplianceIdInput.sendKeys(kitchenApplianceId);
  }

  async getKitchenApplianceIdInput() {
    return await this.kitchenApplianceIdInput.getAttribute('value');
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

export class OwnedKitchenApplianceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ownedKitchenAppliance-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ownedKitchenAppliance'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
