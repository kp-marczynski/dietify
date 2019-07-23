import { element, by, ElementFinder } from 'protractor';

export class ProductComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-product div table .btn-danger'));
    title = element.all(by.css('jhi-product div h2#page-heading span')).first();

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

export class ProductUpdatePage {
    pageTitle = element(by.id('jhi-product-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    sourceInput = element(by.id('field_source'));
    descriptionInput = element(by.id('field_description'));
    languageSelect = element(by.id('field_language'));
    subcategorySelect = element(by.id('field_subcategory'));
    authorSelect = element(by.id('field_author'));
    suitableDietsSelect = element(by.id('field_suitableDiets'));
    unsuitableDietsSelect = element(by.id('field_unsuitableDiets'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setSourceInput(source) {
        await this.sourceInput.sendKeys(source);
    }

    async getSourceInput() {
        return this.sourceInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async languageSelectLastOption() {
        await this.languageSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async languageSelectOption(option) {
        await this.languageSelect.sendKeys(option);
    }

    getLanguageSelect(): ElementFinder {
        return this.languageSelect;
    }

    async getLanguageSelectedOption() {
        return this.languageSelect.element(by.css('option:checked')).getText();
    }

    async subcategorySelectLastOption() {
        await this.subcategorySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async subcategorySelectOption(option) {
        await this.subcategorySelect.sendKeys(option);
    }

    getSubcategorySelect(): ElementFinder {
        return this.subcategorySelect;
    }

    async getSubcategorySelectedOption() {
        return this.subcategorySelect.element(by.css('option:checked')).getText();
    }

    async authorSelectLastOption() {
        await this.authorSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async authorSelectOption(option) {
        await this.authorSelect.sendKeys(option);
    }

    getAuthorSelect(): ElementFinder {
        return this.authorSelect;
    }

    async getAuthorSelectedOption() {
        return this.authorSelect.element(by.css('option:checked')).getText();
    }

    async suitableDietsSelectLastOption() {
        await this.suitableDietsSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async suitableDietsSelectOption(option) {
        await this.suitableDietsSelect.sendKeys(option);
    }

    getSuitableDietsSelect(): ElementFinder {
        return this.suitableDietsSelect;
    }

    async getSuitableDietsSelectedOption() {
        return this.suitableDietsSelect.element(by.css('option:checked')).getText();
    }

    async unsuitableDietsSelectLastOption() {
        await this.unsuitableDietsSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async unsuitableDietsSelectOption(option) {
        await this.unsuitableDietsSelect.sendKeys(option);
    }

    getUnsuitableDietsSelect(): ElementFinder {
        return this.unsuitableDietsSelect;
    }

    async getUnsuitableDietsSelectedOption() {
        return this.unsuitableDietsSelect.element(by.css('option:checked')).getText();
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

export class ProductDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-product-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-product'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
