import { element, by, ElementFinder } from 'protractor';

export class HouseholdMeasureComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-household-measure div table .btn-danger'));
    title = element.all(by.css('jhi-household-measure div h2#page-heading span')).first();

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

export class HouseholdMeasureUpdatePage {
    pageTitle = element(by.id('jhi-household-measure-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    descriptionInput = element(by.id('field_description'));
    gramsWeightInput = element(by.id('field_gramsWeight'));
    isVisibleInput = element(by.id('field_isVisible'));
    productSelect = element(by.id('field_product'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setGramsWeightInput(gramsWeight) {
        await this.gramsWeightInput.sendKeys(gramsWeight);
    }

    async getGramsWeightInput() {
        return this.gramsWeightInput.getAttribute('value');
    }

    getIsVisibleInput() {
        return this.isVisibleInput;
    }

    async productSelectLastOption() {
        await this.productSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async productSelectOption(option) {
        await this.productSelect.sendKeys(option);
    }

    getProductSelect(): ElementFinder {
        return this.productSelect;
    }

    async getProductSelectedOption() {
        return this.productSelect.element(by.css('option:checked')).getText();
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

export class HouseholdMeasureDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-householdMeasure-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-householdMeasure'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
