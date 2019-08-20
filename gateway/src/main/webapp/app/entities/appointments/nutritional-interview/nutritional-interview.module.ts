import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core';

import {GatewaySharedModule} from 'app/shared';
import {
  NutritionalInterviewComponent,
  NutritionalInterviewDetailComponent,
  NutritionalInterviewUpdateComponent,
  NutritionalInterviewDeletePopupComponent,
  NutritionalInterviewDeleteDialogComponent,
  nutritionalInterviewRoute,
  nutritionalInterviewPopupRoute
} from './';

@NgModule({
  imports: [GatewaySharedModule, RouterModule],
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
  providers: [{provide: JhiLanguageService, useClass: JhiLanguageService}],
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
