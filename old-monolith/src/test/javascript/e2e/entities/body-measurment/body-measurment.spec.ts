/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BodyMeasurmentComponentsPage, BodyMeasurmentDeleteDialog, BodyMeasurmentUpdatePage } from './body-measurment.page-object';

const expect = chai.expect;

describe('BodyMeasurment e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let bodyMeasurmentUpdatePage: BodyMeasurmentUpdatePage;
    let bodyMeasurmentComponentsPage: BodyMeasurmentComponentsPage;
    let bodyMeasurmentDeleteDialog: BodyMeasurmentDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load BodyMeasurments', async () => {
        await navBarPage.goToEntity('body-measurment');
        bodyMeasurmentComponentsPage = new BodyMeasurmentComponentsPage();
        await browser.wait(ec.visibilityOf(bodyMeasurmentComponentsPage.title), 5000);
        expect(await bodyMeasurmentComponentsPage.getTitle()).to.eq('Body Measurments');
    });

    it('should load create BodyMeasurment page', async () => {
        await bodyMeasurmentComponentsPage.clickOnCreateButton();
        bodyMeasurmentUpdatePage = new BodyMeasurmentUpdatePage();
        expect(await bodyMeasurmentUpdatePage.getPageTitle()).to.eq('Create or edit a Body Measurment');
        await bodyMeasurmentUpdatePage.cancel();
    });

    it('should create and save BodyMeasurments', async () => {
        const nbButtonsBeforeCreate = await bodyMeasurmentComponentsPage.countDeleteButtons();

        await bodyMeasurmentComponentsPage.clickOnCreateButton();
        await promise.all([
            bodyMeasurmentUpdatePage.setCompletionDateInput('2000-12-31'),
            bodyMeasurmentUpdatePage.setHeightInput('5'),
            bodyMeasurmentUpdatePage.setWeightInput('5'),
            bodyMeasurmentUpdatePage.setWaistInput('5'),
            bodyMeasurmentUpdatePage.setPercentOfFatTissueInput('5'),
            bodyMeasurmentUpdatePage.setPercentOfWaterInput('5'),
            bodyMeasurmentUpdatePage.setMuscleMassInput('5'),
            bodyMeasurmentUpdatePage.setPhysicalMarkInput('5'),
            bodyMeasurmentUpdatePage.setCalciumInBonesInput('5'),
            bodyMeasurmentUpdatePage.setBasicMetabolismInput('5'),
            bodyMeasurmentUpdatePage.setMetabolicAgeInput('5'),
            bodyMeasurmentUpdatePage.setVisceralFatLevelInput('5')
        ]);
        expect(await bodyMeasurmentUpdatePage.getCompletionDateInput()).to.eq('2000-12-31');
        expect(await bodyMeasurmentUpdatePage.getHeightInput()).to.eq('5');
        expect(await bodyMeasurmentUpdatePage.getWeightInput()).to.eq('5');
        expect(await bodyMeasurmentUpdatePage.getWaistInput()).to.eq('5');
        expect(await bodyMeasurmentUpdatePage.getPercentOfFatTissueInput()).to.eq('5');
        expect(await bodyMeasurmentUpdatePage.getPercentOfWaterInput()).to.eq('5');
        expect(await bodyMeasurmentUpdatePage.getMuscleMassInput()).to.eq('5');
        expect(await bodyMeasurmentUpdatePage.getPhysicalMarkInput()).to.eq('5');
        expect(await bodyMeasurmentUpdatePage.getCalciumInBonesInput()).to.eq('5');
        expect(await bodyMeasurmentUpdatePage.getBasicMetabolismInput()).to.eq('5');
        expect(await bodyMeasurmentUpdatePage.getMetabolicAgeInput()).to.eq('5');
        expect(await bodyMeasurmentUpdatePage.getVisceralFatLevelInput()).to.eq('5');
        await bodyMeasurmentUpdatePage.save();
        expect(await bodyMeasurmentUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await bodyMeasurmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last BodyMeasurment', async () => {
        const nbButtonsBeforeDelete = await bodyMeasurmentComponentsPage.countDeleteButtons();
        await bodyMeasurmentComponentsPage.clickOnLastDeleteButton();

        bodyMeasurmentDeleteDialog = new BodyMeasurmentDeleteDialog();
        expect(await bodyMeasurmentDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Body Measurment?');
        await bodyMeasurmentDeleteDialog.clickOnConfirmButton();

        expect(await bodyMeasurmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
