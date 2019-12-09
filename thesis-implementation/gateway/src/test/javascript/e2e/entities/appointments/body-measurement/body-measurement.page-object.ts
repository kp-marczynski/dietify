import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class BodyMeasurementComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-body-measurement div table .btn-danger'));
  title = element.all(by.css('jhi-body-measurement div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class BodyMeasurementUpdatePage {
  pageTitle = element(by.id('jhi-body-measurement-heading'));
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
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCompletionDateInput(completionDate) {
    await this.completionDateInput.sendKeys(completionDate);
  }

  async getCompletionDateInput() {
    return await this.completionDateInput.getAttribute('value');
  }

  async setHeightInput(height) {
    await this.heightInput.sendKeys(height);
  }

  async getHeightInput() {
    return await this.heightInput.getAttribute('value');
  }

  async setWeightInput(weight) {
    await this.weightInput.sendKeys(weight);
  }

  async getWeightInput() {
    return await this.weightInput.getAttribute('value');
  }

  async setWaistInput(waist) {
    await this.waistInput.sendKeys(waist);
  }

  async getWaistInput() {
    return await this.waistInput.getAttribute('value');
  }

  async setPercentOfFatTissueInput(percentOfFatTissue) {
    await this.percentOfFatTissueInput.sendKeys(percentOfFatTissue);
  }

  async getPercentOfFatTissueInput() {
    return await this.percentOfFatTissueInput.getAttribute('value');
  }

  async setPercentOfWaterInput(percentOfWater) {
    await this.percentOfWaterInput.sendKeys(percentOfWater);
  }

  async getPercentOfWaterInput() {
    return await this.percentOfWaterInput.getAttribute('value');
  }

  async setMuscleMassInput(muscleMass) {
    await this.muscleMassInput.sendKeys(muscleMass);
  }

  async getMuscleMassInput() {
    return await this.muscleMassInput.getAttribute('value');
  }

  async setPhysicalMarkInput(physicalMark) {
    await this.physicalMarkInput.sendKeys(physicalMark);
  }

  async getPhysicalMarkInput() {
    return await this.physicalMarkInput.getAttribute('value');
  }

  async setCalciumInBonesInput(calciumInBones) {
    await this.calciumInBonesInput.sendKeys(calciumInBones);
  }

  async getCalciumInBonesInput() {
    return await this.calciumInBonesInput.getAttribute('value');
  }

  async setBasicMetabolismInput(basicMetabolism) {
    await this.basicMetabolismInput.sendKeys(basicMetabolism);
  }

  async getBasicMetabolismInput() {
    return await this.basicMetabolismInput.getAttribute('value');
  }

  async setMetabolicAgeInput(metabolicAge) {
    await this.metabolicAgeInput.sendKeys(metabolicAge);
  }

  async getMetabolicAgeInput() {
    return await this.metabolicAgeInput.getAttribute('value');
  }

  async setVisceralFatLevelInput(visceralFatLevel) {
    await this.visceralFatLevelInput.sendKeys(visceralFatLevel);
  }

  async getVisceralFatLevelInput() {
    return await this.visceralFatLevelInput.getAttribute('value');
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class BodyMeasurementDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-bodyMeasurement-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-bodyMeasurement'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
