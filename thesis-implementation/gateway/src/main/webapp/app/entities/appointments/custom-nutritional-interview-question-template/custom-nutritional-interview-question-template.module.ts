import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  CustomNutritionalInterviewQuestionTemplateComponent,
  CustomNutritionalInterviewQuestionTemplateDetailComponent,
  CustomNutritionalInterviewQuestionTemplateUpdateComponent,
  CustomNutritionalInterviewQuestionTemplateDeletePopupComponent,
  CustomNutritionalInterviewQuestionTemplateDeleteDialogComponent,
  customNutritionalInterviewQuestionTemplateRoute,
  customNutritionalInterviewQuestionTemplatePopupRoute
} from './';

const ENTITY_STATES = [...customNutritionalInterviewQuestionTemplateRoute, ...customNutritionalInterviewQuestionTemplatePopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CustomNutritionalInterviewQuestionTemplateComponent,
    CustomNutritionalInterviewQuestionTemplateDetailComponent,
    CustomNutritionalInterviewQuestionTemplateUpdateComponent,
    CustomNutritionalInterviewQuestionTemplateDeleteDialogComponent,
    CustomNutritionalInterviewQuestionTemplateDeletePopupComponent
  ],
  entryComponents: [
    CustomNutritionalInterviewQuestionTemplateComponent,
    CustomNutritionalInterviewQuestionTemplateUpdateComponent,
    CustomNutritionalInterviewQuestionTemplateDeleteDialogComponent,
    CustomNutritionalInterviewQuestionTemplateDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppointmentsCustomNutritionalInterviewQuestionTemplateModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
