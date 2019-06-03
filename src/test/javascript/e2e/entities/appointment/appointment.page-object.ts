import { element, by, ElementFinder } from 'protractor';

export class AppointmentComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-appointment div table .btn-danger'));
    title = element.all(by.css('jhi-appointment div h2#page-heading span')).first();

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

export class AppointmentUpdatePage {
    pageTitle = element(by.id('jhi-appointment-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    appointmentDateInput = element(by.id('field_appointmentDate'));
    appointmentStateSelect = element(by.id('field_appointmentState'));
    mealPlanIdInput = element(by.id('field_mealPlanId'));
    generalAdviceInput = element(by.id('field_generalAdvice'));
    bodyMeasurmentSelect = element(by.id('field_bodyMeasurment'));
    patientCardSelect = element(by.id('field_patientCard'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setAppointmentDateInput(appointmentDate) {
        await this.appointmentDateInput.sendKeys(appointmentDate);
    }

    async getAppointmentDateInput() {
        return this.appointmentDateInput.getAttribute('value');
    }

    async setAppointmentStateSelect(appointmentState) {
        await this.appointmentStateSelect.sendKeys(appointmentState);
    }

    async getAppointmentStateSelect() {
        return this.appointmentStateSelect.element(by.css('option:checked')).getText();
    }

    async appointmentStateSelectLastOption() {
        await this.appointmentStateSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setMealPlanIdInput(mealPlanId) {
        await this.mealPlanIdInput.sendKeys(mealPlanId);
    }

    async getMealPlanIdInput() {
        return this.mealPlanIdInput.getAttribute('value');
    }

    async setGeneralAdviceInput(generalAdvice) {
        await this.generalAdviceInput.sendKeys(generalAdvice);
    }

    async getGeneralAdviceInput() {
        return this.generalAdviceInput.getAttribute('value');
    }

    async bodyMeasurmentSelectLastOption() {
        await this.bodyMeasurmentSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async bodyMeasurmentSelectOption(option) {
        await this.bodyMeasurmentSelect.sendKeys(option);
    }

    getBodyMeasurmentSelect(): ElementFinder {
        return this.bodyMeasurmentSelect;
    }

    async getBodyMeasurmentSelectedOption() {
        return this.bodyMeasurmentSelect.element(by.css('option:checked')).getText();
    }

    async patientCardSelectLastOption() {
        await this.patientCardSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async patientCardSelectOption(option) {
        await this.patientCardSelect.sendKeys(option);
    }

    getPatientCardSelect(): ElementFinder {
        return this.patientCardSelect;
    }

    async getPatientCardSelectedOption() {
        return this.patientCardSelect.element(by.css('option:checked')).getText();
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

export class AppointmentDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-appointment-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-appointment'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
