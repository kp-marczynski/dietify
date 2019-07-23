import { element, by, ElementFinder } from 'protractor';

export class ProductCategoryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-product-category div table .btn-danger'));
    title = element.all(by.css('jhi-product-category div h2#page-heading span')).first();

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

export class ProductCategoryUpdatePage {
    pageTitle = element(by.id('jhi-product-category-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    descriptionPolishInput = element(by.id('field_descriptionPolish'));
    descriptionEnglishInput = element(by.id('field_descriptionEnglish'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setDescriptionPolishInput(descriptionPolish) {
        await this.descriptionPolishInput.sendKeys(descriptionPolish);
    }

    async getDescriptionPolishInput() {
        return this.descriptionPolishInput.getAttribute('value');
    }

    async setDescriptionEnglishInput(descriptionEnglish) {
        await this.descriptionEnglishInput.sendKeys(descriptionEnglish);
    }

    async getDescriptionEnglishInput() {
        return this.descriptionEnglishInput.getAttribute('value');
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

export class ProductCategoryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-productCategory-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-productCategory'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
