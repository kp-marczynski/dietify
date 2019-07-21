import { element, by, ElementFinder } from 'protractor';

export class MealComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-meal div table .btn-danger'));
    title = element.all(by.css('jhi-meal div h2#page-heading span')).first();

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

export class MealUpdatePage {
    pageTitle = element(by.id('jhi-meal-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    ordinalNumberInput = element(by.id('field_ordinalNumber'));
    daySelect = element(by.id('field_day'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setOrdinalNumberInput(ordinalNumber) {
        await this.ordinalNumberInput.sendKeys(ordinalNumber);
    }

    async getOrdinalNumberInput() {
        return this.ordinalNumberInput.getAttribute('value');
    }

    async daySelectLastOption() {
        await this.daySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async daySelectOption(option) {
        await this.daySelect.sendKeys(option);
    }

    getDaySelect(): ElementFinder {
        return this.daySelect;
    }

    async getDaySelectedOption() {
        return this.daySelect.element(by.css('option:checked')).getText();
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

export class MealDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-meal-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-meal'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
