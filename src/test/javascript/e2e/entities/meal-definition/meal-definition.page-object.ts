import { element, by, ElementFinder } from 'protractor';

export class MealDefinitionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-meal-definition div table .btn-danger'));
    title = element.all(by.css('jhi-meal-definition div h2#page-heading span')).first();

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

export class MealDefinitionUpdatePage {
    pageTitle = element(by.id('jhi-meal-definition-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    ordinalNumberInput = element(by.id('field_ordinalNumber'));
    mealTypeIdInput = element(by.id('field_mealTypeId'));
    timeOfMealInput = element(by.id('field_timeOfMeal'));
    percentOfEnergyInput = element(by.id('field_percentOfEnergy'));
    mealPlanSelect = element(by.id('field_mealPlan'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setOrdinalNumberInput(ordinalNumber) {
        await this.ordinalNumberInput.sendKeys(ordinalNumber);
    }

    async getOrdinalNumberInput() {
        return this.ordinalNumberInput.getAttribute('value');
    }

    async setMealTypeIdInput(mealTypeId) {
        await this.mealTypeIdInput.sendKeys(mealTypeId);
    }

    async getMealTypeIdInput() {
        return this.mealTypeIdInput.getAttribute('value');
    }

    async setTimeOfMealInput(timeOfMeal) {
        await this.timeOfMealInput.sendKeys(timeOfMeal);
    }

    async getTimeOfMealInput() {
        return this.timeOfMealInput.getAttribute('value');
    }

    async setPercentOfEnergyInput(percentOfEnergy) {
        await this.percentOfEnergyInput.sendKeys(percentOfEnergy);
    }

    async getPercentOfEnergyInput() {
        return this.percentOfEnergyInput.getAttribute('value');
    }

    async mealPlanSelectLastOption() {
        await this.mealPlanSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async mealPlanSelectOption(option) {
        await this.mealPlanSelect.sendKeys(option);
    }

    getMealPlanSelect(): ElementFinder {
        return this.mealPlanSelect;
    }

    async getMealPlanSelectedOption() {
        return this.mealPlanSelect.element(by.css('option:checked')).getText();
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

export class MealDefinitionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-mealDefinition-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-mealDefinition'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
