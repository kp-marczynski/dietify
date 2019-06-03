import { element, by, ElementFinder } from 'protractor';

export class BodyMeasurmentComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-body-measurment div table .btn-danger'));
    title = element.all(by.css('jhi-body-measurment div h2#page-heading span')).first();

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

export class BodyMeasurmentUpdatePage {
    pageTitle = element(by.id('jhi-body-measurment-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    completionDateInput = element(by.id('field_completionDate'));
    heightInput = element(by.id('field_height'));
    weightInput = element(by.id('field_weight'));
    waistInput = element(by.id('field_waist'));
    percentOfFatTissueInput = element(by.id('field_percentOfFatTissue'));
    percentOfWaterInput = element(by.id('field_percentOfWater'));
    muscleMassInput = element(by.id('field_muscleMass'));
    physicalMarkInput = element(by.id('field_physicalMark'));
    calciumInBonesInput = element(by.id('field_calciumInBones'));
    basicMetabolismInput = element(by.id('field_basicMetabolism'));
    metabolicAgeInput = element(by.id('field_metabolicAge'));
    visceralFatLevelInput = element(by.id('field_visceralFatLevel'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setCompletionDateInput(completionDate) {
        await this.completionDateInput.sendKeys(completionDate);
    }

    async getCompletionDateInput() {
        return this.completionDateInput.getAttribute('value');
    }

    async setHeightInput(height) {
        await this.heightInput.sendKeys(height);
    }

    async getHeightInput() {
        return this.heightInput.getAttribute('value');
    }

    async setWeightInput(weight) {
        await this.weightInput.sendKeys(weight);
    }

    async getWeightInput() {
        return this.weightInput.getAttribute('value');
    }

    async setWaistInput(waist) {
        await this.waistInput.sendKeys(waist);
    }

    async getWaistInput() {
        return this.waistInput.getAttribute('value');
    }

    async setPercentOfFatTissueInput(percentOfFatTissue) {
        await this.percentOfFatTissueInput.sendKeys(percentOfFatTissue);
    }

    async getPercentOfFatTissueInput() {
        return this.percentOfFatTissueInput.getAttribute('value');
    }

    async setPercentOfWaterInput(percentOfWater) {
        await this.percentOfWaterInput.sendKeys(percentOfWater);
    }

    async getPercentOfWaterInput() {
        return this.percentOfWaterInput.getAttribute('value');
    }

    async setMuscleMassInput(muscleMass) {
        await this.muscleMassInput.sendKeys(muscleMass);
    }

    async getMuscleMassInput() {
        return this.muscleMassInput.getAttribute('value');
    }

    async setPhysicalMarkInput(physicalMark) {
        await this.physicalMarkInput.sendKeys(physicalMark);
    }

    async getPhysicalMarkInput() {
        return this.physicalMarkInput.getAttribute('value');
    }

    async setCalciumInBonesInput(calciumInBones) {
        await this.calciumInBonesInput.sendKeys(calciumInBones);
    }

    async getCalciumInBonesInput() {
        return this.calciumInBonesInput.getAttribute('value');
    }

    async setBasicMetabolismInput(basicMetabolism) {
        await this.basicMetabolismInput.sendKeys(basicMetabolism);
    }

    async getBasicMetabolismInput() {
        return this.basicMetabolismInput.getAttribute('value');
    }

    async setMetabolicAgeInput(metabolicAge) {
        await this.metabolicAgeInput.sendKeys(metabolicAge);
    }

    async getMetabolicAgeInput() {
        return this.metabolicAgeInput.getAttribute('value');
    }

    async setVisceralFatLevelInput(visceralFatLevel) {
        await this.visceralFatLevelInput.sendKeys(visceralFatLevel);
    }

    async getVisceralFatLevelInput() {
        return this.visceralFatLevelInput.getAttribute('value');
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

export class BodyMeasurmentDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-bodyMeasurment-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-bodyMeasurment'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
