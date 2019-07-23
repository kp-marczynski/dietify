import { element, by, ElementFinder } from 'protractor';

export class LanguageComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-language div table .btn-danger'));
    title = element.all(by.css('jhi-language div h2#page-heading span')).first();

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

export class LanguageUpdatePage {
    pageTitle = element(by.id('jhi-language-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    englishNameInput = element(by.id('field_englishName'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setEnglishNameInput(englishName) {
        await this.englishNameInput.sendKeys(englishName);
    }

    async getEnglishNameInput() {
        return this.englishNameInput.getAttribute('value');
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

export class LanguageDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-language-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-language'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
