import { element, by, ElementFinder } from 'protractor';

export class DieteticianComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-dietetician div table .btn-danger'));
    title = element.all(by.css('jhi-dietetician div h2#page-heading span')).first();

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

export class DieteticianUpdatePage {
    pageTitle = element(by.id('jhi-dietetician-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    userIdInput = element(by.id('field_userId'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setUserIdInput(userId) {
        await this.userIdInput.sendKeys(userId);
    }

    async getUserIdInput() {
        return this.userIdInput.getAttribute('value');
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

export class DieteticianDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-dietetician-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-dietetician'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
