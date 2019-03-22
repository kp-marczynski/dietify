import { element, by, ElementFinder } from 'protractor';

export class ProductSubcategoryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-product-subcategory div table .btn-danger'));
    title = element.all(by.css('jhi-product-subcategory div h2#page-heading span')).first();

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

export class ProductSubcategoryUpdatePage {
    pageTitle = element(by.id('jhi-product-subcategory-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    descriptionInput = element(by.id('field_description'));
    categorySelect = element(by.id('field_category'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async categorySelectLastOption() {
        await this.categorySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async categorySelectOption(option) {
        await this.categorySelect.sendKeys(option);
    }

    getCategorySelect(): ElementFinder {
        return this.categorySelect;
    }

    async getCategorySelectedOption() {
        return this.categorySelect.element(by.css('option:checked')).getText();
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

export class ProductSubcategoryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-productSubcategory-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-productSubcategory'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
