import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  LandingPageCardComponent,
  LandingPageCardDetailComponent,
  LandingPageCardUpdateComponent,
  LandingPageCardDeletePopupComponent,
  LandingPageCardDeleteDialogComponent,
  landingPageCardRoute,
  landingPageCardPopupRoute
} from './';

const ENTITY_STATES = [...landingPageCardRoute, ...landingPageCardPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LandingPageCardComponent,
    LandingPageCardDetailComponent,
    LandingPageCardUpdateComponent,
    LandingPageCardDeleteDialogComponent,
    LandingPageCardDeletePopupComponent
  ],
  entryComponents: [
    LandingPageCardComponent,
    LandingPageCardUpdateComponent,
    LandingPageCardDeleteDialogComponent,
    LandingPageCardDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayLandingPageCardModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
