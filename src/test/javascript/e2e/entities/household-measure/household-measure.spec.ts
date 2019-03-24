/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { HouseholdMeasureComponentsPage, HouseholdMeasureDeleteDialog, HouseholdMeasureUpdatePage } from './household-measure.page-object';

const expect = chai.expect;

describe('HouseholdMeasure e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let householdMeasureUpdatePage: HouseholdMeasureUpdatePage;
    let householdMeasureComponentsPage: HouseholdMeasureComponentsPage;
    /*let householdMeasureDeleteDialog: HouseholdMeasureDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load HouseholdMeasures', async () => {
        await navBarPage.goToEntity('household-measure');
        householdMeasureComponentsPage = new HouseholdMeasureComponentsPage();
        await browser.wait(ec.visibilityOf(householdMeasureComponentsPage.title), 5000);
        expect(await householdMeasureComponentsPage.getTitle()).to.eq('Household Measures');
    });

    it('should load create HouseholdMeasure page', async () => {
        await householdMeasureComponentsPage.clickOnCreateButton();
        householdMeasureUpdatePage = new HouseholdMeasureUpdatePage();
        expect(await householdMeasureUpdatePage.getPageTitle()).to.eq('Create or edit a Household Measure');
        await householdMeasureUpdatePage.cancel();
    });

    /* it('should create and save HouseholdMeasures', async () => {
        const nbButtonsBeforeCreate = await householdMeasureComponentsPage.countDeleteButtons();

        await householdMeasureComponentsPage.clickOnCreateButton();
        await promise.all([
            householdMeasureUpdatePage.setDescriptionInput('description'),
            householdMeasureUpdatePage.setGramsWeightInput('5'),
            householdMeasureUpdatePage.productSelectLastOption(),
        ]);
        expect(await householdMeasureUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await householdMeasureUpdatePage.getGramsWeightInput()).to.eq('5');
        const selectedIsVisible = householdMeasureUpdatePage.getIsVisibleInput();
        if (await selectedIsVisible.isSelected()) {
            await householdMeasureUpdatePage.getIsVisibleInput().click();
            expect(await householdMeasureUpdatePage.getIsVisibleInput().isSelected()).to.be.false;
        } else {
            await householdMeasureUpdatePage.getIsVisibleInput().click();
            expect(await householdMeasureUpdatePage.getIsVisibleInput().isSelected()).to.be.true;
        }
        await householdMeasureUpdatePage.save();
        expect(await householdMeasureUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await householdMeasureComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last HouseholdMeasure', async () => {
        const nbButtonsBeforeDelete = await householdMeasureComponentsPage.countDeleteButtons();
        await householdMeasureComponentsPage.clickOnLastDeleteButton();

        householdMeasureDeleteDialog = new HouseholdMeasureDeleteDialog();
        expect(await householdMeasureDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Household Measure?');
        await householdMeasureDeleteDialog.clickOnConfirmButton();

        expect(await householdMeasureComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
