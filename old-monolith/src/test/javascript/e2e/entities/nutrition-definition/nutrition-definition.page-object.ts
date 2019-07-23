import { element, by, ElementFinder } from 'protractor';

export class NutritionDefinitionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-nutrition-definition div table .btn-danger'));
    title = element.all(by.css('jhi-nutrition-definition div h2#page-heading span')).first();

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

export class NutritionDefinitionUpdatePage {
    pageTitle = element(by.id('jhi-nutrition-definition-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    tagnameInput = element(by.id('field_tagname'));
    descriptionPolishInput = element(by.id('field_descriptionPolish'));
    descriptionEnglishInput = element(by.id('field_descriptionEnglish'));
    unitsInput = element(by.id('field_units'));
    decimalPlacesInput = element(by.id('field_decimalPlaces'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setTagnameInput(tagname) {
        await this.tagnameInput.sendKeys(tagname);
    }

    async getTagnameInput() {
        return this.tagnameInput.getAttribute('value');
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

    async setUnitsInput(units) {
        await this.unitsInput.sendKeys(units);
    }

    async getUnitsInput() {
        return this.unitsInput.getAttribute('value');
    }

    async setDecimalPlacesInput(decimalPlaces) {
        await this.decimalPlacesInput.sendKeys(decimalPlaces);
    }

    async getDecimalPlacesInput() {
        return this.decimalPlacesInput.getAttribute('value');
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

export class NutritionDefinitionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-nutritionDefinition-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-nutritionDefinition'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
