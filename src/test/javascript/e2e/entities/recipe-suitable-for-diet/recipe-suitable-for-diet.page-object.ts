import { element, by, ElementFinder } from 'protractor';

export class RecipeSuitableForDietComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-recipe-suitable-for-diet div table .btn-danger'));
    title = element.all(by.css('jhi-recipe-suitable-for-diet div h2#page-heading span')).first();

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

export class RecipeSuitableForDietUpdatePage {
    pageTitle = element(by.id('jhi-recipe-suitable-for-diet-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dietTypeIdInput = element(by.id('field_dietTypeId'));
    recipeSelect = element(by.id('field_recipe'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setDietTypeIdInput(dietTypeId) {
        await this.dietTypeIdInput.sendKeys(dietTypeId);
    }

    async getDietTypeIdInput() {
        return this.dietTypeIdInput.getAttribute('value');
    }

    async recipeSelectLastOption() {
        await this.recipeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async recipeSelectOption(option) {
        await this.recipeSelect.sendKeys(option);
    }

    getRecipeSelect(): ElementFinder {
        return this.recipeSelect;
    }

    async getRecipeSelectedOption() {
        return this.recipeSelect.element(by.css('option:checked')).getText();
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

export class RecipeSuitableForDietDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-recipeSuitableForDiet-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-recipeSuitableForDiet'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
