import { element, by, ElementFinder } from 'protractor';

export class MealPlanSuitableForDietComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-meal-plan-suitable-for-diet div table .btn-danger'));
    title = element.all(by.css('jhi-meal-plan-suitable-for-diet div h2#page-heading span')).first();

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

export class MealPlanSuitableForDietUpdatePage {
    pageTitle = element(by.id('jhi-meal-plan-suitable-for-diet-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dietTypeIdInput = element(by.id('field_dietTypeId'));
    mealPlanSelect = element(by.id('field_mealPlan'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setDietTypeIdInput(dietTypeId) {
        await this.dietTypeIdInput.sendKeys(dietTypeId);
    }

    async getDietTypeIdInput() {
        return this.dietTypeIdInput.getAttribute('value');
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

export class MealPlanSuitableForDietDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-mealPlanSuitableForDiet-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-mealPlanSuitableForDiet'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
