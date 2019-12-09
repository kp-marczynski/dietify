/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  NutritionalInterviewComponentsPage,
  NutritionalInterviewDeleteDialog,
  NutritionalInterviewUpdatePage
} from './nutritional-interview.page-object';

const expect = chai.expect;

describe('NutritionalInterview e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let nutritionalInterviewUpdatePage: NutritionalInterviewUpdatePage;
  let nutritionalInterviewComponentsPage: NutritionalInterviewComponentsPage;
  /*let nutritionalInterviewDeleteDialog: NutritionalInterviewDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NutritionalInterviews', async () => {
    await navBarPage.goToEntity('nutritional-interview');
    nutritionalInterviewComponentsPage = new NutritionalInterviewComponentsPage();
    await browser.wait(ec.visibilityOf(nutritionalInterviewComponentsPage.title), 5000);
    expect(await nutritionalInterviewComponentsPage.getTitle()).to.eq('gatewayApp.appointmentsNutritionalInterview.home.title');
  });

  it('should load create NutritionalInterview page', async () => {
    await nutritionalInterviewComponentsPage.clickOnCreateButton();
    nutritionalInterviewUpdatePage = new NutritionalInterviewUpdatePage();
    expect(await nutritionalInterviewUpdatePage.getPageTitle()).to.eq('gatewayApp.appointmentsNutritionalInterview.home.createOrEditLabel');
    await nutritionalInterviewUpdatePage.cancel();
  });

  /* it('should create and save NutritionalInterviews', async () => {
        const nbButtonsBeforeCreate = await nutritionalInterviewComponentsPage.countDeleteButtons();

        await nutritionalInterviewComponentsPage.clickOnCreateButton();
        await promise.all([
            nutritionalInterviewUpdatePage.setCompletionDateInput('2000-12-31'),
            nutritionalInterviewUpdatePage.setTargetWeightInput('5'),
            nutritionalInterviewUpdatePage.setAdvicePurposeInput('advicePurpose'),
            nutritionalInterviewUpdatePage.physicalActivitySelectLastOption(),
            nutritionalInterviewUpdatePage.setDiseasesInput('diseases'),
            nutritionalInterviewUpdatePage.setMedicinesInput('medicines'),
            nutritionalInterviewUpdatePage.jobTypeSelectLastOption(),
            nutritionalInterviewUpdatePage.setLikedProductsInput('likedProducts'),
            nutritionalInterviewUpdatePage.setDislikedProductsInput('dislikedProducts'),
            nutritionalInterviewUpdatePage.setFoodAllergiesInput('foodAllergies'),
            nutritionalInterviewUpdatePage.setFoodIntolerancesInput('foodIntolerances'),
        ]);
        expect(await nutritionalInterviewUpdatePage.getCompletionDateInput()).to.eq('2000-12-31', 'Expected completionDate value to be equals to 2000-12-31');
        expect(await nutritionalInterviewUpdatePage.getTargetWeightInput()).to.eq('5', 'Expected targetWeight value to be equals to 5');
        expect(await nutritionalInterviewUpdatePage.getAdvicePurposeInput()).to.eq('advicePurpose', 'Expected AdvicePurpose value to be equals to advicePurpose');
        expect(await nutritionalInterviewUpdatePage.getDiseasesInput()).to.eq('diseases', 'Expected Diseases value to be equals to diseases');
        expect(await nutritionalInterviewUpdatePage.getMedicinesInput()).to.eq('medicines', 'Expected Medicines value to be equals to medicines');
        expect(await nutritionalInterviewUpdatePage.getLikedProductsInput()).to.eq('likedProducts', 'Expected LikedProducts value to be equals to likedProducts');
        expect(await nutritionalInterviewUpdatePage.getDislikedProductsInput()).to.eq('dislikedProducts', 'Expected DislikedProducts value to be equals to dislikedProducts');
        expect(await nutritionalInterviewUpdatePage.getFoodAllergiesInput()).to.eq('foodAllergies', 'Expected FoodAllergies value to be equals to foodAllergies');
        expect(await nutritionalInterviewUpdatePage.getFoodIntolerancesInput()).to.eq('foodIntolerances', 'Expected FoodIntolerances value to be equals to foodIntolerances');
        await nutritionalInterviewUpdatePage.save();
        expect(await nutritionalInterviewUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await nutritionalInterviewComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last NutritionalInterview', async () => {
        const nbButtonsBeforeDelete = await nutritionalInterviewComponentsPage.countDeleteButtons();
        await nutritionalInterviewComponentsPage.clickOnLastDeleteButton();

        nutritionalInterviewDeleteDialog = new NutritionalInterviewDeleteDialog();
        expect(await nutritionalInterviewDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.appointmentsNutritionalInterview.delete.question');
        await nutritionalInterviewDeleteDialog.clickOnConfirmButton();

        expect(await nutritionalInterviewComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
