import { element, by, ElementFinder } from 'protractor';

export class PreparationStepComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-preparation-step div table .btn-danger'));
    title = element.all(by.css('jhi-preparation-step div h2#page-heading span')).first();

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

export class PreparationStepUpdatePage {
    pageTitle = element(by.id('jhi-preparation-step-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    ordinalNumberInput = element(by.id('field_ordinalNumber'));
    stepDescriptionInput = element(by.id('field_stepDescription'));
    recipeSectionSelect = element(by.id('field_recipeSection'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setOrdinalNumberInput(ordinalNumber) {
        await this.ordinalNumberInput.sendKeys(ordinalNumber);
    }

    async getOrdinalNumberInput() {
        return this.ordinalNumberInput.getAttribute('value');
    }

    async setStepDescriptionInput(stepDescription) {
        await this.stepDescriptionInput.sendKeys(stepDescription);
    }

    async getStepDescriptionInput() {
        return this.stepDescriptionInput.getAttribute('value');
    }

    async recipeSectionSelectLastOption() {
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
        return this.recipeSectionSelect.element(by.css('option:checked')).getText();
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

export class PreparationStepDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-preparationStep-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-preparationStep'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
