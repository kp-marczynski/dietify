import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  UserExtraInfoComponent,
  UserExtraInfoDetailComponent,
  UserExtraInfoUpdateComponent,
  UserExtraInfoDeletePopupComponent,
  UserExtraInfoDeleteDialogComponent,
  userExtraInfoRoute,
  userExtraInfoPopupRoute
} from './';

const ENTITY_STATES = [...userExtraInfoRoute, ...userExtraInfoPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    UserExtraInfoComponent,
    UserExtraInfoDetailComponent,
    UserExtraInfoUpdateComponent,
    UserExtraInfoDeleteDialogComponent,
    UserExtraInfoDeletePopupComponent
  ],
  entryComponents: [
    UserExtraInfoComponent,
    UserExtraInfoUpdateComponent,
    UserExtraInfoDeleteDialogComponent,
    UserExtraInfoDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayUserExtraInfoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
