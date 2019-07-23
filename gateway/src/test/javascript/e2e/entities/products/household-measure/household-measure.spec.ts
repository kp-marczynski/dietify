/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

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
    expect(await householdMeasureComponentsPage.getTitle()).to.eq('gatewayApp.productsHouseholdMeasure.home.title');
  });

  it('should load create HouseholdMeasure page', async () => {
    await householdMeasureComponentsPage.clickOnCreateButton();
    householdMeasureUpdatePage = new HouseholdMeasureUpdatePage();
    expect(await householdMeasureUpdatePage.getPageTitle()).to.eq('gatewayApp.productsHouseholdMeasure.home.createOrEditLabel');
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
        expect(await householdMeasureUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
        expect(await householdMeasureUpdatePage.getGramsWeightInput()).to.eq('5', 'Expected gramsWeight value to be equals to 5');
        const selectedIsVisible = householdMeasureUpdatePage.getIsVisibleInput();
        if (await selectedIsVisible.isSelected()) {
            await householdMeasureUpdatePage.getIsVisibleInput().click();
            expect(await householdMeasureUpdatePage.getIsVisibleInput().isSelected(), 'Expected isVisible not to be selected').to.be.false;
        } else {
            await householdMeasureUpdatePage.getIsVisibleInput().click();
            expect(await householdMeasureUpdatePage.getIsVisibleInput().isSelected(), 'Expected isVisible to be selected').to.be.true;
        }
        await householdMeasureUpdatePage.save();
        expect(await householdMeasureUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await householdMeasureComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last HouseholdMeasure', async () => {
        const nbButtonsBeforeDelete = await householdMeasureComponentsPage.countDeleteButtons();
        await householdMeasureComponentsPage.clickOnLastDeleteButton();

        householdMeasureDeleteDialog = new HouseholdMeasureDeleteDialog();
        expect(await householdMeasureDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.productsHouseholdMeasure.delete.question');
        await householdMeasureDeleteDialog.clickOnConfirmButton();

        expect(await householdMeasureComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
