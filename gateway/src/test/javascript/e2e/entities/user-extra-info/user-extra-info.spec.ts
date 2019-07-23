/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UserExtraInfoComponentsPage, UserExtraInfoDeleteDialog, UserExtraInfoUpdatePage } from './user-extra-info.page-object';

const expect = chai.expect;

describe('UserExtraInfo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userExtraInfoUpdatePage: UserExtraInfoUpdatePage;
  let userExtraInfoComponentsPage: UserExtraInfoComponentsPage;
  /*let userExtraInfoDeleteDialog: UserExtraInfoDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load UserExtraInfos', async () => {
    await navBarPage.goToEntity('user-extra-info');
    userExtraInfoComponentsPage = new UserExtraInfoComponentsPage();
    await browser.wait(ec.visibilityOf(userExtraInfoComponentsPage.title), 5000);
    expect(await userExtraInfoComponentsPage.getTitle()).to.eq('gatewayApp.userExtraInfo.home.title');
  });

  it('should load create UserExtraInfo page', async () => {
    await userExtraInfoComponentsPage.clickOnCreateButton();
    userExtraInfoUpdatePage = new UserExtraInfoUpdatePage();
    expect(await userExtraInfoUpdatePage.getPageTitle()).to.eq('gatewayApp.userExtraInfo.home.createOrEditLabel');
    await userExtraInfoUpdatePage.cancel();
  });

  /* it('should create and save UserExtraInfos', async () => {
        const nbButtonsBeforeCreate = await userExtraInfoComponentsPage.countDeleteButtons();

        await userExtraInfoComponentsPage.clickOnCreateButton();
        await promise.all([
            userExtraInfoUpdatePage.genderSelectLastOption(),
            userExtraInfoUpdatePage.setDateOfBirthInput('2000-12-31'),
            userExtraInfoUpdatePage.setPhoneNumberInput('phoneNumber'),
            userExtraInfoUpdatePage.setStreetAddressInput('streetAddress'),
            userExtraInfoUpdatePage.setPostalCodeInput('postalCode'),
            userExtraInfoUpdatePage.setCityInput('city'),
            userExtraInfoUpdatePage.setCountryInput('country'),
            userExtraInfoUpdatePage.setPersonalDescriptionInput('personalDescription'),
            userExtraInfoUpdatePage.userSelectLastOption(),
        ]);
        expect(await userExtraInfoUpdatePage.getDateOfBirthInput()).to.eq('2000-12-31', 'Expected dateOfBirth value to be equals to 2000-12-31');
        expect(await userExtraInfoUpdatePage.getPhoneNumberInput()).to.eq('phoneNumber', 'Expected PhoneNumber value to be equals to phoneNumber');
        expect(await userExtraInfoUpdatePage.getStreetAddressInput()).to.eq('streetAddress', 'Expected StreetAddress value to be equals to streetAddress');
        expect(await userExtraInfoUpdatePage.getPostalCodeInput()).to.eq('postalCode', 'Expected PostalCode value to be equals to postalCode');
        expect(await userExtraInfoUpdatePage.getCityInput()).to.eq('city', 'Expected City value to be equals to city');
        expect(await userExtraInfoUpdatePage.getCountryInput()).to.eq('country', 'Expected Country value to be equals to country');
        expect(await userExtraInfoUpdatePage.getPersonalDescriptionInput()).to.eq('personalDescription', 'Expected PersonalDescription value to be equals to personalDescription');
        await userExtraInfoUpdatePage.save();
        expect(await userExtraInfoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await userExtraInfoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last UserExtraInfo', async () => {
        const nbButtonsBeforeDelete = await userExtraInfoComponentsPage.countDeleteButtons();
        await userExtraInfoComponentsPage.clickOnLastDeleteButton();

        userExtraInfoDeleteDialog = new UserExtraInfoDeleteDialog();
        expect(await userExtraInfoDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.userExtraInfo.delete.question');
        await userExtraInfoDeleteDialog.clickOnConfirmButton();

        expect(await userExtraInfoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
