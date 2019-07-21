import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  HouseholdMeasureComponent,
  HouseholdMeasureDetailComponent,
  HouseholdMeasureUpdateComponent,
  HouseholdMeasureDeletePopupComponent,
  HouseholdMeasureDeleteDialogComponent,
  householdMeasureRoute,
  householdMeasurePopupRoute
} from './';

const ENTITY_STATES = [...householdMeasureRoute, ...householdMeasurePopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    HouseholdMeasureComponent,
    HouseholdMeasureDetailComponent,
    HouseholdMeasureUpdateComponent,
    HouseholdMeasureDeleteDialogComponent,
    HouseholdMeasureDeletePopupComponent
  ],
  entryComponents: [
    HouseholdMeasureComponent,
    HouseholdMeasureUpdateComponent,
    HouseholdMeasureDeleteDialogComponent,
    HouseholdMeasureDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsHouseholdMeasureModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
