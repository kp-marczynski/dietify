import { element, by, ElementFinder } from 'protractor';

export class PatientComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-patient div table .btn-danger'));
    title = element.all(by.css('jhi-patient div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class PatientUpdatePage {
    pageTitle = element(by.id('jhi-patient-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    userIdInput = element(by.id('field_userId'));
    genderSelect = element(by.id('field_gender'));
    dateOfBirthInput = element(by.id('field_dateOfBirth'));
    preferableLanguageIdInput = element(by.id('field_preferableLanguageId'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setUserIdInput(userId) {
        await this.userIdInput.sendKeys(userId);
    }

    async getUserIdInput() {
        return this.userIdInput.getAttribute('value');
    }

    async setGenderSelect(gender) {
        await this.genderSelect.sendKeys(gender);
    }

    async getGenderSelect() {
        return this.genderSelect.element(by.css('option:checked')).getText();
    }

    async genderSelectLastOption() {
        await this.genderSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setDateOfBirthInput(dateOfBirth) {
        await this.dateOfBirthInput.sendKeys(dateOfBirth);
    }

    async getDateOfBirthInput() {
        return this.dateOfBirthInput.getAttribute('value');
    }

    async setPreferableLanguageIdInput(preferableLanguageId) {
        await this.preferableLanguageIdInput.sendKeys(preferableLanguageId);
    }

    async getPreferableLanguageIdInput() {
        return this.preferableLanguageIdInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class PatientDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-patient-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-patient'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
