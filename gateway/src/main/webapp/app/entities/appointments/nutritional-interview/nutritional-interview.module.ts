import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  NutritionalInterviewComponent,
  NutritionalInterviewDetailComponent,
  NutritionalInterviewUpdateComponent,
  NutritionalInterviewDeletePopupComponent,
  NutritionalInterviewDeleteDialogComponent,
  nutritionalInterviewRoute,
  nutritionalInterviewPopupRoute
} from './';

const ENTITY_STATES = [...nutritionalInterviewRoute, ...nutritionalInterviewPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    NutritionalInterviewComponent,
    NutritionalInterviewDetailComponent,
    NutritionalInterviewUpdateComponent,
    NutritionalInterviewDeleteDialogComponent,
    NutritionalInterviewDeletePopupComponent
  ],
  entryComponents: [
    NutritionalInterviewComponent,
    NutritionalInterviewUpdateComponent,
    NutritionalInterviewDeleteDialogComponent,
    NutritionalInterviewDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppointmentsNutritionalInterviewModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
