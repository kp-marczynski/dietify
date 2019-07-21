import { element, by, ElementFinder } from 'protractor';

export class MealPlanComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-meal-plan div table .btn-danger'));
    title = element.all(by.css('jhi-meal-plan div h2#page-heading span')).first();

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

export class MealPlanUpdatePage {
    pageTitle = element(by.id('jhi-meal-plan-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    authorIdInput = element(by.id('field_authorId'));
    creationDateInput = element(by.id('field_creationDate'));
    nameInput = element(by.id('field_name'));
    isVisibleInput = element(by.id('field_isVisible'));
    isLockedInput = element(by.id('field_isLocked'));
    languageIdInput = element(by.id('field_languageId'));
    numberOfDaysInput = element(by.id('field_numberOfDays'));
    numberOfMealsPerDayInput = element(by.id('field_numberOfMealsPerDay'));
    totalDailyEnergyKcalInput = element(by.id('field_totalDailyEnergyKcal'));
    percentOfProteinInput = element(by.id('field_percentOfProtein'));
    percentOfFatInput = element(by.id('field_percentOfFat'));
    percentOfCarbohydratesInput = element(by.id('field_percentOfCarbohydrates'));

    async getPageTitle() {
        return this.pageTitle.getText();
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

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
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

    async setNumberOfDaysInput(numberOfDays) {
        await this.numberOfDaysInput.sendKeys(numberOfDays);
    }

    async getNumberOfDaysInput() {
        return this.numberOfDaysInput.getAttribute('value');
    }

    async setNumberOfMealsPerDayInput(numberOfMealsPerDay) {
        await this.numberOfMealsPerDayInput.sendKeys(numberOfMealsPerDay);
    }

    async getNumberOfMealsPerDayInput() {
        return this.numberOfMealsPerDayInput.getAttribute('value');
    }

    async setTotalDailyEnergyKcalInput(totalDailyEnergyKcal) {
        await this.totalDailyEnergyKcalInput.sendKeys(totalDailyEnergyKcal);
    }

    async getTotalDailyEnergyKcalInput() {
        return this.totalDailyEnergyKcalInput.getAttribute('value');
    }

    async setPercentOfProteinInput(percentOfProtein) {
        await this.percentOfProteinInput.sendKeys(percentOfProtein);
    }

    async getPercentOfProteinInput() {
        return this.percentOfProteinInput.getAttribute('value');
    }

    async setPercentOfFatInput(percentOfFat) {
        await this.percentOfFatInput.sendKeys(percentOfFat);
    }

    async getPercentOfFatInput() {
        return this.percentOfFatInput.getAttribute('value');
    }

    async setPercentOfCarbohydratesInput(percentOfCarbohydrates) {
        await this.percentOfCarbohydratesInput.sendKeys(percentOfCarbohydrates);
    }

    async getPercentOfCarbohydratesInput() {
        return this.percentOfCarbohydratesInput.getAttribute('value');
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

export class MealPlanDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-mealPlan-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-mealPlan'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
