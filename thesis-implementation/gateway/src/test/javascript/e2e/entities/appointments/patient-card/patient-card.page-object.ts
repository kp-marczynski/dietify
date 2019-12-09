import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class PatientCardComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-patient-card div table .btn-danger'));
  title = element.all(by.css('jhi-patient-card div h2#page-heading span')).first();

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

export class PatientCardUpdatePage {
  pageTitle = element(by.id('jhi-patient-card-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  creationDateInput = element(by.id('field_creationDate'));
  dietitianIdInput = element(by.id('field_dietitianId'));
  patientIdInput = element(by.id('field_patientId'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCreationDateInput(creationDate) {
    await this.creationDateInput.sendKeys(creationDate);
  }

  async getCreationDateInput() {
    return await this.creationDateInput.getAttribute('value');
  }

  async setDietitianIdInput(dietitianId) {
    await this.dietitianIdInput.sendKeys(dietitianId);
  }

  async getDietitianIdInput() {
    return await this.dietitianIdInput.getAttribute('value');
  }

  async setPatientIdInput(patientId) {
    await this.patientIdInput.sendKeys(patientId);
  }

  async getPatientIdInput() {
    return await this.patientIdInput.getAttribute('value');
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

export class PatientCardDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-patientCard-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-patientCard'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
