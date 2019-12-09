import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  CustomNutritionalInterviewQuestionComponent,
  CustomNutritionalInterviewQuestionDetailComponent,
  CustomNutritionalInterviewQuestionUpdateComponent,
  CustomNutritionalInterviewQuestionDeletePopupComponent,
  CustomNutritionalInterviewQuestionDeleteDialogComponent,
  customNutritionalInterviewQuestionRoute,
  customNutritionalInterviewQuestionPopupRoute
} from './';

const ENTITY_STATES = [...customNutritionalInterviewQuestionRoute, ...customNutritionalInterviewQuestionPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CustomNutritionalInterviewQuestionComponent,
    CustomNutritionalInterviewQuestionDetailComponent,
    CustomNutritionalInterviewQuestionUpdateComponent,
    CustomNutritionalInterviewQuestionDeleteDialogComponent,
    CustomNutritionalInterviewQuestionDeletePopupComponent
  ],
  entryComponents: [
    CustomNutritionalInterviewQuestionComponent,
    CustomNutritionalInterviewQuestionUpdateComponent,
    CustomNutritionalInterviewQuestionDeleteDialogComponent,
    CustomNutritionalInterviewQuestionDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppointmentsCustomNutritionalInterviewQuestionModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
