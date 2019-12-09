import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class LandingPageCardComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-landing-page-card div table .btn-danger'));
  title = element.all(by.css('jhi-landing-page-card div h2#page-heading span')).first();

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

export class LandingPageCardUpdatePage {
  pageTitle = element(by.id('jhi-landing-page-card-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  ordinalNumberInput = element(by.id('field_ordinalNumber'));
  htmlContentInput = element(by.id('field_htmlContent'));
  cardImageInput = element(by.id('file_cardImage'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setOrdinalNumberInput(ordinalNumber) {
    await this.ordinalNumberInput.sendKeys(ordinalNumber);
  }

  async getOrdinalNumberInput() {
    return await this.ordinalNumberInput.getAttribute('value');
  }

  async setHtmlContentInput(htmlContent) {
    await this.htmlContentInput.sendKeys(htmlContent);
  }

  async getHtmlContentInput() {
    return await this.htmlContentInput.getAttribute('value');
  }

  async setCardImageInput(cardImage) {
    await this.cardImageInput.sendKeys(cardImage);
  }

  async getCardImageInput() {
    return await this.cardImageInput.getAttribute('value');
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

export class LandingPageCardDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-landingPageCard-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-landingPageCard'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
