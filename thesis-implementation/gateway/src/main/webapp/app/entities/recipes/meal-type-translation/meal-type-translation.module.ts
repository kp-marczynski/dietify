import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  MealTypeTranslationComponent,
  MealTypeTranslationDetailComponent,
  MealTypeTranslationUpdateComponent,
  MealTypeTranslationDeletePopupComponent,
  MealTypeTranslationDeleteDialogComponent,
  mealTypeTranslationRoute,
  mealTypeTranslationPopupRoute
} from './';

const ENTITY_STATES = [...mealTypeTranslationRoute, ...mealTypeTranslationPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MealTypeTranslationComponent,
    MealTypeTranslationDetailComponent,
    MealTypeTranslationUpdateComponent,
    MealTypeTranslationDeleteDialogComponent,
    MealTypeTranslationDeletePopupComponent
  ],
  entryComponents: [
    MealTypeTranslationComponent,
    MealTypeTranslationUpdateComponent,
    MealTypeTranslationDeleteDialogComponent,
    MealTypeTranslationDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecipesMealTypeTranslationModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
