import { element, by, ElementFinder } from 'protractor';

export class RecipeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-recipe div table .btn-danger'));
    title = element.all(by.css('jhi-recipe div h2#page-heading span')).first();

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

export class RecipeUpdatePage {
    pageTitle = element(by.id('jhi-recipe-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    preparationTimeMinutesInput = element(by.id('field_preparationTimeMinutes'));
    numberOfPortionsInput = element(by.id('field_numberOfPortions'));
    imageInput = element(by.id('file_image'));
    authorIdInput = element(by.id('field_authorId'));
    creationDateInput = element(by.id('field_creationDate'));
    lastEditDateInput = element(by.id('field_lastEditDate'));
    isVisibleInput = element(by.id('field_isVisible'));
    isLockedInput = element(by.id('field_isLocked'));
    languageIdInput = element(by.id('field_languageId'));
    sourceRecipeSelect = element(by.id('field_sourceRecipe'));
    kitchenAppliancesSelect = element(by.id('field_kitchenAppliances'));
    dishTypeSelect = element(by.id('field_dishType'));
    mealTypeSelect = element(by.id('field_mealType'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setPreparationTimeMinutesInput(preparationTimeMinutes) {
        await this.preparationTimeMinutesInput.sendKeys(preparationTimeMinutes);
    }

    async getPreparationTimeMinutesInput() {
        return this.preparationTimeMinutesInput.getAttribute('value');
    }

    async setNumberOfPortionsInput(numberOfPortions) {
        await this.numberOfPortionsInput.sendKeys(numberOfPortions);
    }

    async getNumberOfPortionsInput() {
        return this.numberOfPortionsInput.getAttribute('value');
    }

    async setImageInput(image) {
        await this.imageInput.sendKeys(image);
    }

    async getImageInput() {
        return this.imageInput.getAttribute('value');
    }

    async setAuthorIdInput(authorId) {
        await this.authorIdInput.sendKeys(authorId);
    }

    async getAuthorIdInput() {
        return this.authorIdInput.getAttribute('value');
    }

    async setCreationDateInput(creationDate) {
        await this.creationDateInput.sendKeys(creationDate);
    }

    async getCreationDateInput() {
        return this.creationDateInput.getAttribute('value');
    }

    async setLastEditDateInput(lastEditDate) {
        await this.lastEditDateInput.sendKeys(lastEditDate);
    }

    async getLastEditDateInput() {
        return this.lastEditDateInput.getAttribute('value');
    }

    getIsVisibleInput() {
        return this.isVisibleInput;
    }
    getIsLockedInput() {
        return this.isLockedInput;
    }
    async setLanguageIdInput(languageId) {
        await this.languageIdInput.sendKeys(languageId);
    }

    async getLanguageIdInput() {
        return this.languageIdInput.getAttribute('value');
    }

    async sourceRecipeSelectLastOption() {
        await this.sourceRecipeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async sourceRecipeSelectOption(option) {
        await this.sourceRecipeSelect.sendKeys(option);
    }

    getSourceRecipeSelect(): ElementFinder {
        return this.sourceRecipeSelect;
    }

    async getSourceRecipeSelectedOption() {
        return this.sourceRecipeSelect.element(by.css('option:checked')).getText();
    }

    async kitchenAppliancesSelectLastOption() {
        await this.kitchenAppliancesSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async kitchenAppliancesSelectOption(option) {
        await this.kitchenAppliancesSelect.sendKeys(option);
    }

    getKitchenAppliancesSelect(): ElementFinder {
        return this.kitchenAppliancesSelect;
    }

    async getKitchenAppliancesSelectedOption() {
        return this.kitchenAppliancesSelect.element(by.css('option:checked')).getText();
    }

    async dishTypeSelectLastOption() {
        await this.dishTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async dishTypeSelectOption(option) {
        await this.dishTypeSelect.sendKeys(option);
    }

    getDishTypeSelect(): ElementFinder {
        return this.dishTypeSelect;
    }

    async getDishTypeSelectedOption() {
        return this.dishTypeSelect.element(by.css('option:checked')).getText();
    }

    async mealTypeSelectLastOption() {
        await this.mealTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async mealTypeSelectOption(option) {
        await this.mealTypeSelect.sendKeys(option);
    }

    getMealTypeSelect(): ElementFinder {
        return this.mealTypeSelect;
    }

    async getMealTypeSelectedOption() {
        return this.mealTypeSelect.element(by.css('option:checked')).getText();
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

export class RecipeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-recipe-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-recipe'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
