import { element, by, ElementFinder } from 'protractor';

export class KitchenApplianceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-kitchen-appliance div table .btn-danger'));
    title = element.all(by.css('jhi-kitchen-appliance div h2#page-heading span')).first();

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

export class KitchenApplianceUpdatePage {
    pageTitle = element(by.id('jhi-kitchen-appliance-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    namePolishInput = element(by.id('field_namePolish'));
    nameEnglishInput = element(by.id('field_nameEnglish'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNamePolishInput(namePolish) {
        await this.namePolishInput.sendKeys(namePolish);
    }

    async getNamePolishInput() {
        return this.namePolishInput.getAttribute('value');
    }

    async setNameEnglishInput(nameEnglish) {
        await this.nameEnglishInput.sendKeys(nameEnglish);
    }

    async getNameEnglishInput() {
        return this.nameEnglishInput.getAttribute('value');
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

export class KitchenApplianceDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-kitchenAppliance-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-kitchenAppliance'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
