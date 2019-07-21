/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { BodyMeasurementComponentsPage, BodyMeasurementDeleteDialog, BodyMeasurementUpdatePage } from './body-measurement.page-object';

const expect = chai.expect;

describe('BodyMeasurement e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bodyMeasurementUpdatePage: BodyMeasurementUpdatePage;
  let bodyMeasurementComponentsPage: BodyMeasurementComponentsPage;
  /*let bodyMeasurementDeleteDialog: BodyMeasurementDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load BodyMeasurements', async () => {
    await navBarPage.goToEntity('body-measurement');
    bodyMeasurementComponentsPage = new BodyMeasurementComponentsPage();
    await browser.wait(ec.visibilityOf(bodyMeasurementComponentsPage.title), 5000);
    expect(await bodyMeasurementComponentsPage.getTitle()).to.eq('gatewayApp.appointmentsBodyMeasurement.home.title');
  });

  it('should load create BodyMeasurement page', async () => {
    await bodyMeasurementComponentsPage.clickOnCreateButton();
    bodyMeasurementUpdatePage = new BodyMeasurementUpdatePage();
    expect(await bodyMeasurementUpdatePage.getPageTitle()).to.eq('gatewayApp.appointmentsBodyMeasurement.home.createOrEditLabel');
    await bodyMeasurementUpdatePage.cancel();
  });

  /* it('should create and save BodyMeasurements', async () => {
        const nbButtonsBeforeCreate = await bodyMeasurementComponentsPage.countDeleteButtons();

        await bodyMeasurementComponentsPage.clickOnCreateButton();
        await promise.all([
            bodyMeasurementUpdatePage.setCompletionDateInput('2000-12-31'),
            bodyMeasurementUpdatePage.setHeightInput('5'),
            bodyMeasurementUpdatePage.setWeightInput('5'),
            bodyMeasurementUpdatePage.setWaistInput('5'),
            bodyMeasurementUpdatePage.setPercentOfFatTissueInput('5'),
            bodyMeasurementUpdatePage.setPercentOfWaterInput('5'),
            bodyMeasurementUpdatePage.setMuscleMassInput('5'),
            bodyMeasurementUpdatePage.setPhysicalMarkInput('5'),
            bodyMeasurementUpdatePage.setCalciumInBonesInput('5'),
            bodyMeasurementUpdatePage.setBasicMetabolismInput('5'),
            bodyMeasurementUpdatePage.setMetabolicAgeInput('5'),
            bodyMeasurementUpdatePage.setVisceralFatLevelInput('5'),
            bodyMeasurementUpdatePage.appointmentSelectLastOption(),
        ]);
        expect(await bodyMeasurementUpdatePage.getCompletionDateInput()).to.eq('2000-12-31', 'Expected completionDate value to be equals to 2000-12-31');
        expect(await bodyMeasurementUpdatePage.getHeightInput()).to.eq('5', 'Expected height value to be equals to 5');
        expect(await bodyMeasurementUpdatePage.getWeightInput()).to.eq('5', 'Expected weight value to be equals to 5');
        expect(await bodyMeasurementUpdatePage.getWaistInput()).to.eq('5', 'Expected waist value to be equals to 5');
        expect(await bodyMeasurementUpdatePage.getPercentOfFatTissueInput()).to.eq('5', 'Expected percentOfFatTissue value to be equals to 5');
        expect(await bodyMeasurementUpdatePage.getPercentOfWaterInput()).to.eq('5', 'Expected percentOfWater value to be equals to 5');
        expect(await bodyMeasurementUpdatePage.getMuscleMassInput()).to.eq('5', 'Expected muscleMass value to be equals to 5');
        expect(await bodyMeasurementUpdatePage.getPhysicalMarkInput()).to.eq('5', 'Expected physicalMark value to be equals to 5');
        expect(await bodyMeasurementUpdatePage.getCalciumInBonesInput()).to.eq('5', 'Expected calciumInBones value to be equals to 5');
        expect(await bodyMeasurementUpdatePage.getBasicMetabolismInput()).to.eq('5', 'Expected basicMetabolism value to be equals to 5');
        expect(await bodyMeasurementUpdatePage.getMetabolicAgeInput()).to.eq('5', 'Expected metabolicAge value to be equals to 5');
        expect(await bodyMeasurementUpdatePage.getVisceralFatLevelInput()).to.eq('5', 'Expected visceralFatLevel value to be equals to 5');
        await bodyMeasurementUpdatePage.save();
        expect(await bodyMeasurementUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await bodyMeasurementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last BodyMeasurement', async () => {
        const nbButtonsBeforeDelete = await bodyMeasurementComponentsPage.countDeleteButtons();
        await bodyMeasurementComponentsPage.clickOnLastDeleteButton();

        bodyMeasurementDeleteDialog = new BodyMeasurementDeleteDialog();
        expect(await bodyMeasurementDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.appointmentsBodyMeasurement.delete.question');
        await bodyMeasurementDeleteDialog.clickOnConfirmButton();

        expect(await bodyMeasurementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
