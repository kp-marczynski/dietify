import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class UserExtraInfoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-user-extra-info div table .btn-danger'));
  title = element.all(by.css('jhi-user-extra-info div h2#page-heading span')).first();

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

export class UserExtraInfoUpdatePage {
  pageTitle = element(by.id('jhi-user-extra-info-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  genderSelect = element(by.id('field_gender'));
  dateOfBirthInput = element(by.id('field_dateOfBirth'));
  phoneNumberInput = element(by.id('field_phoneNumber'));
  streetAddressInput = element(by.id('field_streetAddress'));
  postalCodeInput = element(by.id('field_postalCode'));
  cityInput = element(by.id('field_city'));
  countryInput = element(by.id('field_country'));
  personalDescriptionInput = element(by.id('field_personalDescription'));
  userSelect = element(by.id('field_user'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setGenderSelect(gender) {
    await this.genderSelect.sendKeys(gender);
  }

  async getGenderSelect() {
    return await this.genderSelect.element(by.css('option:checked')).getText();
  }

  async genderSelectLastOption(timeout?: number) {
    await this.genderSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setDateOfBirthInput(dateOfBirth) {
    await this.dateOfBirthInput.sendKeys(dateOfBirth);
  }

  async getDateOfBirthInput() {
    return await this.dateOfBirthInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber) {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput() {
    return await this.phoneNumberInput.getAttribute('value');
  }

  async setStreetAddressInput(streetAddress) {
    await this.streetAddressInput.sendKeys(streetAddress);
  }

  async getStreetAddressInput() {
    return await this.streetAddressInput.getAttribute('value');
  }

  async setPostalCodeInput(postalCode) {
    await this.postalCodeInput.sendKeys(postalCode);
  }

  async getPostalCodeInput() {
    return await this.postalCodeInput.getAttribute('value');
  }

  async setCityInput(city) {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput() {
    return await this.cityInput.getAttribute('value');
  }

  async setCountryInput(country) {
    await this.countryInput.sendKeys(country);
  }

  async getCountryInput() {
    return await this.countryInput.getAttribute('value');
  }

  async setPersonalDescriptionInput(personalDescription) {
    await this.personalDescriptionInput.sendKeys(personalDescription);
  }

  async getPersonalDescriptionInput() {
    return await this.personalDescriptionInput.getAttribute('value');
  }

  async userSelectLastOption(timeout?: number) {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return await this.userSelect.element(by.css('option:checked')).getText();
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

export class UserExtraInfoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-userExtraInfo-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-userExtraInfo'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
