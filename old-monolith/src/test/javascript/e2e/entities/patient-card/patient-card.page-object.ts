import { element, by, ElementFinder } from 'protractor';

export class PatientCardComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-patient-card div table .btn-danger'));
    title = element.all(by.css('jhi-patient-card div h2#page-heading span')).first();

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

export class PatientCardUpdatePage {
    pageTitle = element(by.id('jhi-patient-card-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    creationDateInput = element(by.id('field_creationDate'));
    patientSelect = element(by.id('field_patient'));
    dieteticianSelect = element(by.id('field_dietetician'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setCreationDateInput(creationDate) {
        await this.creationDateInput.sendKeys(creationDate);
    }

    async getCreationDateInput() {
        return this.creationDateInput.getAttribute('value');
    }

    async patientSelectLastOption() {
        await this.patientSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async patientSelectOption(option) {
        await this.patientSelect.sendKeys(option);
    }

    getPatientSelect(): ElementFinder {
        return this.patientSelect;
    }

    async getPatientSelectedOption() {
        return this.patientSelect.element(by.css('option:checked')).getText();
    }

    async dieteticianSelectLastOption() {
        await this.dieteticianSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async dieteticianSelectOption(option) {
        await this.dieteticianSelect.sendKeys(option);
    }

    getDieteticianSelect(): ElementFinder {
        return this.dieteticianSelect;
    }

    async getDieteticianSelectedOption() {
        return this.dieteticianSelect.element(by.css('option:checked')).getText();
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

export class PatientCardDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-patientCard-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-patientCard'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
